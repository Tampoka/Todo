import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";

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
            <IconButton onClick={onRemoveHandler} aria-label="delete">
                <Delete/>
            </IconButton>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        </div>
    )
})

