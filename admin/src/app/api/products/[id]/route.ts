import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import Inventory from "@/model/Inventory";
import Order from "@/model/Order";
import Product from "@/model/Product";
import { extractPublicId } from "@/utils/extractPublicId";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { removeVietNamese } from "@/utils/removeVietnamese";
import Cart from "@/model/Cart";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }
    const objectId = new mongoose.Types.ObjectId(id);

    const product = await Product.aggregate([
      {
        $match: { _id: objectId },
      },
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
            {
              $match: {
                $expr: { $eq: ["$product", "$$productId"] },
              },
            },
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
            {
              $unwind: "$inventories.size",
            },
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
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          discount: 1,
          description: 1,
          slug: 1,
          status: 1,
          createdAt: 1,
          category: {
            _id: "$category._id",
            namecategory: "$category.namecategory",
            gender: "$category.gender",
          },
          variants: 1,
        },
      },
    ]);

    if (!product) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json({ product: product[0] }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const checkProduct = await Order.findOne({ "items.product": id });
    if (checkProduct) {
      return NextResponse.json(
        {
          msg: "Sản phẩm này đã được mua trong đơn hàng nên không thể xóa!",
        },
        {
          status: 409,
        }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const inventories = await Inventory.find({ product: id });

    if (inventories.length > 0) {
      const allImages = inventories.flatMap((inv) => inv.images);

      const publicIds = allImages
        .map((img) => extractPublicId(img))
        .filter(Boolean) as string[];

      await Promise.all(
        publicIds.map((pid) => cloudinary.uploader.destroy(pid))
      );
    }

    const categoryId = product.category;

    await Product.findByIdAndDelete(id);
    await Inventory.deleteMany({ product: id });

    if (categoryId) {
      const hasActiveProducts = await Product.exists({
        category: categoryId,
        status: 1,
      });

      if (!hasActiveProducts) {
        // Cập nhật category status = 0 nếu không còn sản phẩm status = 1
        await Category.findByIdAndUpdate(categoryId, { $set: { status: 0 } });
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const slug = removeVietNamese(name);
    const status = Number(formData.get("status"));
    const newInventoryBlocks = JSON.parse(
      formData.get("newInventories") as string
    );

    const currentInventories = JSON.parse(
      formData.get("currentInventories") as string
    );

    // kiểm tra các biển thể của 1 sản phẩm có bị trùng màu
    const allColorIds = [
      ...(newInventoryBlocks?.map((block: any) => block.color) || []),
      ...(currentInventories?.map((block: any) => block.color) || []),
    ];
    const hasDuplicateColor = new Set(allColorIds).size !== allColorIds.length;
    if (hasDuplicateColor) {
      return NextResponse.json(
        { msg: "Một sản phẩm không được chứa hai biến thể cùng màu" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

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

    const product = await Product.findById(id);
    const oldCategory = product.category.toString();
    if (!product) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const checkName = await Product.findOne({ name, _id: { $ne: id } });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên sản phẩm đã được sử dụng" },
        { status: 409 }
      );
    }

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return NextResponse.json(
        { msg: "Danh mục không tồn tại" },
        { status: 404 }
      );
    }

    if (status === 1 && categoryDoc.status === 0) {
      return NextResponse.json(
        { msg: "Không thể hiện sản phẩm này vì danh mục đang bị ẩn" },
        { status: 400 }
      );
    }

    const updatedData = {
      name,
      price,
      discount,
      description,
      category,
      slug,
    };

    await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Thêm Inventory mới

    if (newInventoryBlocks) {
      for (
        let blockIndex = 0;
        blockIndex < newInventoryBlocks.length;
        blockIndex++
      ) {
        const block = newInventoryBlocks[blockIndex];
        const files = formData.getAll(`images-${blockIndex}`) as File[];

        if (files.length === 0 || !files) {
          return NextResponse.json(
            { msg: "Hình sản phẩm biến thể này không để trống" },
            { status: 404 }
          );
        }

        if (files.length > 5) {
          return NextResponse.json(
            { msg: "Hình sản phẩm biến thể này không vượt quá 5 hình" },
            { status: 400 }
          );
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

        const variant = await Inventory.create({
          product: id,
          images: [],
          color: block.color,
          inventories: block.inventories.map((inv: any) => ({
            quantity: inv.quantity,
            size: inv.size,
          })),
        });

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
                folder: `aura-fashion/product/${id}/${variant._id}`,
                public_id: `${slug}-${Date.now()}-${i}`,
                resource_type: "image",
                transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
              },
              (err, res) => (err ? reject(err) : resolve(res))
            );
            stream.end(buffer);
          });

          imagePaths.push(result.secure_url);
        }

        await Inventory.findByIdAndUpdate(variant._id, {
          $push: { images: { $each: imagePaths } },
        });
      }
    }

    // Cập nhật Inventory đã có

    if (currentInventories) {
      for (
        let blockIndex = 0;
        blockIndex < currentInventories.length;
        blockIndex++
      ) {
        const block = currentInventories[blockIndex];
        const files = formData.getAll(`images1-${blockIndex}`) as File[];

        const inventory = await Inventory.findById(block._id);
        if (!inventory) {
          return NextResponse.json({ msg: `Không tìm thấy` }, { status: 404 });
        }

        // không cho thay đổi biến thể có color, size đã có trong order, cart
        // Kiểm tra đơn hàng có status là 0, 1, 2 nào có order detail chứa biến thể chỉ lấy 1 cái
        const variantId = inventory._id;

        const currentSizes = inventory.inventories.map((inv: any) =>
          inv.size.toString()
        );
        const currentColor = inventory.color.toString();

        const usedInOrders = await Order.aggregate([
          {
            $match: {
              "items.product": new mongoose.Types.ObjectId(id),
              "items.color": new mongoose.Types.ObjectId(currentColor),
              "items.size": {
                $in: currentSizes.map(
                  (sizeId: string) => new mongoose.Types.ObjectId(sizeId)
                ),
              },
            },
          },
          {
            $lookup: {
              from: "orders",
              localField: "order",
              foreignField: "_id",
              as: "orderInfo",
            },
          },
          {
            $unwind: "$orderInfo",
          },
          {
            $match: {
              "orderInfo.status": { $in: [0, 1, 2] },
            },
          },
          { $limit: 1 },
        ]);

        const usedInCart = await Cart.aggregate([
          {
            $match: {
              "items.variant": new mongoose.Types.ObjectId(variantId),
            },
          },
          { $limit: 1 },
        ]);

        const isUsed = usedInOrders.length > 0 || usedInCart.length > 0;

        if (isUsed) {
          if (block.color !== currentColor) {
            return NextResponse.json(
              {
                msg: "Không thể thay đổi màu sắc vì biến thể đã được sử dụng trong đơn hàng hoặc giỏ hàng.",
              },
              { status: 400 }
            );
          }

          const newSizes = block.inventories.map((inv: any) =>
            inv.size.toString()
          );

          const sizeChanged =
            newSizes.some((size: string) => !currentSizes.includes(size)) ||
            currentSizes.some((size: string) => !newSizes.includes(size));

          if (sizeChanged) {
            return NextResponse.json(
              {
                msg: "Không thể thay đổi kích thước vì biến thể đã được sử dụng trong đơn hàng hoặc giỏ hàng.",
              },
              { status: 400 }
            );
          }
        }

        if (inventory.images.length + files.length > 5) {
          return NextResponse.json(
            {
              msg: `Hình sản phẩm của biến thể ${
                blockIndex + 1
              } không vượt quá 5 hình`,
            },
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
                folder: `aura-fashion/product/${id}/${variantId}`,
                public_id: `${slug}-${Date.now()}-${i}`,
                resource_type: "image",
                transformation: [
                  { width: 800, height: 1000, crop: "fill" },
                  { quality: "auto" },
                  { fetch_format: "auto" },
                ],
              },
              (err, res) => (err ? reject(err) : resolve(res))
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

        await Inventory.findByIdAndUpdate(block._id, {
          $push: { images: { $each: imagePaths } },
          inventories: block.inventories.map((inv: any) => ({
            quantity: inv.quantity,
            size: inv.size,
          })),
          color: block.color,
          product: id,
        });
      }
    }

    if (oldCategory !== category) {
      const hasProductOldCategory = await Product.exists({
        category: oldCategory,
        status: 1,
        _id: { $ne: id },
      });
      if (!hasProductOldCategory) {
        await Category.findByIdAndUpdate(oldCategory, { status: 0 });
      }

      const hasProductNewCategory = await Product.exists({
        category: category,
        status: 1,
      });
      if (hasProductNewCategory) {
        await Category.findByIdAndUpdate(category, { status: 1 });
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi" }, { status: 500 });
  }
}
