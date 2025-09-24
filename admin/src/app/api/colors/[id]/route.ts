import { connectMongoDB } from "@/lib/MongoConnect";
import Color from "@/model/Color";
import Inventory from "@/model/Inventory";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const color = await Color.findById(id).lean();

    if (!color) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json({ color }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}

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

    const checkColor = await Inventory.findOne({ color: id });
    if (checkColor) {
      return NextResponse.json(
        {
          msg: "Màu này đẫ được sử dụng cho biến thể của sản phẩm nên không thể xóa!",
        },
        {
          status: 409,
        }
      );
    }

    const color = await Color.findById(id);
    if (!color) {
      return NextResponse.json({ msg: "Không tìm thấy màu" }, { status: 404 });
    }

    await Color.findByIdAndDelete(id);

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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const body = await req.json();

    const { namecolor, codecolor } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const color = await Color.findById(id);
    if (!color) {
      return NextResponse.json({ msg: "Không tìm thấy màu" }, { status: 404 });
    }

    const checkName = await Color.findOne({ namecolor, _id: { $ne: id } });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên màu đã được sử dụng" },
        { status: 409 }
      );
    }

    const updatedData: any = {
      namecolor,
      codecolor,
    };

    await Color.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

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
