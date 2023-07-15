import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
import {AxiosResponse} from "axios";

interface IFetchPosts {
    _id: string
    title: string
    text: string
    tags: string[]
    viewsCount: number
    user: {
        _id: string
        fullName: string
        email: string
    }
    createdAt: Date
    updatedAt: Date
}

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    return await axios.get<AxiosResponse, IFetchPosts>('/posts')
})


const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postsSlices = createSlice({
    initialState,
    name: 'posts',
    reducers: {}
})

export const postsReducer = postsSlices.reducer