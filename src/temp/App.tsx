import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {FilterValuesType, TodolistDomainType} from "../redux/todolists-reducer";
import {TasksStateType} from "../redux/tasks-reducer";
import {TaskStatuses} from "../api/todolist-api";

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const todolistId3 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {
            id: todolistId1, title: "What to learn", filter: "active", addedDate: '',
            order: 0, entityStatus: 'idle',
        },
        {
            id: todolistId2, title: "What to buy", filter: "completed", addedDate: '',
            order: 0, entityStatus: 'idle',
        },
        {
            id: todolistId3, title: "What to watch", filter: "all", addedDate: '',
            order: 0, entityStatus: 'idle',
        }
    ])
    const [tasksObj, setTasks] = useState<TasksStateType>({
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
        let todolistTasks = tasksObj[todolistId]
        tasksObj[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {
            id: v1(), title: title, status: TaskStatuses.New, description: 'new task',
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: todolistId,
            order: 0,
            addedDate: ''
        }
        tasksObj[todolistId] = [newTask, ...tasksObj[todolistId]]
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        let task = tasksObj[todolistId].find(t => t.id === taskId)
        if (task) {
            task.status = status
        }
        setTasks({...tasksObj})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let task = tasksObj[todolistId].find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }

    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasksObj[id]
        setTasks({...tasksObj})
    }

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            filter: "all",
            title: title,
            addedDate: '',
            order: 0,
            entityStatus: 'idle',
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

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
                            return <Grid item key={tl.id}>
                                <Paper elevation={12} style={{padding: "10px"}}>
                                    <Todolist
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
    );
}

export default App;
