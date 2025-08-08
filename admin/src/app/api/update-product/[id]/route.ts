import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/model/Product";
import Inventory from "@/model/Inventory";
import { removeVietNamese } from "@/utils/removeVietnamese";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
import Category from "@/model/Category";
import OrderDetail from "@/model/OrderDetail";
import Cart from "@/model/Cart";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const slug = removeVietNamese(name);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    if (price < discount) {
      return NextResponse.json(
        { msg: "Giá sản phẩm phải lớn hơn giá giảm" },
        { status: 404 }
      );
    }

    const product = await Product.findById(id);
    const oldCategory = product.category.toString();
    if (!product) {
      return NextResponse.json(
        { msg: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const checkName = await Product.findOne({ name, _id: { $ne: id } });
    if (checkName) {
      return NextResponse.json(
        { msg: "Tên sản phẩm đã được sử dụng" },
        { status: 400 }
      );
    }

    const updatedData = {
      name,
      price,
      discount,
      description,
      category,
      slug,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Thêm Inventory mới
    const newInventoryBlocks = JSON.parse(
      formData.get("newInventories") as string
    );

    if (newInventoryBlocks) {
      for (
        let blockIndex = 0;
        blockIndex < newInventoryBlocks.length;
        blockIndex++
      ) {
        const block = newInventoryBlocks[blockIndex];
        const files = formData.getAll(`images-${blockIndex}`) as File[];

        if (files.length === 0 || !files) {
          return NextResponse.json(
            { msg: "Hình sản phẩm biến thể này không để trống" },
            { status: 404 }
          );
        }

        if (files.length > 5) {
          return NextResponse.json(
            { msg: "Hình sản phẩm biến thể này không vượt quá 5 hình" },
            { status: 404 }
          );
        }

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        const maxSizeKB = 1000;

        const uploadDirAdmin = path.join(
          process.cwd(),
          "/public/uploads/product"
        );
        const uploadDirClient = path.join(
          process.cwd(),
          `../client/public/uploads/product`
        );

        await fs.mkdir(uploadDirAdmin, { recursive: true });
        await fs.mkdir(uploadDirClient, { recursive: true });

        const imagePaths: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
              {
                msg: `Hình "${file.name}" ở biến thể này không đúng định dạng PNG, JPG hoặc WEBP.`,
              },
              { status: 404 }
            );
          }

          if (file.size / 1024 > maxSizeKB) {
            return NextResponse.json(
              {
                msg: `Hình "${file.name}" ở biến thể này vượt quá dung lượng ${maxSizeKB}KB.`,
              },
              { status: 404 }
            );
          }

          const arrayBuffer = await file.arrayBuffer();
          const buffer = new Uint8Array(arrayBuffer);
          const ext = file.name.split(".").pop();
          const timestamp = Date.now();
          const fileName = `${slug}-${timestamp}-${i}.${ext}`;
          const filePathAdmin = path.join(uploadDirAdmin, fileName);
          const filePathClient = path.join(uploadDirClient, fileName);

          await fs.writeFile(filePathAdmin, buffer);
          await fs.writeFile(filePathClient, buffer);

          imagePaths.push(`/uploads/product/${fileName}`);
        }

        await Inventory.create({
          product: id,
          images: imagePaths,
          color: block.color,
          inventories: block.inventories.map((inv: any) => ({
            quantity: inv.quantity,
            size: inv.size,
          })),
        });
      }
    }

    // Cập nhật Inventory đã có

    const currentInventories = JSON.parse(
      formData.get("currentInventories") as string
    );

    if (currentInventories) {
      for (
        let blockIndex = 0;
        blockIndex < currentInventories.length;
        blockIndex++
      ) {
        const block = currentInventories[blockIndex];
        const files = formData.getAll(`images1-${blockIndex}`) as File[];

        const inventory = await Inventory.findById(block._id);
        if (!inventory) {
          return NextResponse.json({ msg: `Không tìm thấy` }, { status: 404 });
        }

        // không cho thay đổi biến thể có color, size đã có trong order, cart
        // Kiểm tra đơn hàng có status là 0, 1, 2 nào có order detail chứa biến thể chỉ lấy 1 cái
        const variantId = inventory._id;

        const currentSizes = inventory.inventories.map((inv: any) =>
          inv.size.toString()
        );
        const currentColor = inventory.color.toString();

        const usedInOrders = await OrderDetail.aggregate([
          {
            $match: {
              "items.product": new mongoose.Types.ObjectId(id),
              "items.color": new mongoose.Types.ObjectId(currentColor),
              "items.size": {
                $in: currentSizes.map(
                  (sizeId: string) => new mongoose.Types.ObjectId(sizeId)
                ),
              },
            },
          },
          {
            $lookup: {
              from: "orders",
              localField: "order",
              foreignField: "_id",
              as: "orderInfo",
            },
          },
          {
            $unwind: "$orderInfo",
          },
          {
            $match: {
              "orderInfo.status": { $in: [0, 1, 2] },
            },
          },
          { $limit: 1 },
        ]);

        const usedInCart = await Cart.aggregate([
          {
            $match: {
              "items.variant": new mongoose.Types.ObjectId(variantId),
            },
          },
          { $limit: 1 },
        ]);

        const isUsed = usedInOrders.length > 0 || usedInCart.length > 0;

        if (isUsed) {
          if (block.color !== currentColor) {
            return NextResponse.json(
              {
                msg: "Không thể thay đổi màu sắc vì biến thể đã được sử dụng trong đơn hàng hoặc giỏ hàng.",
              },
              { status: 400 }
            );
          }

          const newSizes = block.inventories.map((inv: any) =>
            inv.size.toString()
          );

          const sizeChanged =
            newSizes.some((size: string) => !currentSizes.includes(size)) ||
            currentSizes.some((size: string) => !newSizes.includes(size));

          if (sizeChanged) {
            return NextResponse.json(
              {
                msg: "Không thể thay đổi kích thước vì biến thể đã được sử dụng trong đơn hàng hoặc giỏ hàng.",
              },
              { status: 400 }
            );
          }
        }

        if (inventory.images.length + files.length > 5) {
          return NextResponse.json(
            {
              msg: `Hình sản phẩm của biến thể ${
                blockIndex + 1
              } không vượt quá 5 hình`,
            },
            { status: 404 }
          );
        }

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        const maxSizeKB = 1000;

        const uploadDirAdmin = path.join(
          process.cwd(),
          "/public/uploads/product"
        );
        const uploadDirClient = path.join(
          process.cwd(),
          `../client/public/uploads/product`
        );

        await fs.mkdir(uploadDirAdmin, { recursive: true });
        await fs.mkdir(uploadDirClient, { recursive: true });

        const imagePaths: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
              {
                msg: `Hình "${file.name}" ở biến thể thứ i không đúng định dạng PNG, JPG hoặc WEBP.`,
              },
              { status: 404 }
            );
          }

          if (file.size / 1024 > maxSizeKB) {
            return NextResponse.json(
              {
                msg: `Hình "${file.name}" ở biến thể thứ i vượt quá dung lượng ${maxSizeKB}KB.`,
              },
              { status: 404 }
            );
          }

          const arrayBuffer = await file.arrayBuffer();
          const buffer = new Uint8Array(arrayBuffer);
          const ext = file.name.split(".").pop();
          const timestamp = Date.now();
          const fileName = `${slug}-${timestamp}-${i}.${ext}`;
          const filePathAdmin = path.join(uploadDirAdmin, fileName);
          const filePathClient = path.join(uploadDirClient, fileName);

          await fs.writeFile(filePathAdmin, buffer);
          await fs.writeFile(filePathClient, buffer);

          imagePaths.push(`/uploads/product/${fileName}`);
        }

        await Inventory.findByIdAndUpdate(block._id, {
          $push: { images: { $each: imagePaths } },
          inventories: block.inventories.map((inv: any) => ({
            quantity: inv.quantity,
            size: inv.size,
          })),
          color: block.color,
          product: id,
        });
      }
    }

    if (oldCategory !== category) {
      const hasProductOldCategory = await Product.exists({
        category: oldCategory,
        status: 1,
        _id: { $ne: id },
      });
      if (!hasProductOldCategory) {
        await Category.findByIdAndUpdate(oldCategory, { status: 0 });
      }

      const hasProductNewCategory = await Product.exists({
        category: category,
        status: 1,
      });
      if (hasProductNewCategory) {
        await Category.findByIdAndUpdate(category, { status: 1 });
      }
    }

    return NextResponse.json({ product: updatedProduct }, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ err, msg: "Lỗi" }, { status: 400 });
  }
}
