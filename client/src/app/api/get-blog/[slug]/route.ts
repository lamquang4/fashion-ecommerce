import { connectMongoDB } from "@/lib/MongoConnect";
import Blog from "@/model/Blog";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;

    const blog = await Blog.findOne({ slug, status: 1 }).lean();

    if (!blog) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
