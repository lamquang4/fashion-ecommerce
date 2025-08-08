import { connectMongoDB } from "@/lib/MongoConnect";
import Banner from "@/model/Banner";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
export async function DELETE(
  _req: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  try {
    await connectMongoDB();

    const { params } = await context;
    const id = params.id;

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
      const fileName = banner.image.split("/uploads/banner/")[1];
      const filePathAdmin = path.join(
        process.cwd(),
        `/public/uploads/banner/${fileName}`
      );
      const filePathClient = path.join(
        process.cwd(),
        `../client/public/uploads/banner/${fileName}`
      );

      await fs.rm(filePathAdmin, { force: true }).catch(() => {});
      await fs.rm(filePathClient, { force: true }).catch(() => {});
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
