import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
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
    const uploadDirAdmin = path.join(process.cwd(), "/public/uploads/banner");
    const uploadDirClient = path.join(
      process.cwd(),
      "../client/public/uploads/banner"
    );

    await fs.mkdir(uploadDirAdmin, { recursive: true });
    await fs.mkdir(uploadDirClient, { recursive: true });

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

      const buffer = new Uint8Array(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const timestamp = Date.now();
      const fileName = `${file.name}-${timestamp}.${ext}`;
      const filePathAdmin = path.join(uploadDirAdmin, fileName);
      const filePathClient = path.join(uploadDirClient, fileName);
      await fs.writeFile(filePathAdmin, buffer);
      await fs.writeFile(filePathClient, buffer);

      const imagePath = `/uploads/banner/${fileName}`;

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
