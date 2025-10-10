import mongoose, { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderCode: {
      type: String,
      required: true,
      unique: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    speaddress: { type: String, required: true },
    city: { type: String, required: true },
    ward: { type: String, required: true },
    paymethod: {
      type: Number,
      required: true,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Size",
          required: true,
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Color",
          required: true,
        },
        discount: {
          type: Number,
          required: true,
          min: 0,
          validate: {
            validator: Number.isInteger,
          },
        }, // số tiền giảm giá tại lúc đặt hàng sản phẩm đó
        price: {
          type: Number,
          required: true,
          min: 1,
          validate: {
            validator: Number.isInteger,
          },
        }, // giá tại lúc đặt hàng sản phẩm đó
        quantity: {
          type: Number,
          required: true,
          min: 1,
          validate: {
            validator: Number.isInteger,
          },
        },
      },
    ],
    status: {
      // -1: chờ thanh toán, 0: chờ xác nhận, 1: đã xác nhận, 2: đang giao, 3: đã giao, 4: hủy
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
      },
    },
  },
  { timestamps: true }
);

orderSchema.index({ status: 1 });

orderSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 900, partialFilterExpression: { status: -1 } }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
