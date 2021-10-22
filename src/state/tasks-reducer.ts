import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2,
    todolistId3
} from "./todolist-reducer";

const initialState:TasksStateType= {
    [todolistId1]: [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "Broccoli", isDone: true},
        {id: v1(), title: "Juice", isDone: false},
        {id: v1(), title: "Bread", isDone: false},
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Mayonnaise", isDone: false}
    ],
    [todolistId3]: [
        {id: v1(), title: "Terminator", isDone: true},
        {id: v1(), title: "Gentlemen of fortune", isDone: false},
        {id: v1(), title: "Avatar", isDone: false},
    ]
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    todolistId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    todolistId: string
    isDone: boolean
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const taskReducer = (state: TasksStateType=initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newState = state[action.todolistId].filter(t => t.id !== action.id)
            debugger
            return {
                ...state,
                [action.todolistId]: newState
            }

        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            let task = state[action.todolistId].find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}


        case 'CHANGE-TASK-TITLE':
            let taskToChangeTitle = state[action.todolistId].find(t => t.id === action.id)
            if (taskToChangeTitle) {
                taskToChangeTitle.title = action.title
            }
            return {...state}
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            delete (state[action.id])
            return {...state}

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({
    type: 'REMOVE-TASK',
    id: taskId,
    todolistId: todolistId
})
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => ({
    type: 'ADD-TASK',
    title: title,
    todolistId: todolistId
})

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId: todolistId,
    id: id,
    isDone: isDone
})

export const changeTaskTitleAC = (id: string, newTitle: string,todolistId: string ): ChangeTaskTitleActionType => ({
    type: 'CHANGE-TASK-TITLE',
    id: id,
    title: newTitle,
    todolistId: todolistId
})



