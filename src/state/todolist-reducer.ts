import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title:string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter:FilterValuesType
}
type ActionsType=RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistTitleActionType|ChangeTodolistFilterActionType
export const todolistReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let todolist: TodolistType = {
                id: v1(),
                filter: "all",
                title: action.title
            }
            return [...state, todolist]
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

        default:
            throw new Error("I don't understand this type")
    }
}

