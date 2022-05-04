import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import alertReducer from "./alertSlice"

export default configureStore({
    reducer: {
        cart: cartReducer,
        alert: alertReducer
    },
});
