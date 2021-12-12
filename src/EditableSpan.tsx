import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEditMode(false)
            props.onChange(title)
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode
        ? <TextField value={title}
                     onBlur={activateViewMode}
                     onKeyPress={onKeyPressHandler}
                     onChange={onChangeTitleHandler}
                     autoFocus
                     size="small"
                     variant="standard"/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})