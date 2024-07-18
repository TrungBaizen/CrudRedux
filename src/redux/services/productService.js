import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAll = createAsyncThunk(
    'products/getAll',
    async () => {
        let res = await axios.get('http://localhost:8080/students')
        return res.data;
    }
)

export const add = createAsyncThunk(
    'products/add',
    async (newProduct) => {
        let res = await axios.post('http://localhost:8080/students', newProduct);
        return res.data;
    }
)

export const remove = createAsyncThunk(
    'products/remove',
    async (id) => {
        let res = await axios.delete(`http://localhost:8080/students/${id}`);
        return res.data;
    }
)

export const edit = createAsyncThunk(
    'products/edit',
    async ({id,value}) => {
        let res = await axios.put(`http://localhost:8080/students/${id}`,value);
        return res.data;
    }
)

export const getById= createAsyncThunk(
    'products/getById',
    async (id)=>{
        let res=await axios.get(`http://localhost:8080/students/${id}`);
        return res.data;
    }
)