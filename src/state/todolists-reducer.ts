import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=>tl.id===action.todolistId?{...tl,title:action.title}:tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=>tl.id===action.todolistId?{...tl,filter:action.filter}:tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
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

//Thunks Creators
/*export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistApi.getTodos()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}*/

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistApi.getTodos()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistApi.deleteTodo(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }

export const addTodolistTC = (title: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistApi.createTodo(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
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

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & { filter: FilterValuesType }




