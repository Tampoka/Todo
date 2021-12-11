import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist} from "./Todolist";
import Box from '@mui/material/Box';
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, Grid, IconButton, Paper, ThemeProvider, Toolbar, Typography} from "@mui/material";
import themeOptions from "./common/color-sheme";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask=useCallback((id: string, todolistId: string)=> {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    },[dispatch])

    const addTask=useCallback((title: string, todolistId: string) =>{
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    },[dispatch])

    const changeStatus=useCallback((taskId: string, isDone: boolean, todolistId: string)=> {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    },[dispatch])

    const changeTaskTitle=useCallback((taskId: string, newTitle: string, todolistId: string)=> {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)
    },[dispatch])

    const changeTodolistTitle=useCallback((newTitle: string, todolistId: string)=> {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatch(action)
    },[dispatch])

    const changeFilter=useCallback((value: FilterValuesType, todolistId: string) =>{
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {
        const action = removeTodolistAC(id)
        dispatch(action)
    },[dispatch])

    const  addTodolist=useCallback((title: string) =>{
        const action = addTodolistAC(title)
        dispatch(action)
    },[dispatch])

/*    console.log(todolists)
    console.log(tasks)*/

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
                    </AppBar>
                </Box>
                <Container fixed >
                    <Grid container style={{padding: "20px"}} >
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={10} justifyContent="center">{
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id]

                            return <Grid item key={tl.id}>
                                <Paper elevation={12} style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        removeTodolist={removeTodolist}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                    </Grid>
                </Container>
            </div>
            </ThemeProvider>
    );
}

export default AppWithRedux;
