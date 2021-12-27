import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '73fdf213-e363-4a31-ad92-85b5d437ac0f'
    },
})

//API
export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodo(title: string) {
        //return instance.post<CommonResponseType<{ item: TodoListType }>, AxiosResponse<CommonResponseType<{ item: TodoListType }>>, { title: string }>
        return instance.post<{ title: string }, AxiosResponse<CommonResponseType<{ item: TodoListType }>>>
        ('todo-lists', {title})
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType, AxiosResponse<CommonResponseType>, { title: string }>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<CommonResponseType<{ item: TaskType }>>>
        (`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<CommonResponseType<{ item: TaskType }>>>
        (`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}

//Auth API
export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<CommonResponseType<{ userId?: number }>>>('auth/login', data)
    },
    me() {
        return instance.get<CommonResponseType<AuthMeType>>('auth/me')
    },
    logout() {
        return instance.delete<CommonResponseType>('auth/me')
    },
}
//Types
export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type CommonResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type GetTasksResponseType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type AuthMeType = {
    id: number
    email: string
    login: string
}