import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {taskReducer, TasksStateType} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodolistDomainType> = []

    const action = addTodolistAC({
        title: "new todolist",
        id: "todolistId1",
        addedDate: '',
        order: 0
    })

    const endTasksState = taskReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)


})