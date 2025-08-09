import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const colors = await Inventory.aggregate([
      {
        $group: {
          _id: "$color",
        },
      },
      {
        $lookup: {
          from: "colors",
          localField: "_id",
          foreignField: "_id",
          as: "colorDetails",
        },
      },
      {
        $unwind: "$colorDetails",
      },
      {
        $replaceRoot: {
          newRoot: "$colorDetails",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return NextResponse.json({ colors });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
