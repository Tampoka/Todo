import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskPropsType = {
    todolistId:string
    task:TaskType
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
}

export const Task = React.memo(function (props: TaskPropsType) {

    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId)

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id,
            e.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.changeTaskTitle,props.task.id, props.todolistId])


    return (
        <div key={props.task.id} className={props.task.status===TaskStatuses.Completed?"is-done":""}>
            <IconButton onClick={onRemoveHandler} aria-label="delete" color="error">
                <Delete/>
            </IconButton>
            <Checkbox checked={props.task.status===TaskStatuses.Completed}
                      onChange={onChangeStatusHandler}
            color="primary"/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        </div>
    )
})

