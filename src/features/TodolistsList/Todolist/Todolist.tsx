import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {Delete} from "@mui/icons-material";
import {Button, IconButton, List, ListItem} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType} from "../../../redux/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../../redux/tasks-reducer";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string,) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    demo?: boolean
}

export const Todolist = React.memo(function (props: TodolistPropsType) {
    const {
        id, title, tasks, removeTask, removeTodolist, changeFilter, addTask, changeTaskStatus,
        changeTaskTitle, changeTodolistTitle, filter, demo = false
    } = props


    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) return
        dispatch(fetchTasksTC(id))
    }, [dispatch, id,demo])

    console.log("todolist is rendering")
    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id])
    const onRemoveTodolistHandler = useCallback(() => removeTodolist(id), [removeTodolist, id])
    const onchangeTodolistTitleHandler = useCallback((newValue: string) => changeTodolistTitle(newValue, id), [changeTodolistTitle, id])
    const onAddTask = useCallback((title: string) => addTask(title, id), [addTask, id])

    let tasksForTodolist = tasks

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><IconButton onClick={onRemoveTodolistHandler} aria-label="delete" color="error">
            <Delete/>
        </IconButton>
            <EditableSpan onChange={onchangeTodolistTitleHandler} title={title}/>
        </h3>
        <AddItemForm addItem={onAddTask}/>
        <div>
            <List sx={{bgcolor: "background.paper"}}>
                {tasksForTodolist.map(t =>
                    <ListItem key={t.id}>
                        <Task
                            todolistId={id}
                            task={t}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}/>
                    </ListItem>)
                }</List>
        </div>
        <div style={{padding: "10px"}}>
            <Button variant={filter === "all" ? "contained" : undefined} onClick={onAllClickHandler}
                    color="inherit">All</Button>
            <Button color="primary" variant={filter === "active" ? "contained" : undefined}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color="secondary" variant={filter === "completed" ? "contained" : undefined}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

