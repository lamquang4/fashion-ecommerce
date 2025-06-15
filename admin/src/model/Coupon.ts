import { model, models, Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    discountType: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    minOrderValue: {
      type: Number,
      required: true,
    },
    maxDiscountValue: {
      type: Number,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = models.Coupon || model("Coupon", couponSchema);
export default Coupon;
