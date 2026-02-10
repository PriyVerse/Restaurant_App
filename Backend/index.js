import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import connectCloudinary from "./config/clodinary.js";
dotenv.config();

const app = express();
//database connection
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/auth",authRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/booking",bookingRoutes)
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
