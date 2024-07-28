import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAll = createAsyncThunk(
    'categories/getAll',
    async () => {
        let res = await axios.get('http://localhost:3000/categories')
        return res.data;
    }
)