import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composeEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = createStore(rootReducer, composeEnhancers)

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store