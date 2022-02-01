import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerNetworkAError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodoListType }>) {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
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
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodoListType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
    }
})
const todolistsReducer = slice.reducer
export const {
    removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC,
    setTodolistsAC, changeTodolistEntityStatusAC
} = slice.actions

//Thunks Creators
export const fetchTodolistsTC = () =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        todolistApi.getTodos()
            .then(res => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}));
            })
            .catch(error => {
                handleServerNetworkAError(error, dispatch)
            })
    }
export const removeTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}))
        todolistApi.deleteTodo(todolistId)
            .then(res => {
                dispatch(removeTodolistAC({todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }

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
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }




