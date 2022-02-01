import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authApi, LoginParamsType, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer

// const setIsLoggedInAC=slice.actions.setIsLoggedInAC
export const {setIsLoggedInAC} = slice.actions


//Thunks Creators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCodes.success) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === ResultCodes.success) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkAError(error, dispatch)
        })
}




