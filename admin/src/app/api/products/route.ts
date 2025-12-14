import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import Product from "@/model/Product";
import { removeVietNamese } from "@/utils/removeVietnamese";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";

    const query: any = {};
    if (q) {
      query.name = { $regex: q, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }

    const pipeline: any[] = [
      { $match: query },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "inventories",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$product", "$$productId"] } } },
            {
              $lookup: {
                from: "colors",
                localField: "color",
                foreignField: "_id",
                as: "color",
              },
            },
            { $unwind: "$color" },
            { $unwind: "$inventories" },
            {
              $lookup: {
                from: "sizes",
                localField: "inventories.size",
                foreignField: "_id",
                as: "inventories.size",
              },
            },
            { $unwind: "$inventories.size" },
            {
              $group: {
                _id: "$_id",
                product: { $first: "$product" },
                images: { $first: "$images" },
                color: {
                  $first: {
                    _id: "$color._id",
                    namecolor: "$color.namecolor",
                    codecolor: "$color.codecolor",
                  },
                },
                inventories: {
                  $push: {
                    size: {
                      _id: "$inventories.size._id",
                      namesize: "$inventories.size.namesize",
                    },
                    quantity: "$inventories.quantity",
                  },
                },
              },
            },
            { $sort: { _id: 1 } },
          ],
          as: "variants",
        },
      },
      {
        $addFields: {
          totalQuantity: {
            $sum: {
              $map: {
                input: "$variants",
                as: "variant",
                in: {
                  $sum: {
                    $map: {
                      input: "$$variant.inventories",
                      as: "inv",
                      in: "$$inv.quantity",
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "orderdetails",
          let: { productId: "$_id" },
          pipeline: [
            { $unwind: "$items" },
            { $match: { $expr: { $eq: ["$items.product", "$$productId"] } } },
            {
              $lookup: {
                from: "orders",
                localField: "order",
                foreignField: "_id",
                as: "order",
              },
            },
            { $unwind: "$order" },
            { $match: { "order.status": 3 } },
            {
              $group: {
                _id: "$items.product",
                totalSold: { $sum: "$items.quantity" },
              },
            },
          ],
          as: "sold",
        },
      },
      {
        $addFields: {
          totalSold: { $ifNull: [{ $arrayElemAt: ["$sold.totalSold", 0] }, 0] },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          discount: 1,
          description: 1,
          slug: 1,
          status: 1,
          createdAt: 1,
          totalSold: 1,
          totalQuantity: 1,
          category: {
            _id: "$category._id",
            namecategory: "$category.namecategory",
            gender: "$category.gender",
          },
          variants: 1,
        },
      },
    ];

    const [products, totalResult] = await Promise.all([
      Product.aggregate([
        ...pipeline,
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      Product.aggregate([...pipeline, { $count: "total" }]),
    ]);

    const total = totalResult[0]?.total || 0;

    if (!products || products.length === 0) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(
      {
        products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const slug = removeVietNamese(name);

    if (price < 0) {
      return NextResponse.json(
        { msg: "Giá bán phải lớn hơn 0" },
        { status: 400 }
      );
    }

    if (discount < 0) {
      return NextResponse.json(
        { msg: "Số tiền giảm phải lớn hơn 0" },
        { status: 400 }
      );
    }

    if (price < discount) {
      return NextResponse.json(
        { msg: "Giá bán phải lớn hơn số tiền giảm" },
        { status: 400 }
      );
    }

    const checkName = await Product.findOne({ name });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên sản phẩm đã được sử dụng" },
        { status: 409 }
      );
    }

    const newProduct = await Product.create({
      name,
      price,
      discount,
      description,
      category,
      slug,
      status: 0,
    });

    const newInventoryBlocks = JSON.parse(
      formData.get("newInventories") as string
    );

    // kiểm tra các biển thể của 1 sản phẩm có bị trùng màu
    const colorIds = newInventoryBlocks.map((block: any) => block.color);
    const hasDuplicateColor = new Set(colorIds).size !== colorIds.length;

    if (hasDuplicateColor) {
      return NextResponse.json(
        {
          msg: "Một sản phẩm không được chứa hai biến thể cùng màu",
        },
        { status: 400 }
      );
    }

    for (
      let blockIndex = 0;
      blockIndex < newInventoryBlocks.length;
      blockIndex++
    ) {
      const block = newInventoryBlocks[blockIndex];
      const files = formData.getAll(`images-${blockIndex}`) as File[];

      if (files.length > 5) {
        return NextResponse.json(
          { msg: "Hình sản phẩm của biến thể này không vượt quá 5 hình" },
          { status: 400 }
        );
      }

      if (files.length === 0 || !files) {
        return NextResponse.json(
          { msg: "Hình sản phẩm của biến thể này không để trống" },
          { status: 400 }
        );
      }

      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      const maxSizeKB = 1000;

      const imagePaths: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            {
              msg: `Hình "${file.name}" ở biến thể thứ ${
                blockIndex + 1
              } không đúng định dạng PNG, JPG hoặc WEBP.`,
            },
            { status: 400 }
          );
        }

        if (file.size / 1024 > maxSizeKB) {
          return NextResponse.json(
            {
              msg: `Hình "${file.name}" ở biến thể thứ ${
                blockIndex + 1
              } vượt quá dung lượng ${maxSizeKB}KB.`,
            },
            { status: 400 }
          );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result: any = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `aura-fashion/product`, // tên thư mục
              public_id: `${slug}-${Date.now()}`, // tên hình
              resource_type: "image",
              transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });

        imagePaths.push(result.secure_url);
      }

      // kiểm tra có trùng size ở 1 biến thể của 1 sản phẩm
      const sizeIds = block.inventories.map((inv: any) => inv.size);
      const hasDuplicateSize = new Set(sizeIds).size !== sizeIds.length;

      if (hasDuplicateSize) {
        return NextResponse.json(
          {
            msg: `Một biến thể của một sản phẩm chỉ được chứa 1 kích thước duy nhất`,
          },
          { status: 400 }
        );
      }

      await Inventory.create({
        product: newProduct._id,
        images: imagePaths,
        color: block.color,
        inventories: block.inventories.map((inv: any) => ({
          quantity: inv.quantity,
          size: inv.size,
        })),
      });
    }

    return NextResponse.json({ status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
