import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {status: 'idle', error: null,isInitialized: false}
})
test('correct errorMessage should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('some error'))

    expect(endState.status).toBe('idle')
    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('succeeded'))

    expect(endState.status).toBe('succeeded')
    expect(endState.error).toBe(null)
})


