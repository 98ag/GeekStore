import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../Store.ts";
import { useSelector } from "react-redux";

interface ShoppingCartState {
    products: { [key: string]: number }, // Products are stored as { id: quantity } pairs
    total: number
}

const initialState: ShoppingCartState = { total: 0, products: {} };

// Shopping cart global state.
//  Stores each added product's id and quantity as key:value pairs in an object (state.products), 
//  and the total number of products added (state.total).
export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: initialState,
    reducers: {
        cartAddOne: (state, { payload: id }: PayloadAction<string>) => {
            // If products[id] exists in state, increase quantity by one. Else add it and set initial quantity to 1.
            (!state.products[id])
                ? state.products[id] = 1
                : state.products[id]++;

            state.total++;
        },
        cartRemoveOne: (state, { payload: id }: PayloadAction<string>) => {
            // If the product's quantity == 1, remove it from state. Else decrease quantity by 1.
            if (state.products[id]) {
                (state.products[id] === 1)
                    ? delete state.products[id]
                    : state.products[id]--;

                state.total--;
            }
        },
        cartDelete: (state, { payload: id }:PayloadAction<string>) => {
            // If products[id] exists in state, remove quantity from total and delete the product from state
            if (state.products[id]) {
                state.total -= state.products[id];
                delete state.products[id];
            }
        },
    }
})

export const { cartAddOne, cartRemoveOne, cartDelete } = shoppingCartSlice.actions;

// Returns total number of products in the shopping cart
export const cartTotalQuantity = (state: RootState) => state.shoppingCart.total;

// Given an ID, returns the quantity of the product with that ID in the shopping cart
export const cartQuantityID = (id: string) => { return useSelector((state: RootState) => state.shoppingCart.products[id])};

// Returns an object with all the products in the shopping cart state (as { id: quantity })
export const cartAllProducts = (state: RootState) => state.shoppingCart.products;

export default shoppingCartSlice.reducer;
