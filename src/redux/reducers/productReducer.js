import {createSlice} from "@reduxjs/t oolkit";
import {add, getAll} from "../services/productService";

// Giá trị khởi tạo
const initialState = {
    list:[]
}

//Tạo ra các thông tin liên quan đến reducer sử dụng trong Store
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