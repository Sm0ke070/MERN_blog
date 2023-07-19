import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../axios";
import {AxiosResponse} from "axios";
import {Status} from "../auth/types";

export interface IFetchPosts {
    _id: string
    title: string
    text: string
    imageUrl: string
    tags: string[]
    viewsCount: number
    user: {
        _id: string
        fullName: string
        email: string
    }
    createdAt: string
    updatedAt: string
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const res = await axios.get<AxiosResponse, any>('/posts')
    return res.data
})
export const fetchTags = createAsyncThunk('fetchTags', async () => {
    const res = await axios.get<any, any>('/tags')
    return res.data
})


export interface IPostsSlicesState {
    posts: {
        items: IFetchPosts[]
        status: Status
    }
    tags: {
        items: string[]
        status: Status
    }
}

const initialState: IPostsSlicesState = {
    posts: {
        items: [],
        status: Status.LOADING
    },
    tags: {
        items: [],
        status: Status.LOADING
    }
}

const postsSlices = createSlice({
    initialState,
    name: 'posts',
    reducers: {},
    extraReducers: (builder) => {
        builder
            //POSTS
            .addCase(fetchPosts.pending, (state) => {
                state.posts.items = []
                state.posts.status = Status.LOADING
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IFetchPosts[]>) => {
                state.posts.items = action.payload
                state.posts.status = Status.SUCCESS
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts.items = []
                state.posts.status = Status.ERROR
            })
            //TAGS
            .addCase(fetchTags.pending, (state) => {
                state.tags.items = []
                state.posts.status = Status.LOADING
            })
            .addCase(fetchTags.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.tags.items = action.payload
                state.tags.status = Status.SUCCESS
            })
            .addCase(fetchTags.rejected, (state) => {
                state.tags.items = []
                state.tags.status = Status.ERROR
            })
    }
})

export const postsReducer = postsSlices.reducer