import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface ProductoInterface {
        img_url: string;
        categoria: string;
        nombre: string;
        precio: number;
        descripcion: string;
}

const ProductoSchema = new Schema<ProductoInterface>(
    {
        img_url: { type: String, required: true },
        categoria: { type: String, required: true },
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        descripcion: { type: String, required: true }
    }
)

export const Producto = mongoose.model<ProductoInterface>('productos', ProductoSchema);