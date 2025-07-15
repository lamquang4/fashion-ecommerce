import mongoose, { model, models, Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
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

const Wishlist = models.Wishlist || model("Wishlist", wishlistSchema);
export default Wishlist;
