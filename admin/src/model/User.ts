import { model, models, Schema } from "mongoose";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import { validateBirthday } from "@/utils/validateBirthday";
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validateEmail,
      },
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validatePhone,
      },
    },
    birthday: {
      type: Date,
      required: true,
      validate: {
        validator: validateBirthday,
      },
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

userSchema.index({ status: 1, role: 1 });

const User = models.User || model("User", userSchema);
export default User;
