import {combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

const composeEnhancers = composeWithDevTools

export const store=createStore(rootReducer,composeEnhancers())

export type AppRootStateType=ReturnType<typeof rootReducer>


// @ts-ignore
window.store=store