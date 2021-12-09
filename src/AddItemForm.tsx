import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm=React.memo(function(props: addItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(error!==null){
            setError(null)
        }
        setNewTaskTitle((e.currentTarget.value))
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==null){
            setError(null)
        }
        if (e.key === "Enter") {
            if (newTaskTitle.trim() !== ""
                && newTaskTitle !== "hell") {
                props.addItem(newTaskTitle)
                setNewTaskTitle("")
            }
        }
        else {
            setError("Title is required")
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
                   size="small"
        />
        <IconButton onClick={addTask}  color={'primary'}>
            <AddBox/>
        </IconButton>
    </div>
}
)