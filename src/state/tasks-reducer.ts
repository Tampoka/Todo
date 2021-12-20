import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";

export type TasksStateType = { [key: string]: Array<TaskType> }

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newState = state[action.todolistId].filter(t => t.id !== action.id)
            return {
                ...state,
                [action.todolistId]: newState
            }
        case 'ADD-TASK':
            return {
                ...state,
              [action.task.todoListId]: [action.task,...state[action.task.todoListId]]
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
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            delete (state[action.id])
            return {...state}
        case 'SET-TODOLISTS':
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
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
export const addTaskAC = (task:TaskType) => ({
    type: 'ADD-TASK',
   task
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
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)

//Thunks
export const fetchTasksTC = (todolistId: string) =>
    (dispatch: Dispatch) =>
        todolistApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })

export const removeTaskTC = (taskId: string, todolistId: string) =>
    (dispatch: Dispatch) =>
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })

export const addTaskTC = (title: string, todolistId: string) =>
    (dispatch: Dispatch) =>
        todolistApi.createTask(todolistId, title)
            .then(res => {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
            })
//Action Types
type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}
