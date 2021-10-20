import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC("new todolist")

    const endTasksState =taskReducer(startTaskState,action)
    const endTodolistsState =todolistReducer(startTodolistState,action)

    const keys=Object.keys(endTasksState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)


})