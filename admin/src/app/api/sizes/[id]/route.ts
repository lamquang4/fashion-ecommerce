import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import Size from "@/model/Size";
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

    const size = await Size.findById(id).lean();

    if (!size) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json({ size }, { status: 200 });
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

    const checkSize = await Inventory.findOne({ "inventories.size": id });
    if (checkSize) {
      return NextResponse.json(
        {
          msg: "Kích thước này đẫ được sử dụng cho biến thể của sản phẩm nên không thể xóa!",
        },
        {
          status: 409,
        }
      );
    }

    const size = await Size.findById(id);
    if (!size) {
      return NextResponse.json(
        { msg: "Không tìm thấy kích thước" },
        { status: 404 }
      );
    }

    await Size.findByIdAndDelete(id);

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

    const { namesize, chest, waist, hip, height, weight } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    if (chest[0] >= chest[1]) {
      return NextResponse.json(
        { msg: "Vòng ngực tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (waist[0] >= waist[1]) {
      return NextResponse.json(
        { msg: "Vòng eo tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (hip[0] >= hip[1]) {
      return NextResponse.json(
        { msg: "Vòng mông tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (height[0] >= height[1]) {
      return NextResponse.json(
        { msg: "Chiều cao tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }
    if (weight[0] >= weight[1]) {
      return NextResponse.json(
        { msg: "Cân nặng tối thiểu không được lớn hơn hoặc bằng tối đa" },
        { status: 400 }
      );
    }

    const size = await Size.findById(id);
    if (!size) {
      return NextResponse.json(
        { msg: "Không tìm thấy kích thước" },
        { status: 404 }
      );
    }

    const checkName = await Size.findOne({ namesize, _id: { $ne: id } });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên kích thước đã được sử dụng" },
        { status: 409 }
      );
    }

    const updatedData: any = {
      namesize,
      chest,
      waist,
      hip,
      height,
      weight,
    };

    await Size.findByIdAndUpdate(id, updatedData, {
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
