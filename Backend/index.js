import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
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

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
