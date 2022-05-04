import {createSlice} from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alert",
    initialState: {
        id: 0,
        alertText: '',
        alertType: true
    },
    reducers: {
        newAlert(state, action) {
            state.alertText = action.payload.text
            state.alertType = action.payload.type || true
            state.id = state.id + 1
        }
    },
});

export const {newAlert} = alertSlice.actions;
export default alertSlice.reducer;
