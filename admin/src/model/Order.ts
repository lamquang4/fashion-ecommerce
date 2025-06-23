import mongoose, { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: {
      fullname: { type: String, required: true },
      phone: { type: String, required: true },
      speaddress: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
    },
    paymethod: {
      type: Number,
      required: true,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    status: {
      type: Number,
      required: true,
    },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
