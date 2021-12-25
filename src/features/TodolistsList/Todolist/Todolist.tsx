import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {Delete} from "@mui/icons-material";
import {Button, IconButton, List, ListItem} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../../../redux/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../../redux/tasks-reducer";


type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string,) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function (props: TodolistPropsType) {
    const {
        todolist,tasks, removeTask, removeTodolist, changeFilter, addTask, changeTaskStatus,
        changeTaskTitle, changeTodolistTitle, demo = false
    } = props


    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) return
        dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id, demo])

    console.log("todolist is rendering")
    const onAllClickHandler = useCallback(() => changeFilter("all", todolist.id), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", todolist.id), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", todolist.id), [changeFilter, todolist.id])
    const onRemoveTodolistHandler = useCallback(() => removeTodolist(todolist.id), [removeTodolist, todolist.id])
    const onchangeTodolistTitleHandler = useCallback((newValue: string) => changeTodolistTitle(newValue, todolist.id), [changeTodolistTitle, todolist.id])
    const onAddTask = useCallback((title: string) => addTask(title, todolist.id), [addTask, todolist.id])

    let tasksForTodolist = tasks

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><IconButton onClick={onRemoveTodolistHandler} aria-label="delete" color="error"
        disabled={todolist.entityStatus==='loading'}>
            <Delete/>
        </IconButton>
            <EditableSpan onChange={onchangeTodolistTitleHandler} title={todolist.title}
            disabled={todolist.entityStatus==='loading'}/>
        </h3>
        <AddItemForm addItem={onAddTask} disabled={todolist.entityStatus==='loading'}/>
        <div>
            <List sx={{bgcolor: "background.paper"}}>
                {tasksForTodolist.map(t =>
                    <ListItem key={t.id}>
                        <Task
                            todolistId={todolist.id}
                            disabled={todolist.entityStatus==='loading'}
                            task={t}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}/>
                    </ListItem>)
                }</List>
        </div>
        <div style={{padding: "10px"}}>
            <Button variant={todolist.filter === "all" ? "contained" : undefined} onClick={onAllClickHandler}
                    color="inherit">All</Button>
            <Button color="primary" variant={todolist.filter === "active" ? "contained" : undefined}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color="secondary" variant={todolist.filter === "completed" ? "contained" : undefined}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

