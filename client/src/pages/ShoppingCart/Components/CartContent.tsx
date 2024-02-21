import "../Styles/carritoSeccionProductos.css";
import CartCard from "./CartCard.tsx";
import { useGetAllProductsQuery } from "../../../app/Slices/ProductApiSlice.ts";
import { cartAllProducts, cartDelete } from "../../../app/Slices/ShoppingCartSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import React from "react";

export default function CartContent() {
    const {data: allProductsData} = useGetAllProductsQuery(null, {pollingInterval: 300000});
    const cartStateData = useSelector(cartAllProducts);
    const dispatch = useDispatch();
    let totalPrice = 0;

    const cardArray = () => {
        if (allProductsData)
            // Reduce the shopping cart state object entries array to an array of renderable elements (Cards), calculate the total price.
            // Reducer is used in case a product could not be found (deleted from the database), so the resulting array could be smaller than
            // the number of keys in the shopping cart state object.
            return Object.entries(cartStateData).reduce<React.ReactElement[]>((accumulator, currentValue, currentIndex) => {
                const [id, cant] = currentValue;
                // Find the product in global state for each id (key) in the shopping cart state object
                const foundProduct = allProductsData.find((obj) => obj._id === id);
                if (foundProduct) {
                    // Calculate the new total price
                    totalPrice += cant * foundProduct.price;

                    // Add product to resulting array
                    accumulator.push(
                        <CartCard
                            product={foundProduct}
                            quantity={cant}
                            key={currentIndex}
                        />
                    );
                }
                // If it doesn't exist, delete that product from the shopping cart state
                else dispatch(cartDelete(id));

                return accumulator;
            }, []);

        return [];
    }

    // Displays the current shopping cart, or a warning message if it's empty
    const cartContent = () => {
        const elementsArray = cardArray();
        // Return Card array and purchase button if array is not empty
        if (elementsArray.length)
            return (
                <>
                    {elementsArray}

                    <div className="cart__total">
                        <h1 className="cart__totalPrice">
                            Total: <span>${totalPrice}</span>
                        </h1>
                        <Button variant="contained">Comprar</Button>
                    </div>
                </>
            );

        // Return an error message and a link to /products
        return (
            <div className="cart__error">
                <h1 className="">El carrito esta vacio.</h1>
                <Link to={"/catalogo"}><span className="cart__errorLink">Volver al catalogo.</span></Link>
            </div>
        );
    }

    return (
        <div className="cart__container">
            { cartContent() }
        </div>
    )
}