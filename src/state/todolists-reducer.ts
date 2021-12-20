import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & { filter: FilterValuesType }

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                id: action.todolistId,
                filter: "all",
                title: action.title,
                addedDate: '',
                order: 0
            }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            let todolistToChangeTitle = state.find(tl => tl.id === action.id)
            if (todolistToChangeTitle) {
                todolistToChangeTitle.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todolistToChangeFilter = state.find(tl => tl.id === action.id)
            if (todolistToChangeFilter) {
                todolistToChangeFilter.filter = action.filter
            }
            return [...state]
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}
//Action Creators
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    id: todolistId
} as const)
export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1()
} as const)
export const changeTodolistTitleAC = (newTitle: string, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: newTitle
} as const)
export const changeTodolistFilterAC = (todolistFilter: FilterValuesType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: todolistFilter
} as const)
export const setTodolistsAC = (todolists: Array<TodoListType>): SetTodolistsActionType => ({
    type: 'SET-TODOLISTS',
    todolists
})

//Action types
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodoListType>
}
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType




