import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../axios";
import {SortBy, Status} from "../auth/types";
import {RootState} from "../../store";

export interface IFetchPosts {
    _id: string
    title: string
    text: string
    imageUrl: string
    comments: Comments[]
    tags: string[]
    viewsCount: number
    user: {
        _id: string
        fullName: string
        email: string
        avatarUrl: string
    }
    createdAt: string
    updatedAt: string
}

export interface Comments {
    fullName: string
    text: string
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const sortBy = state.posts.sortBy
    const res = await axios.get<IFetchPosts[]>(`/posts?sortBy=${sortBy}`) //FIX any
    return res.data
})
export const fetchCurrentPosts = createAsyncThunk('posts/fetchCurrentPosts', async (postId: string) => {
    const res = await axios.get(`/posts/${postId}`)
    return res.data //FIX not used func
})


export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const res = await axios.get<string[]>('/tags')
    return res.data
})
export const deletePosts = createAsyncThunk('posts/deletePosts', async (id: string) => {
    await axios.delete<IFetchPosts>(`/posts/${id}`)
})


export interface IPostsSlicesState {
    sortBy: SortBy
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
    sortBy: SortBy.NEW,
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
    reducers: {
        setSortBy(state, action: PayloadAction<SortBy>) {
            state.sortBy = action.payload
        },
        setSortByTagName(state, action: PayloadAction<string>) {
            //FIX
        }
    },
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
                //FIX
            })
    }
})
export const {setSortBy, setSortByTagName} = postsSlices.actions
export const postsReducer = postsSlices.reducer