import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, required: true, trim: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
