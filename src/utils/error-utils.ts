import {setAppErrorAC, setAppStatusAC} from "../redux/app-reducer";
import {CommonResponseType, GetTasksResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: CommonResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred.'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleServerNetworkAError = (error: { message:string },dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error:error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleFetchServerAppError=(data:GetTasksResponseType,dispatch: Dispatch)=>{
    if (data.error) {
        dispatch(setAppErrorAC({error:data.error}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred.'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}