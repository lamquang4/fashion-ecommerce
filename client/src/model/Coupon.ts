import { model, models, Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discountValue: {
      // giá trị giảm
      type: Number,
      required: true,
    },
    discountType: {
      // loại phiếu gồm free, %, giá trị cố định
      type: Number,
      required: true,
    },
    amount: {
      // số lượng phiếu
      type: Number,
      required: true,
    },
    limit: {
      // giới hạn mỗi user được dùng mấy lần
      type: Number,
      required: true,
    },
    startDate: {
      // ngày bắt đầu
      type: Date,
      required: true,
    },
    expiryDate: {
      // ngày kết thúc
      type: Date,
      required: true,
    },
    minOrderValue: {
      // tiền đơn hàng tối thiểu được sủ dụng phiếu
      type: Number,
    },
    maxDiscountValue: {
      // chỉ áp dụng cho loại phiếu %, số tiền giảm tối đa
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

couponSchema.index({ status: 1 });

const Coupon = models.Coupon || model("Coupon", couponSchema);
export default Coupon;
