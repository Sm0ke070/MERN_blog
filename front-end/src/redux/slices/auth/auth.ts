import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status} from "./types";
import axios from "../../../axios";
import {AxiosResponse} from "axios";

export type fetchAuthParams = {
    email: string
    password: string
}
export const fetchAuth = createAsyncThunk('fetchUserData', async (params: fetchAuthParams) => {
    const data = await axios.post<AxiosResponse, IFetchAuth>('/auth/login', params)
    return data
})

export interface IFetchAuth {
    _id: string
    fullName: string
    email: string
    createdAt: Date
    updatedAt: Date
}

interface IAuthSliceState {
    data: null | IFetchAuth
    status: Status
}

const initialState: IAuthSliceState = {
    data: null,
    status: Status.LOADING
}

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            //AUTH
            .addCase(fetchAuth.pending, (state) => {
                state.status = Status.LOADING
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<IFetchAuth>) => {
                state.status = Status.SUCCESS
                state.data = action.payload
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = Status.ERROR
                state.data = null
            })
    }

})
export const selectIsAuth = (state: any) => Boolean(state.auth.data) //FIX
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions