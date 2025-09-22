import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { extractPublicId } from "@/utils/extractPublicId";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const ids = formData.getAll("_id") as string[];
    const files = formData.getAll("image") as File[];

    const updatedBanners: any = [];

    if (files.length > 0 && files[0].size > 0) {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const file = files[i];

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
        }

        const banner = await Banner.findById(id);
        if (!banner) {
          return NextResponse.json({ msg: `Không tìm thấy` }, { status: 404 });
        }

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            {
              msg: `Hình "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.`,
            },
            { status: 400 }
          );
        }

        const maxSizeKB = 1000;
        if (file.size / 1024 > maxSizeKB) {
          return NextResponse.json(
            { msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.` },
            { status: 400 }
          );
        }

        let imagePath = banner.image;

        // Xóa ảnh cũ nếu có
        if (banner.image) {
          const publicId = extractPublicId(banner.image);
          await cloudinary.uploader.destroy(publicId);
        }

        // Thêm ảnh mới
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result: any = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `aura-fashion/banner`, // thư mục
              public_id: `${file.name.split(".")[0]}-${Date.now()}`,
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

        imagePath = result.secure_url;

        const updatedBanner = await Banner.findByIdAndUpdate(
          id,
          { image: imagePath },
          { new: true }
        );

        updatedBanners.push(updatedBanner);
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
