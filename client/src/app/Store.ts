import { configureStore } from "@reduxjs/toolkit"
// @ts-ignore
import carritoReducer from "./CarritoSlice.ts"
import { productoApi } from "./ApiSlice.ts"

export const store = configureStore({
    reducer: {
        carritoReducer,
        [productoApi.reducerPath]: productoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;