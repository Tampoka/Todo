import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (title: string) => void
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
                props.addItem(newTaskTitle)
                setNewTaskTitle("")
            } else {
                setError("Title is required")
            }
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== ""
            && newTaskTitle !== "hell") {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    return <div>
        <TextField value={newTaskTitle}
                   variant={"outlined"}
                   label={"Type value"}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            // className={error ? "error" : ""}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addTask}  color={'primary'}>
            <AddBox/>
        </IconButton>
    </div>
}