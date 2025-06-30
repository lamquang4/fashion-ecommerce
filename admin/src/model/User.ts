import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
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

userSchema.index({ fullname: "text", email: "text" });
userSchema.index({ status: 1 });
userSchema.index({ role: 1 });

const User = models.User || model("User", userSchema);
export default User;
