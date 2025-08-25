import { model, models, Schema } from "mongoose";

const sizeSchema = new Schema(
  {
    namesize: {
      type: String,
      required: true,
    },
    chest: {
      type: Number,
      required: true,
    },
    waist: {
      type: Number,
      required: true,
    },
    hip: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Size = models.Size || model("Size", sizeSchema);
export default Size;
