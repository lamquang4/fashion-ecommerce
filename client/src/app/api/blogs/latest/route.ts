import { connectMongoDB } from "@/lib/MongoConnect";
import Blog from "@/model/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const limit = 6;
    const blogs = await Blog.aggregate([
      { $match: { status: 1 } },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          content: 0,
        },
      },
    ]);

    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        {
          msg: "Không tìm thấy",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        blogs,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
