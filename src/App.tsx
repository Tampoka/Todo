import React from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

function App() {
    let task1:Array<TaskPropsType>=[
        {id:1,title:"CSS",isDone:true},
        {id:2,title:"JS",isDone:true},
        // {id:3,title:"React",isDone:false},
    ]
    // let task2:Array<TaskPropsType>=[
    //     {id:1,title:"Broccoli",isDone:true},
    //     {id:2,title:"Juice",isDone:false},
    //     {id:3,title:"Bread",isDone:false},
    //     {id:4,title:"Milk",isDone:true},
    //     {id:5,title:"Mayonnaise",isDone:false}
    // ]
    // let task3:Array<TaskPropsType>=[
    //     {id:1,title:"Terminator",isDone:true},
    //     {id:2,title:"Gentlemens of fortune",isDone:false},
    //     {id:3,title:"Avatar",isDone:false},
    // ]
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={task1}/>
            {/*<Todolist title={"What to buy"} tasks={task2}/>*/}
            {/*<Todolist title={"What to watch"} tasks={task3}/>*/}
        </div>
    );
}

export default App;
