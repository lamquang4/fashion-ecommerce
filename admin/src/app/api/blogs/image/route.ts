import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const draftId = formData.get("draftId") as string | null;

    if (!file || file.size === 0) {
      return NextResponse.json(
        { msg: "Hình ảnh không hợp lệ" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { msg: "Chỉ hỗ trợ PNG, JPG hoặc WEBP" },
        { status: 400 }
      );
    }

    const maxSizeKB = 1000;
    if (file.size / 1024 > maxSizeKB) {
      return NextResponse.json(
        { msg: `Hình vượt quá ${maxSizeKB}KB` },
        { status: 400 }
      );
    }

    if (!draftId) {
      return NextResponse.json({ msg: "Thiếu draftId" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `aura-fashion/blog/draft/${draftId}`,
          resource_type: "image",
          tags: ["draft"],
          context: {
            status: "draft",
            draftId,
          },
          transformation: [
            {
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        public_id: result.public_id,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ msg: "Lỗi" }, { status: 500 });
  }
}
