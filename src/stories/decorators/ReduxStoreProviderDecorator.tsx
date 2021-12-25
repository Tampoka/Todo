import {AppRootStateType} from "../../redux/store";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {taskReducer} from "../../redux/tasks-reducer";
import {todolistsReducer} from "../../redux/todolists-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import thunk from "redux-thunk";
import {appReducer} from "../../redux/app-reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer,
    app:appReducer
})

const initialGlobalState = {
    todolists: [
            {
                id:"todolistId1", title: "What to learn", filter: "all", addedDate: '',
                order: 0,entityStatus:'idle'
            },
            {
                id: "todolistId2", title: "What to buy", filter: "all", addedDate: '',
                order: 0,entityStatus:'loading'
            }
        ],
    tasks:
        {
        "todolistId1": [
            {
                id: v1(), title: "CSS", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: v1(), title: "Broccoli", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Juice", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Bread", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "Mayonnaise", status: TaskStatuses.New, description: 'new task',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            }
        ]
    },
   app:{
        status:'idle',
       error:null,
   },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType,applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
}




