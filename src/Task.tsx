import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./state/tasks-reducer";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";

export type TaskPropsType = {
    todolistId:string
    task:TaskType
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
}

export const Task = React.memo(function (props: TaskPropsType) {

    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId)

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.changeTaskTitle,props.task.id, props.todolistId])


    return (
        <div key={props.task.id} className={props.task.isDone?"is-done":""}>
            <IconButton onClick={onRemoveHandler} aria-label="delete" color="error">
                <Delete/>
            </IconButton>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        </div>
    )
})

