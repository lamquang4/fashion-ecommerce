import mongoose, { model, models, Schema } from "mongoose";

const addressSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    speaddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    default: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = models.Address || model("Address", addressSchema);
export default Address;
