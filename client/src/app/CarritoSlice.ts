import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./Store.ts";
import { useSelector } from "react-redux";

interface carritoState {
    p: { [key: string]: number },
    t: number
}

const data = JSON.parse(localStorage.getItem("carrito") || "null");
const estadoInicial: carritoState = (data)
                                    ? data
                                    : { t: 0, p: {} };

export const carritoSlice = createSlice({
    name: "carrito",
    initialState: estadoInicial,
    reducers: {
        agregarProducto: (state, action: PayloadAction<string>) => {
            (!state.p[action.payload])
                ? state.p[action.payload] = 1
                : state.p[action.payload]++;

            state.t++;
            localStorage.setItem("carrito", JSON.stringify(state));
        },
        quitarProducto: (state, action:PayloadAction<string>) => {
            (state.p[action.payload] === 1)
                ? delete state.p[action.payload]
                : state.p[action.payload]--;
            state.t--;
            localStorage.setItem("carrito", JSON.stringify(state));
        },
        eliminarProducto: (state, action:PayloadAction<string>) => {
            state.t -= state.p[action.payload];
            delete state.p[action.payload];
            localStorage.setItem("carrito", JSON.stringify(state));
        }
    }
})

export const { agregarProducto, quitarProducto, eliminarProducto } = carritoSlice.actions;

export const carritoTotal = (state: RootState) => state.carritoReducer.t;

export const carritoCantidadId = (id: string) => { return useSelector((state: RootState) => state.carritoReducer.p[id])};

export const carritoTodos = (state: RootState) => state.carritoReducer.p;

export default carritoSlice.reducer;