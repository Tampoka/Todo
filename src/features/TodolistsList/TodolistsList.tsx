import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../../redux/todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../../redux/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo = false, ...props}) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) return
        dispatch(fetchTodolistsTC())
    }, [dispatch, demo, isLoggedIn])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC({taskId, todolistId}))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC({title, todolistId}))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC({taskId, domainModel: {status}, todolistId}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC({taskId, domainModel: {title: newTitle}, todolistId}))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(newTitle, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({filter:value, todolistId})
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC({todolistId:id}))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={10} justifyContent="center">
            {
                todolists.map(tl => {
                    return <Grid item key={tl.id}>
                        <Paper elevation={12} style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                tasks={tasks[tl.id]}
                                removeTask={removeTask}
                                removeTodolist={removeTodolist}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}