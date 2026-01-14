import mongoose, { model, models, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
      },
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
      },
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ status: 1, slug: 1 });

const Product = models.Product || model("Product", productSchema);
export default Product;
