import cloudinary from "@/lib/cloudinary";
import { connectMongoDB } from "@/lib/MongoConnect";
import Inventory from "@/model/Inventory";
import { extractPublicId } from "@/utils/extractPublicId";
import { removeVietNamese } from "@/utils/removeVietnamese";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const formData = await req.formData();
    const file = formData.get("imageUpdate") as File; // Hình mới
    const imageToReplace = formData.get("imageNeedUpdate") as string; // Hình cần thay thế

    if (!mongoose.Types.ObjectId.isValid(id)) {
     return NextResponse.json(
        { msg: "Không tìm thấy biến thể" },
        { status: 404 }
      );
    }

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json(
        { msg: "Không tìm thấy biến thể" },
        { status: 404 }
      );
    }

    const imageList = inventory.images;
    const indexToUpdate = imageList.indexOf(imageToReplace);
    if (indexToUpdate === -1) {
      return NextResponse.json(
        { msg: "Hình cần cập nhật không tồn tại" },
        { status: 404 }
      );
    }

    if (!file || file.size === 0) {
      return NextResponse.json(
        { msg: "Hình mới không hợp lệ" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { msg: "Chỉ hỗ trợ PNG, JPG hoặc WEBP" },
        { status: 400 }
      );
    }
    const maxSizeKB = 1000;
    if (file.size / 1024 > maxSizeKB) {
      return NextResponse.json(
        { msg: `Hình vượt quá ${maxSizeKB}KB` },
        { status: 400 }
      );
    }

    // Xóa hình cũ
    const publicId = extractPublicId(imageToReplace); // Hàm bạn tự viết
    await cloudinary.uploader.destroy(publicId);

    const slug = removeVietNamese(file.name.split(".")[0]);
    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `aura-fashion/product/${inventory.product}/${inventory._id}`,
          public_id: `${slug}-${Date.now()}`,
          resource_type: "image",
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        },
        (err, res) => (err ? reject(err) : resolve(res))
      );
      stream.end(buffer);
    });

    imageList[indexToUpdate] = result.secure_url;
    await Inventory.findByIdAndUpdate(
      id,
      { images: imageList },
      { new: true }
    );

    return NextResponse.json({ status: 200, images: imageList });
  } catch (err) {
    return NextResponse.json({ err, msg: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const searchParams = req.nextUrl.searchParams;
    const image = searchParams.get("image") as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: "ID không hợp lệ" }, { status: 400 });
    }

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json({ msg: "Không tìm thấy" }, { status: 404 });
    }

    if (inventory.images.length === 1) {
      return NextResponse.json(
        { msg: "Hình sản phẩm của biến thể này chỉ còn 1 nên không được xóa!" },
        { status: 409 }
      );
    }

    // Xóa ảnh trên Cloudinary
    if (image) {
      const publicId = extractPublicId(image);
      await cloudinary.uploader.destroy(publicId);
    }

    await Inventory.findByIdAndUpdate(
      id,
      { $pull: { images: image } }, // pull xóa hình là image trong mảng image
      { new: true }
    );

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, msg: "Lỗi" },
      {
        status: 500,
      }
    );
  }
}
