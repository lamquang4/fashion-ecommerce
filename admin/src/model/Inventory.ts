import mongoose, { model, models, Schema } from "mongoose";

const inventorySchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    inventories: [
      {
        quantity: {
          type: Number,
          required: true,
          min: 1,
          validate: {
            validator: Number.isInteger,
          },
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Size",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

inventorySchema.index({ product: 1 });

const Inventory = models.Inventory || model("Inventory", inventorySchema);
export default Inventory;
