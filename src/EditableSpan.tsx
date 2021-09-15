import React, {KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode]=useState(false)

    const activateEditMode=()=> setEditMode(true)

    const activateViewMode=()=> setEditMode(false)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key==="Enter"){
            setEditMode(false)
        }
    }
    return editMode
        ?<input value={props.title}  onBlur={activateViewMode}
        onKeyPress={onKeyPressHandler} autoFocus/>
    :<span onDoubleClick={activateEditMode}>{props.title}</span>
}