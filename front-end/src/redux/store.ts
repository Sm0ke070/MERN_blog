import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./slices/posts/posts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./slices/auth/auth";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => (AppDispatch) = useDispatch