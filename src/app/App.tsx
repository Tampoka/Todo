import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, IconButton, LinearProgress, ThemeProvider, Toolbar, Typography} from "@mui/material";
import themeOptions from "../common/color-sheme";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {RequestStatusType} from "../redux/app-reducer";

function App() {
const status=useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)
    return (
        <ThemeProvider theme={themeOptions}>
            <div className="App">
                <Box sx={{flexGrow: 1}}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <AppBar position={"static"}>
                        <Toolbar>
                            <IconButton edge={"start"} color={"inherit"} aria-label="menu" size="large" sx={{mr: 2}}>
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                News
                            </Typography>
                            <Button color={"inherit"}>Login</Button>
                        </Toolbar>
                        {status==='loading'&& <LinearProgress color='secondary'/>}
                    </AppBar>
                    <ErrorSnackBar/>
                </Box>
                <Container fixed>
                    <TodolistsList/>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
