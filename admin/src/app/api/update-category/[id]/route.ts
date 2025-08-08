import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const formData = await req.formData();
    const namecategory = formData.get("namecategory") as string;
    const gender = Number(formData.get("gender"));
    const file = formData.get("image") as File;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    const checkName = await Category.findOne({
      namecategory,
      gender,
      _id: { $ne: id },
    });
    if (checkName) {
      return NextResponse.json(
        {
          msg: `Tên danh mục này đã được dùng cho giới tính ${
            gender === 0 ? "nữ" : "nam"
          }.`,
        },
        { status: 400 }
      );
    }

    const slug1 = removeVietNamese(namecategory);
    const slug2 = removeVietNamese(gender === 0 ? "Nữ" : "Nam");
    const slug = `${slug1}-${slug2}`;
    let imagePath = category.image;

    if (file && file.size > 0) {
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
          {
            msg: `Hình "${file.name}" vượt quá dung lượng ${maxSizeKB}KB.`,
          },
          { status: 400 }
        );
      }

      // Xoá Hình cũ
      if (imagePath) {
        const fileNameOld = imagePath.split("/uploads/category/")[1];
        const oldPathAdmin = path.join(
          process.cwd(),
          "public/uploads/category",
          fileNameOld
        );
        const oldPathClient = path.join(
          process.cwd(),
          "../client/public/uploads/category",
          fileNameOld
        );
        await fs.rm(oldPathAdmin, { force: true }).catch(() => {});
        await fs.rm(oldPathClient, { force: true }).catch(() => {});
      }

      // Lưu hình mới
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = file.name.split(".").pop();
      const timestamp = Date.now();
      const fileName = `${slug}-${timestamp}.${ext}`;

      const uploadDirAdmin = path.join(
        process.cwd(),
        "public/uploads/category"
      );
      const uploadDirClient = path.join(
        process.cwd(),
        "../client/public/uploads/category"
      );
      await fs.mkdir(uploadDirAdmin, { recursive: true });
      await fs.mkdir(uploadDirClient, { recursive: true });

      const filePathAdmin = path.join(uploadDirAdmin, fileName);
      const filePathClient = path.join(uploadDirClient, fileName);

      await fs.writeFile(filePathAdmin, buffer);
      await fs.writeFile(filePathClient, buffer);

      imagePath = `/uploads/category/${fileName}`;
    }

    const updatedData = {
      namecategory,
      gender,
      slug,
      image: imagePath,
      status: category.status,
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({ category: updatedCategory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
