import { model, models, Schema } from "mongoose";

const sizeSchema = new Schema(
  {
    namesize: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Size = models.Size || model("Size", sizeSchema);
export default Size;
