import { model, models, Schema } from "mongoose";
import { validateEmail } from "@/utils/validateEmail";

const otpSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validateEmail,
      },
    },
    otp: { type: String },
    otpExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

// xóa document  khi giá trị otpExpires < thời gian hiện tại
otpSchema.index({ otpExpires: 1 }, { expireAfterSeconds: 0 });

const Otp = models.Otp || model("Otp", otpSchema);
export default Otp;
