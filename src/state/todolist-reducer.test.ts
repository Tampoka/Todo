import {v1} from "uuid";
import {TodolistType} from "../App";
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