import React, {FC} from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {routes} from "../../constants/appPath";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {logout, selectIsAuth} from "../../redux/slices/auth/auth";

export const Header: FC = () => {
    const isAuth = useAppSelector(selectIsAuth) //FIX
    const dispatch = useAppDispatch()



    const onClickLogout = () => {
        dispatch(logout())
    }

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to={routes.HOME}>
                        <div>MERN BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/posts/create">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to={routes.LOGIN}>
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to={routes.REGISTER}>
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
