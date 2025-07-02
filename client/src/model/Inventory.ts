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

inventorySchema.index({ product: 1 });
inventorySchema.index({ size: 1 });
inventorySchema.index({ color: 1 });

const Inventory = models.Inventory || model("Inventory", inventorySchema);
export default Inventory;
