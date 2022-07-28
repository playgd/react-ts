type GetState<S> = () => S | undefined

type SetStateInputValue<S> = S
type SetStateInputFn<S> = (prevState: S | undefined) => S
type SetStateInput<S> = SetStateInputValue<S> | SetStateInputFn<S>
type SetState<S> = (newState: SetStateInput<S>) => void
type UseStateReturnType<S> = [
  GetState<S>,
  SetState<S>
]

export function useState <S> (initialState?: S): UseStateReturnType<S> {
  let state: S | undefined = initialState

  const getState: GetState<S> = () => {
    return state
  }

  const setState: SetState<S> = (newState) => {
    if (isNewStateFn(newState)) {
      state = newState(state)
      return
    }
    state = newState
  }

  return [getState, setState]
}

function isNewStateFn <S> (value: SetStateInput<S>): value is SetStateInputFn<S> {
  return typeof value === 'function'
}
