import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, IconButton, LinearProgress, ThemeProvider, Toolbar, Typography} from "@mui/material";
import themeOptions from "../common/color-sheme";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";

function App() {

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
                        {/*<LinearProgress/>*/}
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
