import mongoose, { model, models, Schema } from "mongoose";

const orderDetailSchema = new Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  buy: [
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
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
});

orderDetailSchema.index({ order: 1 });

const OrderDetail =
  models.OrderDetail || model("OrderDetail", orderDetailSchema);
export default OrderDetail;
