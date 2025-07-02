import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;

    const category = await Category.findOne({ slug });

    if (!category) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
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
