import {TodolistType} from "../App";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
    let newState= state.filter(tl => tl.id !== action.id)
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

