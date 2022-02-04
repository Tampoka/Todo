import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "./app-reducer";

let todolistId1: string
let todolistId2: string
let todolistId3: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()
    startState = [
        {
            id: todolistId1, title: "What to learn", filter: "active", addedDate: '',
            order: 0,entityStatus:'idle'
        },
        {
            id: todolistId2, title: "What to buy", filter: "completed", addedDate: '',
            order: 0,entityStatus:'idle'
        },
        {
            id: todolistId3, title: "What to watch", filter: "all", addedDate: '',
            order: 0,entityStatus:'idle'
        }
    ]
})

test('correct todolist should be removed', () => {
    let payload = {todolistId:todolistId1};
    const endState = todolistsReducer(startState, removeTodolistTC.fulfilled(payload,'requestId',payload))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, addTodolistAC({todolist:{
        title:newTodolistTitle,
        id:"todolistId1",
        addedDate:'',
        order:0
    }}))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its title', () => {
    let newTodolistTitle = "New Todolist"

     const endState = todolistsReducer(startState, changeTodolistTitleAC({title:newTodolistTitle, todolistId:todolistId2} ))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed"

    const endState = todolistsReducer(startState, changeTodolistFilterAC({filter:newFilter, todolistId:todolistId2}))

    expect(endState[0].filter).toBe("active")
    expect(endState[1].filter).toBe(newFilter)
})

test('correct entity status should be set', () => {
    let newStatus: RequestStatusType = "loading"

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({todolistId:todolistId2, status:newStatus}))

    expect(endState[0].entityStatus).toBe("idle")
    expect(endState[1].entityStatus).toBe(newStatus)
})

test('todolists should be added', () => {

    let payload = {todolists:startState};
    const action=fetchTodolistsTC.fulfilled(payload,'requestId')
    const endState = todolistsReducer([],action)

    expect(endState.length).toBe(3)
    expect(endState.every(tl=>tl.filter==='all')).toBeTruthy()
})