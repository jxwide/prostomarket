import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [],
    },
    reducers: {
        addToCart(state, action) {
            state.cartProducts.push({
                productId: action.payload.productId,
            });
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
