import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {authApi, LoginParamsType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: any = initialState, action: ActionsType): any => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn:action.value}
        default:
            return state
    }
}

//Action Creators
export const setIsLoggedInAC = (value:boolean) => ({
    type: 'login/SET-IS-LOGGED-IN', value
} as const)


//Thunks Creators
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                alert('Hooray')
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}

// Types
export type InitialStateType = {
    isLoggedIn: boolean
}
type ActionsType = |ReturnType<typeof setIsLoggedInAC>

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>


