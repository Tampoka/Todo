import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {authApi, LoginParamsType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";

const initialState: InitialStateType = {}

export const loginReducer = (state: any = initialState, action: ActionsType): any => {
    switch (action.type) {

        default:
            return state
    }
}

//Action Creators
// export const removeTaskAC = (taskId: string, todolistId: string) => ({
//     type: 'REMOVE-TASK', taskId, todolistId
// } as const)


//Thunks Creators
export const loginTC = (data:LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.login(data)
        .then(res=>{
            if(res.data.resultCode===0){
                alert('Hooray')
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((error)=>{
            handleServerNetworkAError(error,dispatch)
        })
}

// Types
export type InitialStateType={
}
type ActionsType =any

type ThunkDispatch=Dispatch<ActionsType|SetAppStatusActionType|SetAppErrorActionType>


