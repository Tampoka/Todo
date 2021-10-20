import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let todolistId3: string
let startState: Array<TodolistType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()
    startState = [
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
        {id: todolistId3, title: "What to watch", filter: "all"}
    ]
})
test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist"
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(4)
    expect(endState[3].title).toBe(newTodolistTitle)
})

test('correct todolist should change its title', () => {
    let newTodolistTitle = "New Todolist"

     const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed"

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe("active")
    expect(endState[1].filter).toBe(newFilter)
})