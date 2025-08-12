import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextRequest, NextResponse } from "next/server";
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    // gửi nhiều ảnh và mỗi ảnh sẽ được thêm thành một document riêng biệt trong MongoDB
    const formData = await req.formData();
    const files = formData.getAll("image") as File[];
    const type = formData.get("type") as string;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    const createdBanners = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "aura-fashion/banner",
            public_id: `${file.name.split(".")[0]}-${Date.now()}`,
            resource_type: "image",
            transformation: [
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          },
          (error, uploadResult) => {
            if (error) reject(error);
            else resolve(uploadResult);
          }
        );
        stream.end(buffer);
      });

      const imagePath = result.secure_url;

      const newBanner = await Banner.create({
        image: imagePath,
        type,
        status: 0,
      });

      createdBanners.push(newBanner);
    }

    return NextResponse.json({ banners: createdBanners }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
