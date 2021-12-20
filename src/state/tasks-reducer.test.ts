import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''},
            {id: "2", title: "JS", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''},
            {id: "3", title: "React", status: TaskStatuses.New,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate:''}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''},
            {id: "2", title: "Juice", status: TaskStatuses.New,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''},
            {id: "3", title: "Bread", status: TaskStatuses.New,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''},
            {id: "4", title: "Milk", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''},
            {id: "5", title: "Mayonnaise", status: TaskStatuses.New,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''}
        ]
    }
})
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2")
    const endState = taskReducer(startState, action)

    expect(endState).toEqual({

        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''},
            {id: "2", title: "JS", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''},
            {id: "3", title: "React", status: TaskStatuses.New,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate:''}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''},
            {id: "3", title: "Bread", status: TaskStatuses.New,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''},
            {id: "4", title: "Milk", status: TaskStatuses.Completed,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''},
            {id: "5", title: "Mayonnaise", status: TaskStatuses.New,description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate:''}
        ]
    })
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC("Eggs", "todolistId2")
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(6)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("Eggs")
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.Completed, "todolistId2")
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId2"].length).toBe(5)
    expect(endState["todolistId2"][1].title).toBe("Juice")
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("1", "TypeScript", "todolistId1")
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][0].title).toBe("TypeScript")
    expect(endState["todolistId1"][0].status).toBe(TaskStatuses.Completed)
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist")
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolist should be deleted', () => {
    const action = removeTodolistAC("todolistId2")
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
})

test('empty arrays should be added when set todolists', () => {
    const action = setTodolistsAC([
        {id:'1',title:'title1',order:0,addedDate:''},
        {id:'2',title:'title2',order:0,addedDate:''},
    ])
    const endState = taskReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toBeDefined()
    expect(endState["2"]).toBeDefined()
})