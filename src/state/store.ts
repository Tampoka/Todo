import {combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const composeEnhancers = composeWithDevTools

export const store=createStore(rootReducer,composeEnhancers())

export type AppRootStateType=ReturnType<typeof rootReducer>


// @ts-ignore
window.store=store