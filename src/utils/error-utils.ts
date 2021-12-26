import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../redux/app-reducer";
import {CommonResponseType, GetTasksResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: CommonResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred.'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkAError = (error: { message:string },dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message?error.message:'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

export const handleFetchServerAppError=(data:GetTasksResponseType,dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>)=>{
    if (data.error) {
        dispatch(setAppErrorAC(data.error))
    } else {
        dispatch(setAppErrorAC('Some error occurred.'))
    }
    dispatch(setAppStatusAC('failed'))
}