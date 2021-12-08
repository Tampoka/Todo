import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {TaskType} from "./state/tasks-reducer";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string,) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo(function (props: TodolistPropsType) {
    console.log("todolist is rendering")
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id)
        , [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id)
        , [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id)
        , [props.changeFilter, props.id])
    const onRemoveTodolistHandler = useCallback(() => props.removeTodolist(props.id),[props.removeTodolist,props.id])
    const onchangeTodolistTitleHandler = useCallback((newValue: string) => props.changeTodolistTitle(newValue, props.id)
        , [props.changeTodolistTitle, props.id])
    const addTask = useCallback((title: string) => props.addTask(title, props.id)
        , [props.addTask, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3><EditableSpan onChange={onchangeTodolistTitleHandler} title={props.title}/>
            <IconButton onClick={onRemoveTodolistHandler} aria-label="delete" color="error">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    todolistId={props.id}
                    key={t.id}
                    task={t}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}/>)
            }
        </div>
        <div style={{padding: "10px"}}>
            <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

