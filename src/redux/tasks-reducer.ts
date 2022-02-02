import {addTodolistAC, changeTodolistEntityStatusAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {
    ResultCodes,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistApi,
    UpdateTaskModelType
} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {handleFetchServerAppError, handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TasksStateType = { [key: string]: Array<TaskType> }
const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', (todolistId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    thunkApi.dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
    todolistApi.getTasks(todolistId)
        .then(res => {
            if (!res.data.error) {
                thunkApi.dispatch(setTasksAC({tasks: res.data.items, todolistId}))
                thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
                thunkApi.dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'succeeded'}))
            } else {
                handleFetchServerAppError(res.data, thunkApi.dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, thunkApi.dispatch)
        })
})

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            });
        })
    }
})
export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions
//
//Thunks Creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
    todolistApi.getTasks(todolistId)
        .then(res => {
            if (!res.data.error) {
                dispatch(setTasksAC({tasks: res.data.items, todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'succeeded'}))
            } else {
                handleFetchServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
    todolistApi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCodes.success) {
                dispatch(removeTaskAC({taskId, todolistId}))
                dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
    todolistApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCodes.success) {
                const action = addTaskAC({task: res.data.data.item})
                dispatch(action)
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => any) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t: any) => t.id === taskId)

        if (!task) {
            // throw new Error("Task not found in the redux")
            console.warn("Task not found in the redux")
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
        todolistApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === ResultCodes.success) {
                    const action = updateTaskAC({id: taskId, model: domainModel, todolistId})
                    dispatch(action)
                    dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkAError(error, dispatch)
            })
    }

// Types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}





