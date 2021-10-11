import {TasksStateType} from "../App";
import {RemoveTaskAC, taskReducer} from "./tasks-reducer";

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

    const action=RemoveTaskAC("2","todolistId2")
    const endState=taskReducer(startState,action)

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