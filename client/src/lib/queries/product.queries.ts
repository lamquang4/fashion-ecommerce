import Product from "@/model/Product";
import { connectMongoDB } from "../mongodb";

export async function getProductBySlug(slug: string) {
  await connectMongoDB();

  const product = await Product.aggregate([
    { $match: { slug, status: 1 } },
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
          slug: "$category.slug",
        },
        variants: 1,
      },
    },
  ]);

  return product[0] || null;
}
