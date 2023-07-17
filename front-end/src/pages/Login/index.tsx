import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchAuth, fetchAuthParams, IFetchAuth, selectIsAuth} from "../../redux/slices/auth/auth";
import {Navigate} from "react-router";
import {PayloadAction} from "@reduxjs/toolkit";


export const Login = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth) //FIX

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: '7777@qwe.com',
            password: '123456'
        },
        mode: "onChange"
    })

    const onSubmit = async (values: fetchAuthParams) => {
        const data = await dispatch(fetchAuth(values))
        if (!data.payload) {
            return alert('Не удалось авторизоваться!');
        }
        // @ts-ignore
        if ('token' in data.payload.data) {
            // @ts-ignore
            window.localStorage.setItem('token', data.payload.data.token);
        }
    }
    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Укажите почту'})}
                    fullWidth
                />
                <TextField className={styles.field}
                           label="Пароль"
                           type={'password'}
                           {...register('password', {required: 'Укажите пароль'})}
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           fullWidth
                />
                <Button type={'submit'} size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
