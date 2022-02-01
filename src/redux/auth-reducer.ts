import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authApi, LoginParamsType, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: any) {
            state.isLoggedIn = action.value
        }
    }
})
export const authReducer = slice.reducer

// const setIsLoggedInAC=slice.actions.setIsLoggedInAC
export const {setIsLoggedInAC} = slice.actions


//Thunks Creators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCodes.success) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === ResultCodes.success) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}




