import mongoose, { model, models, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
       inventory: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Size",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ user: 1 });

const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
