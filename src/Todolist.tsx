import React, {useState} from "react";
import {FilterValuesType} from "./App";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={(e) => {
                       setNewTaskTitle((e.currentTarget.value))
                   }}
                   onKeyPress={(e) => {
                       if (e.key === "Enter") {
                           props.addTask(newTaskTitle)
                           setNewTaskTitle("")
                       }
                   }}
            />
            <button onClick={() => {
                props.addTask(newTaskTitle)
                setNewTaskTitle("")
            }}>+
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t =>
                    <li key={t.id}>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>x
                        </button>
                        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span></li>)
            }

        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>Completed
            </button>
        </div>
    </div>
}