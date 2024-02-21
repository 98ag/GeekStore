import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../Store.ts";

interface CredentialsState {
    username: string;
    token: string;
    isAdmin: boolean;
    expiration: number;
}

const initialState: CredentialsState =  { token: "", username: "", isAdmin: false, expiration: 0 };

// User authorization credentials state. Stores auth token (JWT), username, whether the user has admin
//  rights and the expiration time (used for displaying a 'session expired' message).
const credentialsSlice = createSlice({
    name: "credentials",
    initialState,
    reducers: {
        storeCredentials: (state, action: PayloadAction<CredentialsState>) => {
            const { token, username, isAdmin, expiration } = action.payload;
            state.token = token;
            state.username = username;
            state.isAdmin = isAdmin;
            state.expiration = expiration;
        },
        deleteCredentials: (state) => {
            state.token = "";
            state.username = "";
            state.isAdmin = false;
            state.expiration = 0;
        }
    }
})

export const { storeCredentials, deleteCredentials } = credentialsSlice.actions;

export const getCredentials = (state: RootState) => state.credentials;

export default credentialsSlice.reducer;