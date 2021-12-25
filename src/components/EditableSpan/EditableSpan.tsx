import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
    disabled: boolean
}

export const EditableSpan = React.memo(function ({title, onChange, disabled}: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState("")

    const activateEditMode = () => {
        if (disabled) return
        setEditMode(true)
        setNewTitle(title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChange(newTitle)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEditMode(false)
            onChange(newTitle)
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return editMode
        ? <TextField value={newTitle}
                     onBlur={activateViewMode}
                     onKeyPress={onKeyPressHandler}
                     onChange={onChangeTitleHandler}
                     autoFocus
                     size="small"
                     variant="standard"/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})