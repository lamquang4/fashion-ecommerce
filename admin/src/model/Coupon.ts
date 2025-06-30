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

couponSchema.index({ code: "text" });
couponSchema.index({ status: 1 });

const Coupon = models.Coupon || model("Coupon", couponSchema);
export default Coupon;
