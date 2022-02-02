import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodolistDomainType> = []

    const action = addTodolistAC({todolist: {
            title: "new todolist",
            id: "todolistId1",
            addedDate: '',
            order: 0
        }
    })

    const endTasksState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)


})