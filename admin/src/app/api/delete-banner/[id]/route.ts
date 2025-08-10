import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import { extractPublicId } from "@/utils/extractPublicId";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const banner = await Banner.findById(id);
    if (!banner) {
      return NextResponse.json(
        { msg: "Không tìm thấy banner" },
        { status: 404 }
      );
    }

    if (banner.image) {
      const publicId = extractPublicId(banner.image);
      await cloudinary.uploader.destroy(publicId);
    }

    const deleteBanner = await Banner.findByIdAndDelete(id);

    return NextResponse.json({ banner: deleteBanner }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
