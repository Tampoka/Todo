import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)
    return <div>
        <h3>{props.title}
            <button onClick={onRemoveTodolistHandler}>x</button>
        </h3>
        <AddItemForm id={props.id} addTask={props.addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <button onClick={onRemoveHandler}>x</button>
                        <input type="checkbox" checked={t.isDone}
                               onChange={onCheckboxChangeHandler}/><span>{t.title}</span></li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

type addItemFormPropsType = {
    addTask:(title:string,todolistId:string)=>void
    id:string
}

function AddItemForm(props: addItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle((e.currentTarget.value))
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (newTaskTitle.trim() !== ""
                && newTaskTitle !== "hell") {
                props.addTask(newTaskTitle, props.id)
                setNewTaskTitle("")
            } else {
                setError("Title is required")
            }
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== ""
            && newTaskTitle !== "hell") {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    return <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}/>
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}
