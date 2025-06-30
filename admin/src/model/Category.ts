import { model, models, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    namecategory: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
    },
    image: {
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
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ namecategory: "text" });
categorySchema.index({ status: 1 });

const Category = models.Category || model("Category", categorySchema);
export default Category;
