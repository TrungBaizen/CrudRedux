import {createSlice} from "@reduxjs/toolkit";
import {add, edit, getAll, getAllPaginate, remove} from "../services/productService";

// Giá trị khởi tạo
const initialState = {
    list: {
        data:[],
        pages:0
    }
}

//Tạo ra các thông tin liên quan đến reducer sử dụng trong Store
const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAll.fulfilled, (state, {payload}) => {
            state.list.data = payload;
        })
        builder.addCase(getAllPaginate.fulfilled, (state, {payload}) => {
            state.list.data = payload.products;
            state.list.pages = payload.totalPages;
        })
        builder.addCase(add.fulfilled, (state, {payload}) => {
            state.list.data.push(payload);
            state.list.pages = payload.totalPages;
        })
        builder.addCase(edit.fulfilled, (state, {payload}) => {
            state.list.data = state.list.data.map(item => item.id === payload.id ? payload : item);
        })
        builder.addCase(remove.fulfilled, (state, {payload}) => {
            state.list.data =  state.list.data.filter(item => item.id !== payload.id);
            state.list.pages = payload.totalPages;
        })
    }
});
export default productSlice.reducer;