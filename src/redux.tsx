import { useReducer } from 'react'

export function Redux () {
  return (
    <>
      <h1>Redux</h1>
    </>
  )
}

interface State {
  value: number
}

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT'
}

// reducer
const initialState: State = {
  value: 0,
}

function counterReducer (state: State = initialState, action: CounterAction): State {
  if (action.type === 'DECREMENT') {
    return { value: state.value - 1 }
  }

  if (action.type === 'INCREMENT') {
    return { value: state.value + 1 }
  }

  return state
}

// actions
function increment (): CounterAction {
  return { type: 'INCREMENT' }
}

function decrement (): CounterAction {
  return { type: 'DECREMENT' }
}

// Redux
interface DefaultAction<A> {
  type: A
}

type SubscribeFn = () => void
type ReducerFn <T, A> = (state: T | undefined, action: DefaultAction<A>) => T

function createStore <T, A> (reducer: ReducerFn<T, A>) {
  const listeners: SubscribeFn[] = []
  let state: T = reducer(undefined, { type: '@INITIAL' })

  const dispatch = (action: DefaultAction<A>) => {
    state = reducer(state, action)
    listeners.forEach(f => f())
  }

  const subscribe = (fn: SubscribeFn) => {
    listeners.push(fn)
  }

  const getState = () => state

  return {
    dispatch,
    subscribe,
    getState,
  }
}
// /Redux

const store = createStore(counterReducer)
console.log('store:', store)

store.subscribe(() => {
  console.log('quando o evento disparar, vc verá esse console.log', store.getState())
})

store.subscribe(() => {
  console.log('esse é um outro evento', store.getState())
})

console.log('estado inicial da store:', store.getState())
store.dispatch(increment())
store.dispatch(decrement())
