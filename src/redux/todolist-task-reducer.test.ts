import {addTodolistTC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodolistDomainType> = []

    let payload = {todolist: {
            title: "new todolist",
            id: "todolistId1",
            addedDate: '',
            order: 0
        }
    };
    const action = addTodolistTC.fulfilled(payload,'requestId',{title:payload.todolist.title})

    const endTasksState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)


})