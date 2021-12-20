import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {taskReducer, TasksStateType} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodolistDomainType> = []

    const action = addTodolistAC("new todolist","todolistId1")

    const endTasksState =taskReducer(startTaskState,action)
    const endTodolistsState =todolistsReducer(startTodolistState,action)

    const keys=Object.keys(endTasksState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)


})