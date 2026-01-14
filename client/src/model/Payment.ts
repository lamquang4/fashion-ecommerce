import mongoose, { model, models, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymethod: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true, // 1 thành công, 0 hoàn tiền
    },
  },
  {
    timestamps: true,
  }
);

const Payment = models.Payment || model("Payment", paymentSchema);
export default Payment;
