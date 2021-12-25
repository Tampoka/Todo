import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, SetStatusActionType} from "./app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}
//Action Creators
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    todolistId
} as const)
export const addTodolistAC = (todolist: TodoListType) => ({
    type: 'ADD-TODOLIST',
    todolist
} as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodoListType>) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const)
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    todolistId, status
} as const)

//Thunks Creators
export const fetchTodolistsTC = () =>
    (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'));
        todolistApi.getTodos()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('succeeded'));
            })
    }
export const removeTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistApi.deleteTodo(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    todolistApi.createTodo(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistApi.updateTodoTitle(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(title, todolistId))
            })
    }


//Action types
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }
type ThunkDispatch = Dispatch<ActionsType | SetStatusActionType>




