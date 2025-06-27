import mongoose, { model, models, Schema } from "mongoose";

const inventorySchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
      required: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = models.Inventory || model("Inventory", inventorySchema);
export default Inventory;
