import { connectMongoDB } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createPayment } from "@/lib/Momo";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { total, orderCode } = await req.json();

    const momo = await createPayment({ orderCode, total });

    return NextResponse.json({ payUrl: momo.payUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
