import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {routes} from "../../constants/appPath";

export const Header = () => {
    const isAuth = true;

    const onClickLogout = () => {
    };

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
