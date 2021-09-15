import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode]=useState(false)

    const activateEditMode=()=> setEditMode(true)

    const activateViewMode=()=> setEditMode(false)



    return editMode
        ?<input value={props.title}/>
    :<span onDoubleClick={activateEditMode}
        onBlur={activateViewMode}>{props.title}</span>
}