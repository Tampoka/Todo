import React from "react";
import {FilterValuesType} from "./App";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask:(id:string)=>void
    changeFilter:(value:FilterValuesType)=>void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t =>
                    <li key={t.id}>
                        <button onClick={()=>{props.removeTask(t.id)}}>x</button>
                        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span></li>)
            }

        </ul>
        <div>
            <button onClick={()=>{props.changeFilter("all")}}>All</button>
            <button onClick={()=>{props.changeFilter("active")}}>Active</button>
            <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
        </div>
    </div>
}