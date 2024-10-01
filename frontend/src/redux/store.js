import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Use 'authReducer' for clarity
import accountReducer from "./accountSlice"; // Use 'accountReducer' for clarity

const store = configureStore({
    reducer: {
        auth: authReducer, 
        account: accountReducer 
    }
});

export default store;
