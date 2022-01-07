import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";

type addItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}

export const AddItemForm = React.memo(function ({addItem,disabled=false}: addItemFormPropsType) {
        const [newTaskTitle, setNewTaskTitle] = useState("")
        const [error, setError] = useState<boolean>(false)

        const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            error && setError(false)
            setNewTaskTitle((e.currentTarget.value))
        }
        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            error && setError(false)
            if (e.key === "Enter") {
                addItemHandler()
            }
        }
        const addItemHandler = () => {
            if (newTaskTitle.trim() !== ""
                && newTaskTitle !== "go to hell") {
                addItem(newTaskTitle)
                setNewTaskTitle("")
            } else {
                setError(true)
            }
        }

        return <div>
            <TextField value={newTaskTitle}
                       disabled={disabled}
                       variant={"filled"}
                       label={error ? "Title is required" : "Enter title"}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={error}
                       size="small"/>
            <IconButton onClick={addItemHandler} color={'primary'} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    }
)