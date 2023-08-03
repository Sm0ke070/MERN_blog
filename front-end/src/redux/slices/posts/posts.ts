import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../axios";
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
    const res = await axios.get<any, any>('/posts') //FIX any
    return res.data
})
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const res = await axios.get<any, any>('/tags') //FIX any
    return res.data
})
export const deletePosts = createAsyncThunk('posts/deletePosts', async (id: string) => {
    await axios.delete<any, any>(`/posts/${id}`) //FIX any
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
            //FETCH POSTS
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
            //DELETE POSTS
            .addCase(deletePosts.pending, (state) => {
                //state.posts.status = Status.LOADING
                //FIX мб убрать пендинг/фуллвилд/реджект
            })
            .addCase(deletePosts.fulfilled, (state, action) => {
                state.posts.status = Status.SUCCESS
                state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
                //FIX
            })
            .addCase(deletePosts.rejected, (state) => {
                state.posts.status = Status.ERROR
                //FI X
            })
    }
})

export const postsReducer = postsSlices.reducer