import {setAppStatusAC} from "./app-reducer";
import {authApi, FieldErrorType, LoginParamsType, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}
export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authApi.login(param)
        if (res.data.resultCode === ResultCodes.success) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return;
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authApi.logout()
                if (res.data.resultCode === ResultCodes.success) {
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                    return;
                } else {
                    handleServerAppError(res.data, dispatch)
                    return rejectWithValue({})
                }
    } catch (error) {
        handleServerNetworkAError(error, dispatch)
        return rejectWithValue({})
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
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})
export const authReducer = slice.reducer

export const {setIsLoggedInAC} = slice.actions








