import mongoose, { model, models, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inventory",
          required: true,
        },
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
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ user: 1 });

// Xóa các cart sau 2 ngày nếu không có user
cartSchema.index(
  { updatedAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 2, // 2 ngày
    partialFilterExpression: { user: { $eq: null } },
  }
);

const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
