import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

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
            order: 0
        },
        {
            id: todolistId2, title: "What to buy", filter: "completed", addedDate: '',
            order: 0
        },
        {
            id: todolistId3, title: "What to watch", filter: "all", addedDate: '',
            order: 0
        }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, addTodolistAC({
        title:newTodolistTitle,
        id:v1(),
        addedDate:'',
        order:0
    }))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its title', () => {
    let newTodolistTitle = "New Todolist"

     const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle,todolistId2 ))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed"

    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter,todolistId2))

    expect(endState[0].filter).toBe("active")
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the state', () => {

    const action=setTodolistsAC(startState)
    const endState = todolistsReducer([],action)

    expect(endState.length).toBe(3)
    expect(endState.every(tl=>tl.filter==='all')).toBeTruthy()
})