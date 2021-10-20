import React, {useReducer} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/tasks-reducer";


/*export function Counter() {
    let arr = useState(5)
    let data = arr[0]
    let setData = arr[1]
    return <div>
        <button onClick={() => {
            setData(data + 1)
        }}>+
        </button>
        {data}
        <button onClick={() => {
            setData(data - 1)
        }}>-
        </button>
    </div>
}*/

export type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const todolistId3 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
        {id: todolistId3, title: "What to watch", filter: "all"}
    ])
    const [tasksObj, dispatchToTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Broccoli", isDone: true},
            {id: v1(), title: "Juice", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Mayonnaise", isDone: false}
        ],
        [todolistId3]: [
            {id: v1(), title: "Terminator", isDone: true},
            {id: v1(), title: "Gentlemen of fortune", isDone: false},
            {id: v1(), title: "Avatar", isDone: false},
        ]
    })

    function removeTask(id: string, todolistId: string) {
      const action=removeTaskAC(id,todolistId)
        dispatchToTasks(action)
    }

    function addTask(title: string, todolistId: string) {
        const action=addTaskAC(title,todolistId)
        dispatchToTasks(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action=changeTaskStatusAC(taskId,todolistId,isDone)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action=changeTaskTitleAC(taskId,todolistId,newTitle)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolists(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolists(action)
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
                            let tasksForTodolist = tasksObj[tl.id]
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

export default AppWithReducers;