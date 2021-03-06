import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

export type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    disabled: boolean
}

export const Task = React.memo(function ({
                                             todolistId,
                                             task,
                                             removeTask,
                                             changeTaskStatus,
                                             changeTaskTitle,
                                             disabled,
                                             ...restProps
                                         }: TaskPropsType) {

    const onRemoveHandler = () => removeTask(task.id, todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id,
            e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [changeTaskTitle, task.id, todolistId])

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <IconButton onClick={onRemoveHandler} aria-label="delete" color="error" disabled={disabled}>
                <Delete/>
            </IconButton>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      onChange={onChangeStatusHandler}
                      color="primary" disabled={disabled}/>
            <EditableSpan title={task.title} onChange={onChangeTitleHandler} disabled={disabled}/>
        </div>
    )
})

