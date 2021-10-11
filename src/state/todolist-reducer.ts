import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let todolist: TodolistType = {
                id: v1(),
                filter: "all",
                title: action.title
            }
            return [ ...state, todolist]

        default:
            throw new Error("I don't understand this type")
    }
}

