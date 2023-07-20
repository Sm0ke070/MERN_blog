import React, {FC} from "react";
import {Navigate} from "react-router";
import Paper from "@mui/material/Paper";
import {useForm} from "react-hook-form";
import styles from "./Login.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchLogin, fetchAuthParams} from "../../redux/slices/auth/auth";


export const Login: FC = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const {
        register,
        handleSubmit,
        setError,//FIX
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: '7777@qwe.com',
            password: '123456'
        },
        mode: "onChange"
    })

    const onSubmit = (values: fetchAuthParams) => {
        dispatch(fetchLogin(values))
    }

    // const onSubmit = async (values: fetchAuthParams) => {
    //     const data = await dispatch(fetchAuth(values))
    //     if (!data.payload) {
    //         return alert('Не удалось авторизоваться!');
    //     }
    //     // @ts-ignore
    //     if ('token' in data.payload.data) {
    //         // @ts-ignore
    //         window.localStorage.setItem('token', data.payload.data.token);
    //     }
    // }

    // const onSubmit = async (values: fetchAuthParams) => {
    //     const {payload} = await dispatch(fetchAuth(values));
    //     console.log(action, "QQQQQQQQQQQQQQQ")
    //     if (!action.payload) {
    //         return alert('Не удалось авторизоваться!');
    //     }
    //
    //     const token = payload.token;
    //     if (token) {
    //         window.localStorage.setItem('token', token);
    //     }
    // };


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
                <Button disabled={!isValid} type={'submit'} size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
