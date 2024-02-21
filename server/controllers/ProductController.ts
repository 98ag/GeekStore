import { ProductModel } from "../models/ProductModel";
import mongoose from "mongoose";
import { responseSuccess, responseFail, responseError } from "../utils/ResponseMessageTemplates";
import {query} from "express";

/** 
 * Adds a product to the database and returns it in the response body.
 * 
 * Possible error codes:
 *  - 400: Empty request body / Missing fields
 */
const createProduct = async (req, res) => {
    try {
        const body = req.body;

        // Error: empty request body
        if (!body) {
            return res
                .status(400)
                .json(responseFail("Provea un producto valido. Campos: img_url, categoria, precio, nombre, descripcion"));
        }

        const newProduct = new ProductModel(body);

        // Error: missing/empty parameters
        if (!newProduct)
            return res
                .status(400)
                .json(responseFail("El producto no es valido."));

        const result = await newProduct.save();

        return res
            .status(200)
            .json(responseSuccess(result));
    } catch (err) {
        return res
            .status(500)
            .json(responseError(err));
    }
}

/** 
 * Updates a product and returns it in the response body. The product ID is passed in the request params
 *  (e.g. /api/products/abcde)
 * 
 * Possible error codes:
 *  - 400: Empty request
 *  - 404: Invalid ID / ID doesn't match any product in the database
 */
const updateProduct = async (req, res) => {
    try {
        const body = req.body;

        // Error: request body is empty
        if (!body)
            return res
                .status(400)
                .json(responseFail("Se deben proveer parametros para actualizar el producto."));

        // Error: ID is not valid
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res
                .status(404)
                .json(responseFail("La ID no es valida."));

        const productDBMatch =
            await ProductModel.findByIdAndUpdate(req.params.id, body, { new: true }).select("-__v");

        // Error: no product with the given ID exists
        if (!productDBMatch)
            return res
                .status(404)
                .json(responseFail("La ID no corresponde a ningun producto."));

        return res
            .status(200)
            .json(responseSuccess(productDBMatch));
    } catch(err) {
        return res
            .status(400)
            .json(responseError(err));
    }
}

/** 
 *  Deletes a product from the database and returns it in the response body.
 * 
 * Possible error codes:
 *  - 404: Invalid ID / ID doesn't match any product in the database.
 */
const deleteProduct = async (req, res) => {
    try {
        // Error: ID is not valid
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res
                .status(404)
                .json(responseFail("La ID no es valida."));

        const producto = await ProductModel.findByIdAndDelete(req.params.id).select("-__v");

        // Error: no product with the given ID exists
        if (!producto)
            return res
                .status(404)
                .json(responseFail("La ID no corresponse a ningun producto."));

        return res
            .status(200)
            .json(responseSuccess(producto));
    } catch(err) {
        return res
            .status(500)
            .json(responseError(err));
    }
}

/**
 * Fetches all products from the database and return them in an array.
 *
 * If given a 'n' (quantity) query (e.g. /api/products?n=x where x is a positive int) returns an array with x most recently
 * added products.
 */
const fetchProducts = async (req, res) => {
    try {
        let productsArray: any;
        const queryValue = req.query.n;

        if (queryValue && queryValue >= 1)
            productsArray = await ProductModel.find({}).select("-__v").sort({_id: -1}).limit(queryValue);
        else
            productsArray = await ProductModel.find({}).select("-__v");

        return res
            .status(200)
            .json(responseSuccess(productsArray));
    } catch(err) {
        return res
            .status(500)
            .json(responseError(err));
    }
}

/**
 * Given a valid mongoose ID in the request params, returns the matching product in the response's data field.
 * 
 * Possible error codes:
 *  - 404: Invalid ID / ID doesn't match any product in the database.
 */
const fetchMatchingIDProduct = async (req, res) => {
    try {
        // Error: Invalid ID
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res
                .status(404)
                .json(responseFail("La ID no es valida."));

        const producto = await ProductModel.findById(req.params.id).select("-__v");

        // Error: ID doesn't match any product in the database
        if (!producto)
            return res
                .status(404)
                .json(responseFail("La ID no corresponse a ningun producto."));

        return res
            .status(200)
            .json(responseSuccess(producto));
    } catch(err) {
        return res
            .status(500)
            .json(responseError(err));
    }
}

const productController = { createProduct, updateProduct, deleteProduct, fetchProducts, fetchMatchingIDProduct };
export default productController;