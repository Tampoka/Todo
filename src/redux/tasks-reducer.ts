import {addTodolistAC, changeTodolistEntityStatusAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {
    ResultCodes,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistApi,
    UpdateTaskModelType
} from "../api/todolist-api";
import {setAppStatusAC} from "./app-reducer";
import {handleFetchServerAppError, handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppRootStateType} from "./store";

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

export const addTaskTC = createAsyncThunk('tasks/addTasks', async (param: { title: string, todolistId: string }, {
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

export const updateTaskTC = createAsyncThunk('tasks/updateTasks', async (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }, {
    dispatch,
    rejectWithValue,getState
}) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find((t: any) => t.id === param.taskId)

    if (!task) {
        // throw new Error("Task not found in the redux")
        return rejectWithValue('Task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.domainModel
    }
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'loading'}))
    try {
        const res = await todolistApi.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === ResultCodes.success) {
            // const action = updateTaskAC({id: taskId, model: domainModel, todolistId})
            // dispatch(action)
            dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'succeeded'}))
            return param
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
    reducers: {},
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
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
        });
    }
})
export const tasksReducer = slice.reducer

// Types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}





