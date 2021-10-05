import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string,) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)
    const onchangeTodolistTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(newValue, props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return <div>
        <h3><EditableSpan onChange={onchangeTodolistTitleHandler} title={props.title}/>
            <IconButton onClick={onRemoveTodolistHandler} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <IconButton onClick={onRemoveHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                        <Checkbox  checked={t.isDone}
                               onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === "all" ? "contained": "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

