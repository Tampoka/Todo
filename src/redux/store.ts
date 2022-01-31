import {applyMiddleware, combineReducers} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer,
    app:appReducer,
    auth:authReducer
})

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composeEnhancers = composeWithDevTools(middlewareEnhancer)

// export const store = createStore(rootReducer, composeEnhancers)
export const store=configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(
                thunkMiddleware)
            // prepend and concat calls can be chained
            .concat(logger)
})
export type AppRootStateType = ReturnType<typeof rootReducer>

//export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store