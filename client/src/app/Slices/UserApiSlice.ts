import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storeCredentials } from "./CredentialsSlice.ts";
import { RootState } from "../Store.ts";

interface LoginResponse {
    status: string;
    data: {
        username: string;
        token: string;
        isAdmin: boolean;
        expiration: number;
    };
}

type UserQueryForm = {
    username: string;
    password: string;
}

// Login, logout, signup endpoints.
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI,
        // Add currently logged-in user's JWT token to headers when sending a logout request
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = (getState() as RootState).credentials.token;
            if (token && endpoint === "logout")
                headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, UserQueryForm>({
            query: (credentials) => ({
                url:'/login',
                method: "POST",
                body: credentials,
            }),
            // If successful, store the returned credentials into state
            async onQueryStarted({}, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data && data.status === "success")
                        dispatch(storeCredentials(data.data));
                } catch { }
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: "POST",
            }),
        }),
        signup: builder.mutation<void, UserQueryForm>({
            query: (credentials) => ({
                url: '/signup',
                body: credentials,
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation } = userApi;
