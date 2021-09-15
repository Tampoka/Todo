import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (taskId: string, newValue:string, todolistId: string) => void
    changeTodolistTitle:(newTitle:string,todolistId:string)=>void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onRemoveTodolistHandler = () => props.removeTodolist(props.id)
    const onchangeTodolistTitleHandler=(newValue:string)=>{
        props.changeTodolistTitle(newValue,props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return <div>
        <h3><EditableSpan onChange={onchangeTodolistTitleHandler} title={props.title}/>
            <button onClick={onRemoveTodolistHandler}>x</button>
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

                    const onChangeTitleHandler = (newValue:string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <button onClick={onRemoveHandler}>x</button>
                        <input type="checkbox" checked={t.isDone}
                               onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    </li>
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

