import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { extractPublicId } from "@/utils/extractPublicId";
import { removeVietNamese } from "@/utils/removeVietnamese";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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
    const file = formData.get("imageUpdate") as File;
    const image = formData.get("imageNeedUpdate") as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    const imageList = inventory.images;
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
      const publicId = extractPublicId(image);
      await cloudinary.uploader.destroy(publicId);

      // Thêm hình mới
      const slug = removeVietNamese(file.name.split(".")[0]);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "aura-fashion/product",
            public_id: `${slug}-${Date.now()}`,
            resource_type: "image",
            transformation: [
              { width: 800, height: 1000, crop: "fill" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      imageList[indexToUpdate] = result.secure_url;
    }

    // Cập nhật
    const updatedImage = await Inventory.findByIdAndUpdate(
      id,
      { images: imageList },
      { new: true }
    );

    return NextResponse.json({ inventory: updatedImage }, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
