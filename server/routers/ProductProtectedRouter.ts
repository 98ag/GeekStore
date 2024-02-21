import express from "express";
import productController from "../controllers/ProductController";
import { productRouter } from "./ProductRouter";
import verifyToken from "../middleware/VerifyToken";

export const productProtectedRouter = express.Router();

// verifyToken(true, true): verifies that the token is valid and the user has admin rights
productRouter.post("/products", await verifyToken(true, true), productController.createProduct);
productRouter.patch("/products/:id", await verifyToken(true, true), productController.updateProduct);
productRouter.delete("/products/:id", await verifyToken(true, true), productController.deleteProduct);