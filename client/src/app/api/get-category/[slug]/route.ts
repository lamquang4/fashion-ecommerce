import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;

    let category;

    if (slug === "all") {
      category = { namecategory: "Tất cả sản phẩm" };
    } else if (slug === "nam") {
      category = { namecategory: "Đồ nam" };
    } else if (slug === "nu") {
      category = { namecategory: "Đồ nữ" };
    } else {
      category = await Category.findOne({ slug }).lean();
      if (!category) {
        return NextResponse.json(
          { msg: "Không tìm thấy danh mục" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 400,
      }
    );
  }
}
