import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { extractPublicId } from "@/utils/extractPublicId";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const searchParams = req.nextUrl.searchParams;
    const image = searchParams.get("image") as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    if (inventory.images.length === 1) {
      return NextResponse.json(
        { msg: "Hình sản phẩm của biến thể này chỉ còn 1 nên không được xóa!" },
        { status: 404 }
      );
    }

    // Xóa ảnh trên Cloudinary
    if (image) {
      const publicId = extractPublicId(image);
      await cloudinary.uploader.destroy(publicId);
    }

    const deleteImage = await Inventory.findByIdAndUpdate(
      id,
      { $pull: { images: image } }, // pull xóa hình là image trong mảng image
      { new: true }
    );

    return NextResponse.json({ inventory: deleteImage }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
