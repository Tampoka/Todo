import {todolistApi, TodoListType} from "../api/todolist-api";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerNetworkAError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistApi.getTodos()
        // if (!res.data.error) {
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todolists: res.data}
        // } else {
        //     handleFetchServerAppError(res.data, dispatch)
        //     return rejectWithValue({})
        // }
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolists', async (param: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'loading'}))
    try {
        const res = await todolistApi.deleteTodo(param.todolistId)
        dispatch(setAppStatusAC({status: 'succeeded'}));
        dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, status: 'succeeded'}))
        return {todolistId: param.todolistId}
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (param: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistApi.createTodo(param.title)
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todolist: res.data.data.item}
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
    }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { title: string,todolistId: string}, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId:param.todolistId, status: 'loading'}))
    try {
        const res = await todolistApi.updateTodoTitle(param.todolistId, param.title)
        dispatch(setAppStatusAC({status: 'succeeded'}));
        dispatch(changeTodolistEntityStatusAC({todolistId:param.todolistId, status: 'succeeded'}))
        return {title:param.title, todolistId:param.todolistId}
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },

        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index > -1) {
                    state[index].title = action.payload.title
                }
        })
    }
})
export const todolistsReducer = slice.reducer
export const { changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions


//TYPES
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }




