import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from "../../types/types.ts";
import type { RootState } from "../Store.ts"
import { cartDelete } from "./ShoppingCartSlice.ts";

interface ServerResponseBase {
    status: string;
}

interface ProductArrayResponse extends ServerResponseBase {
    data: Product[];
}

interface ProductIDResponse extends ServerResponseBase {
    data: Product;
}

// getAllProducts, getProductWithID, getLatestProducts endpoints. No authorization required.
// transformResponse is used to extract the response data and save it to state.
export const productNoAuthApi = createApi({
    reducerPath: "productNoAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URI }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], null>({
            query: () => `/products`,
            transformResponse: (response: ProductArrayResponse) => {
                // Sort products array alphabetically
                return response.data.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
            },
        }),
        getProductWithID: builder.query<Product, string> ({
            query: (id) => `/products/${id}`,
            transformResponse: (response: ProductIDResponse) => response.data,
        }),
        getLatestProducts: builder.query<Product[], number> ({
            query: (cant) => `/products?n=${cant}`,
            transformResponse: (response: ProductArrayResponse) => response.data,
        }),
    }),
})

// Create, Read, Update, Delete endpoints. Authorization token in headers is required.
export const productAuthApi = createApi({
    reducerPath: "productAuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI,
        // If there's an authorization token in state, add it to the 'authorization' headers
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).credentials.token;
            if (token)
                headers.set('authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        deleteProduct: builder.mutation<ProductIDResponse, string> ({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            // If successful, deletes the product from local state
            async onQueryStarted({ }, { dispatch, queryFulfilled }) {
                try {
                    const { data: deletedProduct } = await queryFulfilled;
                    const id = deletedProduct.data._id;
                    dispatch(
                        productNoAuthApi.util.updateQueryData('getAllProducts', null, (draft) => {
                            draft.splice(draft.findIndex(prod => prod._id === id), 1);
                        })
                    );
                    // Also deletes it from the shopping cart state
                    dispatch(cartDelete(id));
                } catch { }
            }
        }),
        updateProduct: builder.mutation<ProductIDResponse, Pick<Product, '_id'> & Partial<Product>>({
            query: ({ _id, ...patch}) => ({
                url: `/products/${_id}`,
                method: 'PATCH',
                body: patch,
            }),
            // If successful, modify the product in local state
            async onQueryStarted({ _id }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedProductoIdResponse } = await queryFulfilled;
                    const updatedProducto = updatedProductoIdResponse.data;
                    // Update getProducts state
                    dispatch(
                        productNoAuthApi.util.updateQueryData('getAllProducts', null, (draft) => {
                            const index = draft.findIndex(obj => obj._id === _id);
                            if (index >= 0) draft[index] = {...updatedProducto};
                        })
                    );
                    // Update getProductID state
                    dispatch(productNoAuthApi.util.updateQueryData('getProductWithID', _id, (draft) => {
                        draft = {...updatedProducto};
                        return draft;
                    }));
                } catch { }
            }
        }),
        createProduct: builder.mutation<ProductIDResponse, Partial<Product>> ({
            query: ({...patch}) => ({
                url: "/products",
                method: 'POST',
                body: patch,
            }),
            // If successful, append the product to local state array and sort it
            async onQueryStarted({}, {dispatch, queryFulfilled}) {
                try {
                    const { data: createdProducto } = await queryFulfilled;
                    const prod = createdProducto.data;
                    dispatch(
                        productNoAuthApi.util.updateQueryData('getAllProducts', null, (draft) => {
                            draft.push(prod);
                            draft.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
                        })
                    );
                } catch { }
            }
        }),
    })
})

export const { useGetAllProductsQuery, useGetProductWithIDQuery, useGetLatestProductsQuery } = productNoAuthApi;
export const { useDeleteProductMutation, useUpdateProductMutation, useCreateProductMutation } = productAuthApi;
