import { connectMongoDB } from "@/lib/MongoConnect";
import Address from "@/model/Address";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(options);
    const userId = session?.user?.id;

    const addresses = await Address.find({ user: userId });

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
