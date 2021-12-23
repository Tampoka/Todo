import {appReducer, InitialStateType, setErrorAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {status: 'idle', error: null}
})
    test('correct errorMessage should be set', () => {
        const endState = appReducer(startState, setErrorAC('some error'))

        expect(endState.status).toBe('idle')
        expect(endState.error).toBe('some error')
    })

