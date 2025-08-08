import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { removeVietNamese } from "@/utils/removeVietnamese";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const formData = await req.formData();
    const file = formData.get("imageUpdate") as File;
    const image = formData.get("imageNeedUpdate") as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    let imageList = inventory.images;
    const indexToUpdate = imageList.indexOf(image);

    if (file && file.size > 0) {
      // Kiểm tra định dạng
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            msg: `Hình "${file.name}" không đúng định dạng PNG, JPG hoặc WEBP.`,
          },
          { status: 400 }
        );
      }

      // Kiểm tra dung lượng
      const maxSizeKB = 1000;
      if (file.size / 1024 > maxSizeKB) {
        return NextResponse.json(
          {
            msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.`,
          },
          { status: 400 }
        );
      }

      // Xoá hình cũ
      const fileNameOld = image.split("/uploads/product/")[1];
      const oldPathAdmin = path.join(
        process.cwd(),
        "public/uploads/product",
        fileNameOld
      );
      const oldPathClient = path.join(
        process.cwd(),
        "../client/public/uploads/product",
        fileNameOld
      );
      await fs.rm(oldPathAdmin, { force: true }).catch(() => {});
      await fs.rm(oldPathClient, { force: true }).catch(() => {});

      // Lưu hình mới
      const slug = removeVietNamese(file.name.split(".")[0]);
      const ext = file.name.split(".").pop();
      const timestamp = Date.now();
      const fileName = `${slug}-${timestamp}.${ext}`;

      const uploadDirAdmin = path.join(process.cwd(), "public/uploads/product");
      const uploadDirClient = path.join(
        process.cwd(),
        "../client/public/uploads/product"
      );
      await fs.mkdir(uploadDirAdmin, { recursive: true });
      await fs.mkdir(uploadDirClient, { recursive: true });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePathAdmin = path.join(uploadDirAdmin, fileName);
      const filePathClient = path.join(uploadDirClient, fileName);

      await fs.writeFile(filePathAdmin, buffer);
      await fs.writeFile(filePathClient, buffer);

      const newImagePath = `/uploads/product/${fileName}`;

      // Cập nhật trong mảng
      imageList[indexToUpdate] = newImagePath;
    }

    // Cập nhật
    const updatedImage = await Inventory.findByIdAndUpdate(
      id,
      { images: imageList },
      { new: true }
    );
    return NextResponse.json({ inventory: updatedImage }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
