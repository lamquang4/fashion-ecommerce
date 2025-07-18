import mongoose, { model, models, Schema } from "mongoose";

const wishlistSchema = new Schema(
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

wishlistSchema.index({ user: 1 });

// Xóa các wishlist sau 7 ngày nếu không có user
wishlistSchema.index(
  { updatedAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 7, // 7 ngày
    partialFilterExpression: { user: { $eq: null } },
  }
);

const Wishlist = models.Wishlist || model("Wishlist", wishlistSchema);
export default Wishlist;
