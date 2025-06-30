import { model, models, Schema } from "mongoose";

const bannerSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    type: {
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

bannerSchema.index({ type: 1, status: 1 });

const Banner = models.Banner || model("Banner", bannerSchema);
export default Banner;
