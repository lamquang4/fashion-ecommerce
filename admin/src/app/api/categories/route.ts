import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { removeVietNamese } from "@/utils/removeVietnamese";

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
      query.namecategory = { $regex: q, $options: "i" };
    }
    if (status) {
      query.status = parseInt(status);
    }

    const [categories, total] = await Promise.all([
      Category.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "products",
          },
        },
        {
          $addFields: {
            totalProduct: { $size: "$products" },
          },
        },
        {
          $lookup: {
            from: "products",
            let: { categoryId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$category", "$$categoryId"] },
                      { $eq: ["$status", 1] },
                    ],
                  },
                },
              },
            ],
            as: "products",
          },
        },
        {
          $addFields: {
            totalProductActive: { $size: "$products" },
          },
        },
        {
          $project: {
            products: 0, // không lấy products
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        { $skip: skip },
        { $limit: limit },
      ]),
      Category.countDocuments(query),
    ]);

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        categories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
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
    const namecategory = formData.get("namecategory") as string;
    const gender = Number(formData.get("gender"));
    const file = formData.get("image") as File;

    const checkName = await Category.findOne({ namecategory, gender });
    if (checkName) {
      return NextResponse.json(
        {
          msg: `Tên danh mục này đã được dùng cho giới tính ${
            gender === 0 ? "nữ" : "nam"
          }.`,
        },
        { status: 409 }
      );
    }

    if (file.size === 0 || !file) {
      return NextResponse.json(
        { msg: "Danh mục không để trống" },
        { status: 404 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { msg: `Hình "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.` },
        { status: 400 }
      );
    }

    const maxSizeKB = 1000; // 1000KB
    if (file.size / 1024 > maxSizeKB) {
      return NextResponse.json(
        { msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.` },
        { status: 400 }
      );
    }

    // thư mục của hình
    const slug1 = removeVietNamese(namecategory);
    const slug2 = removeVietNamese(gender === 0 ? "Nữ" : "Nam");
    const slug = `${slug1}-${slug2}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "aura-fashion/category",
          public_id: `${slug}-${Date.now()}`,
          resource_type: "image",
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );
      stream.end(buffer);
    });

    const imagePath = result.secure_url;

    await Category.create({
      namecategory,
      gender,
      image: imagePath,
      slug: slug,
      status: 0,
    });

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
