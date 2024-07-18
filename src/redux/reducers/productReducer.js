import {createSlice} from "@reduxjs/toolkit";
import {add, getAll} from "../services/productService";
const initialState = {
    list:[]
}
const productSlice = createSlice({
    name:'products',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAll.fulfilled,(state, {payload})=>{
            state.list = payload;
        })
        builder.addCase(add.fulfilled,(state, {payload}) =>{
            state.list.push(payload);
        })
    }
});
export default productSlice.reducer;