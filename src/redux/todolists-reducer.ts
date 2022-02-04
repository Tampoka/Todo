import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
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

const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        // removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
        //     const index = state.findIndex(tl => tl.id === action.payload.todolistId)
        //     if (index > -1) {
        //         state.splice(index, 1)
        //     }
        // },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodoListType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
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
    }
})
export const todolistsReducer = slice.reducer
export const {
    addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC,
    changeTodolistEntityStatusAC
} = slice.actions

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistApi.createTodo(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}))
        todolistApi.updateTodoTitle(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC({title, todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTodolistEntityStatusAC({todolistId, status: 'succeeded'}))
            })
    }


//TYPES
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }




