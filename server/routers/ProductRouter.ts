import express from "express";
import productController from "../controllers/ProductController";

export const productRouter = express.Router();

productRouter.get("/products", productController.fetchProducts);
productRouter.get("/products/:id", productController.fetchMatchingIDProduct);