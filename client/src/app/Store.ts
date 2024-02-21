import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import shoppingCartSliceReducer from "./Slices/ShoppingCartSlice.ts"
import { productNoAuthApi, productAuthApi } from "./Slices/ProductApiSlice.ts"
import credentialsSliceReducer from "./Slices/CredentialsSlice.ts"
import { userApi } from "./Slices/UserApiSlice.ts";

// Redux Persist config. Only persists 'shoppingCart' and 'auth' states.
const persistConfig = {
    key: "root",
    storage,
    whitelist: ['shoppingCart', 'credentials'],
}

const reducers = combineReducers({
    shoppingCart: shoppingCartSliceReducer,
    credentials: credentialsSliceReducer,
    productNoAuthApi: productNoAuthApi.reducer,
    productAuthApi: productAuthApi.reducer,
    userApi: userApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Global state settings
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(
        productNoAuthApi.middleware,
        productAuthApi.middleware,
        userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);