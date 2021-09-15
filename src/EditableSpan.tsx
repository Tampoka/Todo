import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => setEditMode(true)

    const activateViewMode = () => setEditMode(false)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEditMode(false)
        }
    }

    const onChangeTitleHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.currentTarget.value)
    }
    return editMode
        ? <input value={title}
                 onBlur={activateViewMode}
                 onKeyPress={onKeyPressHandler}
                 onChange={onChangeTitleHandler} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}