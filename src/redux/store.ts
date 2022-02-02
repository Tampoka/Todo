import {combineReducers} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger";
import { tasksReducer } from "./tasks-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

// const middlewareEnhancer = applyMiddleware(thunkMiddleware)
// const composeEnhancers = composeWithDevTools(middlewareEnhancer)
// export const store = createStore(rootReducer, composeEnhancers)

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
            .concat(logger)
})
export type AppRootStateType = ReturnType<typeof rootReducer>

// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store