import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;

    const address = await Address.findById(id).lean();

    if (!address) {
      return NextResponse.json(
        { msg: "Không tìm thấy địa chỉ" },
        { status: 404 }
      );
    }

    return NextResponse.json(address);
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
