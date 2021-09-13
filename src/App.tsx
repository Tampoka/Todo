import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";


export function Counter() {
    let arr = useState(5)
    let data = arr[0]
    let setData = arr[1]
    return <div>
        <button onClick={() => {
            setData(data + 1)
        }}>+
        </button>
        {data}
        <button onClick={() => {
            setData(data - 1)
        }}>-
        </button>
    </div>
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const todolistId3 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
        {id: todolistId3, title: "What to watch", filter: "all"}
    ])
    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: 1, title: "Broccoli", isDone: true},
            {id: 2, title: "Juice", isDone: false},
            {id: 3, title: "Bread", isDone: false},
            {id: 4, title: "Milk", isDone: true},
            {id: 5, title: "Mayonnaise", isDone: false}
        ],
        [todolistId3]: [
            {id: 1, title: "Terminator", isDone: true},
            {id: 2, title: "Gentlemen of fortune", isDone: false},
            {id: 3, title: "Avatar", isDone: false},
        ]
    })

    function removeTask(id: string) {
        let filteredTasks = tasksObj.filter(t => t.id !== id)
        setTasksObj(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasksObj]
        setTasksObj(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasksObj.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasksObj([...tasksObj])
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
