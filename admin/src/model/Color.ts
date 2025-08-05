import { model, models, Schema } from "mongoose";

const colorSchema = new Schema(
  {
    namecolor: {
      type: String,
      required: true,
    },
    codecolor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Color = models.Color || model("Color", colorSchema);
export default Color;
