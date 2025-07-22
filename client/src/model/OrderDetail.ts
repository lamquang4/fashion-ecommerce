import mongoose, { model, models, Schema } from "mongoose";

const orderDetailSchema = new Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
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
      discount: { type: Number, required: true }, // số tiền giảm giá tại lúc đặt hàng sản phẩm đó
      price: { type: Number, required: true }, // giá tại lúc đặt hàng sản phẩm đó
      quantity: { type: Number, required: true },
    },
  ],
});

orderDetailSchema.index({ order: 1 });

const OrderDetail =
  models.OrderDetail || model("OrderDetail", orderDetailSchema);
export default OrderDetail;
