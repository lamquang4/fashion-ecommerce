import { connectMongoDB } from "@/lib/MongoConnect";
import Category from "@/model/Category";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const skip = (page - 1) * limit;

    const min = parseInt(searchParams.get("min") || "");
    const max = parseInt(searchParams.get("max") || "");
    const colors = searchParams.getAll("color");
    const sort = searchParams.get("sort") || "";

    const categoryQuery: any = { status: 1 };
    let categoryIds: any[] = [];

    if (slug === "nam") {
      categoryQuery.gender = 1;
    } else if (slug === "nu") {
      categoryQuery.gender = 0;
    } else if (slug !== "all") {
      categoryQuery.slug = slug;
    }

    const categories = await Category.find(categoryQuery).select("_id");

    if (!categories) {
      return NextResponse.json(
        { msg: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    categoryIds = categories.map((cat) => cat._id);

    const query: any = {
      status: 1,
      category: { $in: categoryIds },
    };

    const pipeline: any[] = [
      {
        $match: query,
      },
      {
        $addFields: {
          finalPrice: { $subtract: ["$price", "$discount"] },
        },
      },
    ];

    if (!isNaN(min) || !isNaN(max)) {
      const conditions = [];
      if (!isNaN(min)) conditions.push({ $gte: ["$finalPrice", min] });
      if (!isNaN(max)) conditions.push({ $lte: ["$finalPrice", max] });

      pipeline.push({
        $match: { $expr: { $and: conditions } },
      });
    }

    pipeline.push(
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "inventories",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$product", "$$productId"] },
              },
            },
            {
              $lookup: {
                from: "colors",
                localField: "color",
                foreignField: "_id",
                as: "color",
              },
            },
            { $unwind: "$color" },
            { $unwind: "$inventories" },
            {
              $lookup: {
                from: "sizes",
                localField: "inventories.size",
                foreignField: "_id",
                as: "inventories.size",
              },
            },
            { $unwind: "$inventories.size" },
            {
              $group: {
                _id: "$_id",
                product: { $first: "$product" },
                images: { $first: "$images" },
                color: {
                  $first: {
                    _id: "$color._id",
                    namecolor: "$color.namecolor",
                    codecolor: "$color.codecolor",
                  },
                },
                inventories: {
                  $push: {
                    size: {
                      _id: "$inventories.size._id",
                      namesize: "$inventories.size.namesize",
                    },
                    quantity: "$inventories.quantity",
                  },
                },
              },
            },
            { $sort: { _id: 1 } },
          ],
          as: "variants",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          discount: 1,
          description: 1,
          slug: 1,
          status: 1,
          createdAt: 1,
          category: {
            _id: "$category._id",
            namecategory: "$category.namecategory",
            gender: "$category.gender",
          },
          variants: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      }
    );

    if (colors.length > 0) {
      pipeline.push({
        $match: {
          "variants.color.namecolor": { $in: colors },
        },
      });
    }

    if (sort === "price-asc") {
      pipeline.push({ $sort: { finalPrice: 1 } });
    } else if (sort === "price-desc") {
      pipeline.push({ $sort: { finalPrice: -1 } });
    } else if (sort === "bestseller") {
      pipeline.push(
        {
          $lookup: {
            from: "orderdetails",
            let: { productId: "$_id" },
            pipeline: [
              {
                $unwind: "$items",
              },
              {
                $match: {
                  $expr: { $eq: ["$items.product", "$$productId"] },
                },
              },
              {
                $lookup: {
                  from: "orders",
                  localField: "order",
                  foreignField: "_id",
                  as: "order",
                },
              },
              {
                $unwind: "$order",
              },
              {
                $match: {
                  "order.status": 3,
                },
              },
              {
                $group: {
                  _id: "$items.product",
                  totalSold: { $sum: "$items.quantity" },
                },
              },
            ],
            as: "sold",
          },
        },
        {
          $addFields: {
            totalSold: {
              $ifNull: [{ $arrayElemAt: ["$sold.totalSold", 0] }, 0],
            },
          },
        },
        {
          $match: {
            totalSold: { $gt: 0 },
          },
        },
        {
          $sort: {
            totalSold: -1,
          },
        },
        {
          $project: {
            sold: 0,
          },
        }
      );
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    const countPipeline = [...pipeline, { $count: "total" }];

    pipeline.push({ $skip: skip }, { $limit: limit });

    const [products, totalCount] = await Promise.all([
      Product.aggregate(pipeline),
      Product.aggregate(countPipeline),
    ]);

    const total = totalCount[0]?.total || 0;

    if (!products || products.length === 0) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        products,
        total,
        totalPages: Math.ceil(total / limit),
        page,
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
