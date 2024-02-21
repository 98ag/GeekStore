import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface productInterface {
        img_url: string;
        category: string;
        name: string;
        price: number;
        description: string;
}

const productSchema = new Schema<productInterface>(
    {
        img_url: { type: String, required: true },
        category: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true }
    }
);

export const ProductModel = mongoose.model<productInterface>('products', productSchema);