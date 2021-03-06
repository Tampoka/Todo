import {useCallback, useEffect} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {Menu} from "@mui/icons-material";
import themeOptions from "../common/color-sheme";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store";
import {initializeAppTC} from "../redux/app-reducer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {logoutTC} from "../redux/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import {Login} from '../features/Login';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()

    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ThemeProvider theme={themeOptions}>
                <div className="App">
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position={"static"}>
                            <Toolbar>
                                <IconButton edge={"start"} color={"inherit"} aria-label="menu" size="large"
                                            sx={{mr: 2}}>
                                    <Menu/>
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    My Todos
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
