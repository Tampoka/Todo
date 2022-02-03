import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authApi, FieldErrorType, LoginParamsType, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}
export const loginTC = createAsyncThunk<{isLoggedIn:boolean},LoginParamsType,{rejectValue:{errors:Array<string>,fieldsErrors?:Array<FieldErrorType>}}>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authApi.login(param)
        if (res.data.resultCode === ResultCodes.success) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkAError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
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





