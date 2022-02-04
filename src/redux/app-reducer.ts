import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkAError} from "../utils/error-utils";
import {setIsLoggedInAC} from "./auth-reducer";

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authApi.me()
        if (res.data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedInAC({value: true}))
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
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})
export const appReducer = slice.reducer

export const {setAppErrorAC, setAppStatusAC} = slice.actions

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


