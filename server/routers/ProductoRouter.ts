import express from "express";
import ProductoController from "../controllers/ProductoController";

export const productoRouter = express.Router();

productoRouter.post("/productos", ProductoController.crearProducto);
productoRouter.patch("/producto/:id", ProductoController.actualizarProducto);
productoRouter.delete("producto/:id", ProductoController.borrarProducto);
productoRouter.get("/productos", ProductoController.traerProductos);
productoRouter.get("/producto/:id", ProductoController.traerProductoId);