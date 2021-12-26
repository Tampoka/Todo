import {
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    ChangTodolistEntityStatusActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";

export type TasksStateType = { [key: string]: Array<TaskType> }
const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//Action Creators
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK', taskId, todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK', task
} as const)
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK', todolistId, id, model
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS', tasks, todolistId
} as const)

//Thunks Creators
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistApi.getTasks(todolistId)
        .then(res => {
            if(!res.data.error){
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId,'succeeded'))
            }  else {
                if (res.data.error) {
                    dispatch(setAppErrorAC(res.data.error))
                } else {
                    dispatch(setAppErrorAC('Some error occurred.'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error)=>{
            handleServerNetworkAError(error,dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistApi.deleteTask(todolistId, taskId)
        .then(res => {
            if(res.data.resultCode===0){
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(changeTodolistEntityStatusAC(todolistId,'succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((error)=>{
            handleServerNetworkAError(error,dispatch)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId,'succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((error)=>{
           handleServerNetworkAError(error,dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            // throw new Error("Task not found in the redux")
            console.warn("Task not found in the redux")
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
        todolistApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if(res.data.resultCode===0){
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                    dispatch(changeTodolistEntityStatusAC(todolistId,'succeeded'))
                } else {
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch((error)=>{
                handleServerNetworkAError(error,dispatch)
            })
    }

// Types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType|SetAppErrorActionType>

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    |ChangTodolistEntityStatusActionType
    | ReturnType<typeof setTasksAC>


