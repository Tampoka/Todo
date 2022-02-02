import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {authApi, ResultCodes} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    //true if app already/successfully iniialized (user authentication, settings etc.)
    isInitialized: false,
}
const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})
export const appReducer = slice.reducer

export const {setAppErrorAC,setAppStatusAC,setAppInitializedAC}=slice.actions

//Thunk Creators
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === ResultCodes.success) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {

            }
            dispatch(setAppInitializedAC({isInitialized: true}))
        })
}

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


