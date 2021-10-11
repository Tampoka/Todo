import {FilterValuesType, TasksStateType} from "../App";

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
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    filter: FilterValuesType
}
type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const taskReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newState = state[action.todolistId].filter(t => t.id !== action.id)
            return {...state,
                [action.todolistId]:newState}

        // case 'ADD-TASK':
        //     let task: TaskPropsType = {
        //         id: ,
        //         title: action.title
        //         isDone:false
        //     }
        //
        //
        //
        //     return [...state, todolist]
        // case 'CHANGE-TASK-STATUS':
        //     let todolistToChangeTitle = state.find(tl => tl.id === action.id)
        //     if (todolistToChangeTitle) {
        //         todolistToChangeTitle.title = action.title
        //     }
        //     return [...state]
        // case 'CHANGE-TASK-TITLE':
        //     let todolistToChangeFilter = state.find(tl => tl.id === action.id)
        //     if (todolistToChangeFilter) {
        //         todolistToChangeFilter.filter = action.filter
        //     }
        //     return [...state]

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({
    type: 'REMOVE-TASK',
    id: taskId,
    todolistId: todolistId
})
// export const AddTodolistAC = (title:string): AddTodolistActionType => ({
//     type: 'ADD-TODOLIST',
//     title: title
// })
//
// export const ChangeTodolistTitleAC = (todolistId: string,newTitle:string): ChangeTodolistTitleActionType => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: todolistId,
//     title: newTitle
// })
//
// export const ChangeTodolisFiltertAC = (todolistId: string,todolistFilter:FilterValuesType): ChangeTodolistFilterActionType => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id: todolistId,
//     filter: todolistFilter
// })
//
//
//
