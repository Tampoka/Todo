import React, {useCallback, useEffect} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {Menu} from "@mui/icons-material";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import themeOptions from "../common/color-sheme";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {initializeAppTC, RequestStatusType} from "../redux/app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../features/Login/Login";
import {logoutTC} from "../redux/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgress size={40}
                                 sx={{
                                     color: 'primary',
                                     position: 'absolute',
                                     top: '50%',
                                     left: '50%',
                                     marginTop: '-20px',
                                     marginLeft: '-20px',
                                 }}/>
    }


    return (
        <BrowserRouter>
            <ThemeProvider theme={themeOptions}>
                <div className="App">
                    <Box sx={{flexGrow: 1}}>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <AppBar position={"static"}>
                            <Toolbar>
                                <IconButton edge={"start"} color={"inherit"} aria-label="menu" size="large"
                                            sx={{mr: 2}}>
                                    <Menu/>
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    News
                                </Typography>
                                {isLoggedIn && <Button color={"inherit"} onClick={logoutHandler}>Log out</Button>}
                            </Toolbar>
                            {status === 'loading' && <LinearProgress color='secondary'/>}
                        </AppBar>
                        <ErrorSnackBar/>
                    </Box>
                    <Container fixed>
                        <Routes>
                            <Route path="*" element={<TodolistsList demo={demo}/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>

                    </Container>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
