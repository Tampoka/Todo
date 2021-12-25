import React, {useReducer} from 'react';
import '../app/App.css';
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "../redux/todolists-reducer";
import {addTaskAC, removeTaskAC, taskReducer, updateTaskAC} from "../redux/tasks-reducer";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {ThemeProvider} from "@emotion/react";
import themeOptions from '../common/color-sheme';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskStatuses} from "../api/todolist-api";

const AppWithReducers: React.FC = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const todolistId3 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {
            id: todolistId1, title: "What to learn", filter: "active", addedDate: '',
            order: 0, entityStatus: 'idle'
        },
        {
            id: todolistId2, title: "What to buy", filter: "completed", addedDate: '',
            order: 0, entityStatus: 'idle'
        },
        {
            id: todolistId3, title: "What to watch", filter: "all", addedDate: '',
            order: 0, entityStatus: 'idle'
        }
    ])
    const [tasksObj, dispatchToTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {
                id: v1(), title: "CSS", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            }
        ],
        [todolistId2]: [
            {
                id: v1(), title: "Broccoli", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId2,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Juice", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId2,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Bread", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId2,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId2,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Mayonnaise", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId2,
                order: 0,
                addedDate: ''
            }
        ],
        [todolistId3]: [
            {
                id: v1(), title: "Terminator", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId3,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Gentlemen of fortune", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId3,
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Avatar", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistId3,
                order: 0,
                addedDate: ''
            },
        ]
    })

    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC({
            todoListId: todolistId,
            title: title,
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "id exists",
        }))
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasks(updateTaskAC(taskId, {status}, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasks(updateTaskAC(taskId, {title: newTitle}, todolistId))
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        dispatchToTodolists(changeTodolistTitleAC(newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(changeTodolistFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC({
            title: title,
            id: v1(),
            addedDate: '',
            order: 0
        })
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    return (
        <ThemeProvider theme={themeOptions}>
            <div className="App">
                <Box sx={{flexGrow: 1}}>
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
                <Container fixed>
                    <Grid container style={{padding: "20px"}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={10}>{
                        todolists.map(tl => {
                            // let tasksForTodolist = tasksObj[tl.id]
                            // if (tl.filter === "active") {
                            //     tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            // }
                            return <Grid item key={tl.id}>
                                <Paper elevation={12} style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        todolist={tl}
                                        tasks={tasksObj[tl.id]}
                                        removeTask={removeTask}
                                        removeTodolist={removeTodolist}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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

export default AppWithReducers;
