import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAll = createAsyncThunk(
    'products/getAll',
    async () => {
        let res = await axios.get('http://localhost:3000/products?_embed=category')
        return res.data;
    }
)
export const getAllPaginate = createAsyncThunk(
    'products/getAllPaginate',
    async (page) => {
        let res = await axios.get(`http://localhost:3000/products?_embed=category&_page=${page}&_per_page=3`)
        return {
            products: res.data.data,
            totalPages: res.data.pages
        };
    }
)
export const add = createAsyncThunk(
    'products/add',
    async (newProduct) => {
        let res = await axios.post('http://localhost:3000/products', newProduct);
        return res.data;
    }
)

export const remove = createAsyncThunk(
    'products/remove',
    async (id) => {
        let res = await axios.delete(`http://localhost:3000/products/${id}`);
        return res.data;
    }
)

export const edit = createAsyncThunk(
    'products/edit',
    async ({id,value}) => {
        let res = await axios.put(`http://localhost:3000/products/${id}`,value);
        return res.data;
    }
)

export const getById= createAsyncThunk(
    'products/getById',
    async (id)=>{
        let res=await axios.get(`http://localhost:3000/products/${id}?_embed=category`);
        return res.data;
    }
)