import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {status: 'idle', error: null}
})
    test('correct errorMessage should be set', () => {
        const endState = appReducer(startState, setErrorAC('some error'))

        expect(endState.status).toBe('idle')
        expect(endState.error).toBe('some error')
    })

test('correct status should be set', () => {
    const endState = appReducer(startState, setStatusAC('succeeded'))

    expect(endState.status).toBe('succeeded')
    expect(endState.error).toBe(null)
})


