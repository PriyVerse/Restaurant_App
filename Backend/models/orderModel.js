import mongoose from "mongoose";

const orderScheme = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "delivered"],
      default: "pending",
    },
    paymentMethod: { type: String, enum: ["cash", "card"], required: true },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderScheme);
export default Order;
