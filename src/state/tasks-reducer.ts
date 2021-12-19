import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
} from "./todolist-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";

export type TasksStateType = { [key: string]: Array<TaskType> }

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newState = state[action.todolistId].filter(t => t.id !== action.id)
            debugger
            return {
                ...state,
                [action.todolistId]: newState
            }
        case 'ADD-TASK':
            let newTask = {
                id: v1(),
                title: action.title,
                // isDone: false,
                description: 'new task',
                status: TaskStatuses.New,
                priority: 0,
                startDate: '',
                deadline: 'string',
                todoListId: action.todolistId,
                order: 0,
                addedDate: ''
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map(t => t.id === action.id ? {...t, status: action.status} : t)

            state[action.todolistId] = newTasksArray
            return ({...state})
        case 'CHANGE-TASK-TITLE':
            let todolistsTasks = state[action.todolistId]
            let taskToChangeTitle = todolistsTasks.find(t => t.id === action.id)
            if (taskToChangeTitle) {
                taskToChangeTitle.title = action.title
            }
            state[action.todolistId] = [...todolistsTasks]
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

//Action Creators
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    id: taskId,
    todolistId: todolistId
} as const)
export const addTaskAC = (title: string, todolistId: string) => ({
    type: 'ADD-TASK',
    title: title,
    todolistId: todolistId
} as const)
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    id,
    status
} as const)
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    id: id,
    title: newTitle,
    todolistId: todolistId
} as const)

//Action Types
type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType


