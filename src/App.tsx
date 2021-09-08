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

function App() {
    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")
    // let task2:Array<TaskPropsType>=[
    //     {id:1,title:"Broccoli",isDone:true},
    //     {id:2,title:"Juice",isDone:false},
    //     {id:3,title:"Bread",isDone:false},
    //     {id:4,title:"Milk",isDone:true},
    //     {id:5,title:"Mayonnaise",isDone:false}
    // ]
    // let task3:Array<TaskPropsType>=[
    //     {id:1,title:"Terminator",isDone:true},
    //     {id:2,title:"Gentlemen of fortune",isDone:false},
    //     {id:3,title:"Avatar",isDone:false},
    // ]

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<Todolist title={"What to buy"} tasks={task2}/>*/}
            {/*<Todolist title={"What to watch"} tasks={task3}/>*/}
        </div>
    );
}

export default App;
