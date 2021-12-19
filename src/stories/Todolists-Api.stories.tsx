
import {todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {ChangeEvent, useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolists = () => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data)
            });
    }

    return <div> {JSON.stringify(state)}
        <div>

            <Button onClick={getTodolists}
                    variant="contained">
                Get todo-lists
            </Button>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const createTodo = () => {
        todolistApi.createTodo(title)
            .then((res) => {
                setState(res.data.data)
            });
    }
    return <div> {JSON.stringify(state)}
        <div>
            <TextField type="text"
                       placeholder="task title"
                       size="small"
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
            <Button onClick={createTodo}
                    variant="contained">
                Add todo
            </Button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTodolist = () => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            });
    }
    return <div> {JSON.stringify(state)}
        <div>
            <TextField type="text"
                       placeholder="todolistId"
                       size="small"
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <Button onClick={deleteTodolist}
                    variant="contained"
                    color="error">
                Delete todo
            </Button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.updateTodoTitle("4c04532f-6f63-4661-b846-2e72fbecaf0a", "hhhhhh")
            .then((res) => {
                setState(res.data.data)
            });

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <TextField type="text"
                       placeholder="todolistId"
                       size="small"
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <Button onClick={getTasks}
                    variant="contained">
                Get tasks
            </Button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            });
    }
    return <div> {JSON.stringify(state)}
        <div>
            <TextField type="text"
                       placeholder="todolistId"
                       size="small"
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <TextField type="text"
                       placeholder="task title"
                       size="small"
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
            <Button onClick={addTask}
                    variant="contained">
                Add Task
            </Button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [model, setModel] = useState<UpdateTaskModelType>({
        title: '',
        description: 'New task',
        status: 3,
        priority: 1,
        startDate: '',
        deadline: '',
    })

    const updateModel = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setModel({...model, title: e.currentTarget.value})
    }
    const updateTask = () => {
        todolistApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            });
        console.log(model)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <TextField type="text"
                       placeholder="todolistId"
                       size="small"
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <TextField type="text"
                       placeholder="taskId"
                       size="small"
                       onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <TextField type="text"
                       placeholder="task title"
                       size="small"
                       onChange={updateModel}/>
            <Button onClick={updateTask}
                    variant="contained">
                Update Task
            </Button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            });
    }
    return <div> {JSON.stringify(state)}
        <div>
            <TextField type="text"
                       placeholder="todolistId"
                       size="small"
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <TextField type="text"
                       placeholder="taskId"
                       size="small"
                       onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <Button onClick={deleteTask}
                    variant="contained"
                    color="error">
                Delete Task
            </Button>
        </div>
    </div>
}