import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const todolistId1 = v1()
export const todolistId2 = v1()
export const todolistId3 = v1()

const initialState:Array<TodolistType>=[
    {id: todolistId1, title: "What to learn", filter: "active"},
    {id: todolistId2, title: "What to buy", filter: "completed"},
    {id: todolistId3, title: "What to watch", filter: "all"}
]

export type RemoveTodolistActionType = {
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistReducer = (state: Array<TodolistType>=initialState, action: ActionsType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = {
                id: action.todolistId,
                filter: "all",
                title: action.title
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


        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }as const)
export const addTodolistAC = (title:string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    title: title,
    todolistId:v1()
})

export const changeTodolistTitleAC = (newTitle:string,todolistId: string ): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: newTitle
})

export const changeTodolistFilterAC = (todolistFilter:FilterValuesType,todolistId: string ): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: todolistFilter
})



