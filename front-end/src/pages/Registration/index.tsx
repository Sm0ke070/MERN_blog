import React, {FC} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchRegister, fetchRegisterParams} from "../../redux/slices/auth/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router";

export const Registration: FC = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)


    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        mode: "onChange"
    })
    if (isAuth) {
        return <Navigate to={'/'}/>
    }
    const onSubmit = (values: fetchRegisterParams) => {
        dispatch(fetchRegister(values))
    }
    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Имя"
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', {required: 'Укажите Имя'})}
                    fullWidth
                />
                <TextField className={styles.field}
                           label="E-Mail"
                           {...register('email', {required: 'Укажите email'})}
                           error={Boolean(errors.email?.message)}
                           helperText={errors.email?.message}
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
                    Зарегистрироваться
                </Button>
            </form>

        </Paper>
    );
};
