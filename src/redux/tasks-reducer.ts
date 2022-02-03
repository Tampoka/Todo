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

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
    try {
        const res = await todolistApi.getTasks(todolistId)
        if (!res.data.error) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'succeeded'}))
            return {tasks: res.data.items, todolistId}
        } else {
            handleFetchServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
    }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTasks', async (param: { taskId: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'loading'}))
    try {
        const res = await todolistApi.deleteTask(param.todolistId, param.taskId)
        if (res.data.resultCode === ResultCodes.success) {
            dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'succeeded'}))
            return {taskId: param.taskId, todolistId: param.todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
    }
})

export const addTaskTC = createAsyncThunk('tasks/removeTasks', async (param: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'loading'}))
    try {
        const res = await todolistApi.createTask(param.todolistId, param.title)
        if (res.data.resultCode === ResultCodes.success) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'succeeded'}))
            return task
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },

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
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
    }
})
export const tasksReducer = slice.reducer
export const {updateTaskAC} = slice.actions;


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





