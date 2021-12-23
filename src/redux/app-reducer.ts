
const initialState:InitialStateType={
    status:'idle',
    error:'some error !'
}

export const appReducer=(state:InitialStateType=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        // case 'APP/SET-STATUS':
        //     return {...state,status:action.status}
        case 'APP/SET-ERROR':
            return {...state,error:action.error}
        default:
            return {...state}
    }
}

//Action Creators
export const setErrorAC=(error:string|null)=>({
    type:'APP/SET-ERROR',
    error
})

//Types
export type InitialStateType={
    status:'idle'|'loading'|'succeeded'|'failed',
    error:string|null,
}

type ActionsType=
    |ReturnType<typeof setErrorAC>