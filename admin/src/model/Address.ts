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
    speaddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
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

addressSchema.index({ user: 1 });

const Address = models.Address || model("Address", addressSchema);
export default Address;
