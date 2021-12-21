import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & { filter: FilterValuesType }

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
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
export const addTodolistAC = (todolist: TodoListType) => ({
    type: 'ADD-TODOLIST',
    todolist
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

//Thunks
/*export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistApi.getTodos()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}*/

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodos()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch) => {
        todolistApi.deleteTodo(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }

export const addTodolistTC = (title: string) =>
    (dispatch: Dispatch) => {
        todolistApi.createTodo(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }

export const changeTodolistTitleTC = (title: string, todolistId:string) =>
    (dispatch: Dispatch) => {
        todolistApi.updateTodoTitle(todolistId,title)
            .then(res => {
                dispatch(changeTodolistTitleAC(title,todolistId))
            })
    }


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




