import React from "react";

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask:(id:number)=>void
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
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}