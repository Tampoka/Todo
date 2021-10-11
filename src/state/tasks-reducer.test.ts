import {TasksStateType} from "../App";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, taskReducer} from "./tasks-reducer";
import {AddTodolistAC} from "./todolist-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", isDone: true},
            {id: "2", title: "Juice", isDone: false},
            {id: "3", title: "Bread", isDone: false},
            {id: "4", title: "Milk", isDone: true},
            {id: "5", title: "Mayonnaise", isDone: false}
        ]
    }

    const action = RemoveTaskAC("2", "todolistId2")
    const endState = taskReducer(startState, action)

    expect(endState).toEqual({

        "todolistId1": [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", isDone: true},
            {id: "3", title: "Bread", isDone: false},
            {id: "4", title: "Milk", isDone: true},
            {id: "5", title: "Mayonnaise", isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", isDone: true},
            {id: "2", title: "Juice", isDone: false},
            {id: "3", title: "Bread", isDone: false},
            {id: "4", title: "Milk", isDone: true},
            {id: "5", title: "Mayonnaise", isDone: false}
        ]
    }

    const action = AddTaskAC("Eggs", "todolistId2")
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(6)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("Eggs")
    expect(endState["todolistId2"][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", isDone: true},
            {id: "2", title: "Juice", isDone: false},
            {id: "3", title: "Bread", isDone: false},
            {id: "4", title: "Milk", isDone: true},
            {id: "5", title: "Mayonnaise", isDone: false}
        ]
    }

    const action = ChangeTaskStatusAC("2", "todolistId2", true)
    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"].length).toBe(5)
    expect(endState["todolistId2"][1].title).toBe("Juice")
    expect(endState["todolistId2"][1].isDone).toBe(true)

})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", isDone: true},
            {id: "2", title: "Juice", isDone: false},
            {id: "3", title: "Bread", isDone: false},
            {id: "4", title: "Milk", isDone: true},
            {id: "5", title: "Mayonnaise", isDone: false}
        ]
    }

    const action = ChangeTaskTitleAC("1", "todolistId1", "TypeScript")
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][0].title).toBe("TypeScript")
    expect(endState["todolistId1"][0].isDone).toBe(true)

})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Broccoli", isDone: true},
            {id: "2", title: "Juice", isDone: false},
            {id: "3", title: "Bread", isDone: false},
            {id: "4", title: "Milk", isDone: true},
            {id: "5", title: "Mayonnaise", isDone: false}
        ]
    }

    const action = AddTodolistAC("new todolist")
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})