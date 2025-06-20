import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
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

    const uploadDirAdmin = path.join(process.cwd(), "/public/uploads/banner");
    const uploadDirClient = path.join(
      process.cwd(),
      "../client/public/uploads/banner"
    );

    await fs.mkdir(uploadDirAdmin, { recursive: true });
    await fs.mkdir(uploadDirClient, { recursive: true });

    const updatedBanners = [];

    if (files.length > 0 && files[0].size > 0) {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const file = files[i];

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return NextResponse.json(
            { msg: `ID không hợp lệ: ${id}` },
            { status: 400 }
          );
        }

        const banner = await Banner.findById(id);
        if (!banner) {
          return NextResponse.json(
            { msg: `Không tìm thấy banner với ID: ${id}` },
            { status: 404 }
          );
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
        if (imagePath) {
          const fileNameOld = imagePath.split("/uploads/banner/")[1];
          const oldPathAdmin = path.join(uploadDirAdmin, fileNameOld);
          const oldPathClient = path.join(uploadDirClient, fileNameOld);
          await fs.rm(oldPathAdmin, { force: true }).catch(() => {});
          await fs.rm(oldPathClient, { force: true }).catch(() => {});
        }

        // Thêm ảnh mới
        const buffer = new Uint8Array(await file.arrayBuffer());
        const ext = file.name.split(".").pop();
        const timestamp = Date.now();
        const fileName = `${file.name}-${timestamp}.${ext}`;
        const filePathAdmin = path.join(uploadDirAdmin, fileName);
        const filePathClient = path.join(uploadDirClient, fileName);
        await fs.writeFile(filePathAdmin, buffer);
        await fs.writeFile(filePathClient, buffer);

        imagePath = `/uploads/banner/${fileName}`;

        const updatedBanner = await Banner.findByIdAndUpdate(
          id,
          { image: imagePath },
          { new: true }
        );

        updatedBanners.push(updatedBanner);
      }
    }

    return NextResponse.json({ banner: updatedBanners }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
