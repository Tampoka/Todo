import React, {useCallback} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}
export type FilterValuesType = "all" | "active" | "completed"
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
    },[])

    const addTask=useCallback((title: string, todolistId: string) =>{
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    },[])

    const changeStatus=useCallback((taskId: string, isDone: boolean, todolistId: string)=> {
        const action = changeTaskStatusAC(taskId, todolistId, isDone)
        dispatch(action)
    },[])

    const changeTaskTitle=useCallback((taskId: string, newTitle: string, todolistId: string)=> {
        const action = changeTaskTitleAC(taskId, todolistId, newTitle)
        dispatch(action)
    },[])

    const changeTodolistTitle=useCallback((newTitle: string, todolistId: string)=> {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    },[])

    const changeFilter=useCallback((value: FilterValuesType, todolistId: string) =>{
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    },[])

    const removeTodolist=useCallback((id: string)=> {
        const action = removeTodolistAC(id)
        dispatch(action)
    },[])

    const  addTodolist=useCallback((title: string) =>{
        const action = addTodolistAC(title)
        dispatch(action)
    },[])
    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }
                            return <Grid item>
                                <Paper elevation={12} style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
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
    );
}

export default AppWithRedux;
