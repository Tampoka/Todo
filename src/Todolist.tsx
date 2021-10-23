import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
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
    const onAllClickHandler = useCallback( ()=> props.changeFilter("all", props.id)
    ,[props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id)
    ,[props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id)
    ,[props.id])
    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)
    const onchangeTodolistTitleHandler = useCallback((newValue: string) => props.changeTodolistTitle(newValue, props.id)
    ,[])
    const addTask = useCallback((title: string) => props.addTask(title, props.id)
        , [props.addTask,props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3><EditableSpan onChange={onchangeTodolistTitleHandler} title={props.title}/>
            <IconButton onClick={onRemoveTodolistHandler} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <IconButton onClick={onRemoveHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                        <Checkbox checked={t.isDone}
                                  onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    </div>
                })
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

