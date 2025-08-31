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
      min: 1,
      validate: {
        validator: Number.isInteger,
      },
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
      min: 0,
      validate: {
        validator: Number.isInteger,
      },
    },
    limit: {
      // giới hạn mỗi user được dùng mấy lần
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
      },
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
      min: 0,
      validate: {
        validator: Number.isInteger,
      },
    },
    maxDiscountValue: {
      // chỉ áp dụng cho loại phiếu %, số tiền giảm tối đa
      type: Number,
      min: 1,
      validate: {
        validator: Number.isInteger,
      },
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
