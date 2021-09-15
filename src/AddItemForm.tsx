import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addTask: (title: string, todolistId: string) => void
    id: string
}

export function AddItemForm(props: addItemFormPropsType) {
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