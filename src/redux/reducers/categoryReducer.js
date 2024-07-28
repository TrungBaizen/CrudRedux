import {createSlice} from "@reduxjs/toolkit";
import {getAll} from "../services/categoryService";

const initialState = {
    list: []
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAll.fulfilled, (state, {payload}) => {
            state.list = payload;
        })
    }
});
export default categorySlice.reducer;