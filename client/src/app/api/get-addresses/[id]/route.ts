import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const addresses = await Address.find({ user: id });

    return NextResponse.json({
      addresses,
    });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
