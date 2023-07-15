import React from "react";
import Container from "@mui/material/Container";
import {Header} from "./components";

import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import NotFound from "./pages/NotFound";
import {routes} from "./constants/appPath";
import {Route, Routes} from "react-router";


function App() {

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path={routes.HOME} element={<Home/>}/>
                    <Route path={routes.POSTS} element={<FullPost/>}/>
                    <Route path={routes.ADD_POST} element={<AddPost/>}/>
                    <Route path={routes.LOGIN} element={<Login/>}/>
                    <Route path={routes.REGISTER} element={<Registration/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
