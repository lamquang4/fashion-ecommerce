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

sizeSchema.index({ namesize: "text" });

const Size = models.Size || model("Size", sizeSchema);
export default Size;
