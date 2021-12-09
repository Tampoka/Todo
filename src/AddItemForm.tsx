import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: addItemFormPropsType) {
        const [newTaskTitle, setNewTaskTitle] = useState("")
        const [error, setError] = useState<boolean>(false)

        const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            error && setError(false)
            setNewTaskTitle((e.currentTarget.value))
        }
        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            error && setError(false)
            if (e.key === "Enter") {
                addTask()
            }
        }
        const addTask = () => {
            if (newTaskTitle.trim() !== ""
                && newTaskTitle !== "go to hell") {
                props.addItem(newTaskTitle)
                setNewTaskTitle("")
            } else {
                setError(true)
            }
        }

        return <div>
            <TextField value={newTaskTitle}
                       variant={"outlined"}
                       label={error ? "Title is required" : "Enter title"}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={error}
                       size="small"/>
            <IconButton onClick={addTask} color={'primary'}>
                <AddBox/>
            </IconButton>
        </div>
    }
)