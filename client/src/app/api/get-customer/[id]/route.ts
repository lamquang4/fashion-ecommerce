import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/model/User";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const { id } = await params;

    const customer = await User.findById(id);

    if (!customer) {
      return NextResponse.json(
        { msg: "Không tìm thấy khách hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
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
