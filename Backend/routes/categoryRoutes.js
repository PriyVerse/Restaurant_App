import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { addCategory, deleteCategory } from "../controllers/categoryController.js";
const categoryRoutes = express.Router();

categoryRoutes.post("/add".adminOnly,upload.single("image"),addCategory);
categoryRoutes.put("/update/:id",adminOnly,upload.single("image"),updateCategory);
categoryRoutes.delete("/update/:id",adminOnly,deleteCategory);
categoryRoutes.get("/all",getAllCategories);

export default categoryRoutes;
