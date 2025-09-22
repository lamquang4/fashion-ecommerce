import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import OrderDetail from "@/model/OrderDetail";
import mongoose from "mongoose";
import { extractPublicId } from "@/utils/extractPublicId";
import { NextRequest, NextResponse } from "next/server";
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

    const variant = await Inventory.findById(id);
    if (!variant) {
      return NextResponse.json(
        { msg: "Không tìm thấy biến thế của sản phẩm" },
        { status: 404 }
      );
    }

    const variants = await Inventory.find({ product: variant.product });

    if (variants.length === 1) {
      return NextResponse.json(
        { msg: "Sản phẩm này chỉ còn 1 biến thể nên không thể xóa!" },
        { status: 409 }
      );
    }

    const existed = await OrderDetail.findOne({
      items: {
        $elemMatch: {
          product: variant.product,
          color: variant.color,
        },
      },
    });

    if (existed) {
      return NextResponse.json(
        {
          msg: "Biến thể của sản phẩm này đã được khách đặt hàng nên không thể xóa!",
        },
        { status: 409 }
      );
    }

    await Inventory.findByIdAndDelete(id);

    if (variant) {
      const allImages = variant.images;
      const publicIds = allImages
        .map((img: string) => extractPublicId(img))
        .filter(Boolean) as string[];

      await Promise.all(
        publicIds.map((pid) => cloudinary.uploader.destroy(pid))
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
