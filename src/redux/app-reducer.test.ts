import {appReducer,setAppErrorAC, setAppStatusAC,initialState} from "./app-reducer";

let startState: typeof initialState

beforeEach(() => {
    startState = {status: 'idle', error: null,isInitialized: false}
})
test('correct errorMessage should be set', () => {
    const endState = appReducer(startState, setAppErrorAC({error:'some error'}))

    expect(endState.status).toBe('idle')
    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({status:'succeeded'}))

    expect(endState.status).toBe('succeeded')
    expect(endState.error).toBe(null)
})


