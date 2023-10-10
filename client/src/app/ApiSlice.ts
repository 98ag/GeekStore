import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Producto } from "../types/types.ts";

type ProductosResponse = {
    success: boolean;
    data: Producto[];
}

type ProductoPorIdResponse = {
    success: boolean;
    data: Producto;
}
export const productoApi = createApi({
    reducerPath: "productoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    endpoints: (builder) => ({
        getProductos: builder.query<ProductosResponse, void>({
            query: () => `/productos`,
        }),
        getProductoPorId: builder.query<ProductoPorIdResponse, string> ({
           query: (id) => `/producto/${id}`
        }),
    }),
})
export const { useGetProductosQuery, useGetProductoPorIdQuery } = productoApi;