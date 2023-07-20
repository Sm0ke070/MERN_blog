import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status} from "./types";
import axios from "../../../axios";

export type fetchAuthParams = {
    email: string
    password: string
}
export type fetchRegisterParams = {
    email: string
    password: string
    fullName: string
}
export const fetchLogin = createAsyncThunk<IFetchAuth, fetchAuthParams>('auth/fetchLogin', async (params: fetchAuthParams) => {
    const {data} = await axios.post<IFetchAuth>('/auth/login', params)
    return data
})
export const fetchAuthMe = createAsyncThunk<IFetchAuth>('auth/fetchAuthMe', async () => {
    const {data} = await axios.get<IFetchAuth>('/auth/me')
    return data;
})
export const fetchRegister = createAsyncThunk<IFetchAuth, fetchRegisterParams>('auth/fetchRegister', async (params: fetchRegisterParams) => {
    const {data} = await axios.post<any>('/auth/register', params)//FIX any
    return data;
})


export interface IFetchAuth {
    _id: string
    fullName: string
    email: string
    createdAt: Date
    updatedAt: Date
    token: string
}

interface IAuthSliceState {
    data: IFetchAuth | null
    isAuth: boolean
    status: Status
}

const initialState: IAuthSliceState = {
    data: null,
    isAuth: false,
    status: Status.LOADING,
}

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        logout: (state) => {
            state.data = null
            state.isAuth = false
        }
    },
    extraReducers: (builder) => {
        builder
            //LOGIN
            .addCase(fetchLogin.pending, (state) => {
                state.status = Status.LOADING
                state.data = null
            })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IFetchAuth>) => {
                state.status = Status.SUCCESS
                state.data = action.payload
                state.isAuth = true
                window.localStorage.setItem('token', action.payload.token)
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = Status.ERROR
                state.data = null
            })

            //AUTH_ME
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = Status.LOADING
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<IFetchAuth>) => {
                state.status = Status.SUCCESS
                state.data = action.payload
                state.isAuth = true
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = Status.ERROR
                state.data = null
            })

            //REGISTER
            .addCase(fetchRegister.pending, (state) => {
                state.status = Status.LOADING
                state.data = null
            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IFetchAuth>) => {
                state.status = Status.SUCCESS
                state.data = action.payload
                window.localStorage.setItem('token', action.payload.token)
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = Status.ERROR
                state.data = null
            })
    }

})
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions