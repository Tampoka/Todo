import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {todolistReducer} from "./todolist-reducer";

test('correct todolist should be removed',()=>{
    let todolistId1=v1()
    let todolistId2=v1()
    let todolistId3=v1()

    const startState:Array<TodolistType>=[
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
        {id: todolistId3, title: "What to watch", filter: "all"}
    ]

    const endState=todolistReducer(startState,{type:'REMOVE-TODOLIST', id:todolistId1})

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be added',()=>{
    let todolistId1=v1()
    let todolistId2=v1()
    let todolistId3=v1()

    let newTodolistTitle="New Todolist"

    const startState:Array<TodolistType>=[
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
        {id: todolistId3, title: "What to watch", filter: "all"}
    ]

    const endState=todolistReducer(startState,{type:'ADD-TODOLIST', title:newTodolistTitle})

    expect(endState.length).toBe(4)
    expect(endState[3].title).toBe(newTodolistTitle)

})

test('correct todolist should change its title',()=>{
    let todolistId1=v1()
    let todolistId2=v1()
    let todolistId3=v1()

    let newTodolistTitle="New Todolist"

    const startState:Array<TodolistType>=[
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
        {id: todolistId3, title: "What to watch", filter: "all"}
    ]

    const action={
        type:'CHANGE-TODOLIST-TITLE' as const,
        id:todolistId2,
        title:newTodolistTitle
    }
    const endState=todolistReducer(startState,action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should be changed',()=>{
    let todolistId1=v1()
    let todolistId2=v1()
    let todolistId3=v1()

    let newFilter:FilterValuesType="completed"

    const startState:Array<TodolistType>=[
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
        {id: todolistId3, title: "What to watch", filter: "all"}
    ]

    const action={
        type:'CHANGE-TODOLIST-FILTER' as const,
        id:todolistId2,
        filter:newFilter
    }
    const endState=todolistReducer(startState,action)

    expect(endState[0].filter).toBe("active")
    expect(endState[1].filter).toBe(newFilter)

})