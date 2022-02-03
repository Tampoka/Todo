import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authApi, LoginParamsType, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
export const loginTC=createAsyncThunk('auth/login',async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authApi.login(param)
        if (res.data.resultCode === ResultCodes.success) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
            // thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleServerNetworkAError(error, thunkAPI.dispatch)
    }
})

export const _loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
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
const slice = createSlice({
    name: 'auth',
    initialState,
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





