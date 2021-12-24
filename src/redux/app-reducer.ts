const initialState: InitialStateType = {
    status: 'idle',
    error: 'some error !'
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

//Action Creators
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}as const )
export const setStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status}as const)

//Types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: StatusType,
    error: string | null,
}

type ActionsType =
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>