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

// Redux
function createStore () {

}
// /Redux

function increment (): CounterAction {
  return { type: 'INCREMENT' }
}

function decrement (): CounterAction {
  return { type: 'DECREMENT' }
}

console.log('initialState:', initialState)
const newState = counterReducer(initialState, increment())
console.log('newState:', newState)
const newState2 = counterReducer(newState, increment())
console.log('newState2:', newState2)
const newState3 = counterReducer(newState2, decrement())
console.log('newState3:', newState3, newState, newState2)
