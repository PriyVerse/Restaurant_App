import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    numberOfPeople: { type: Number, required: true },
    phone: { type: String, required: true, trim: true, min:1 },
    date: { type: String, required: true },
    time: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

