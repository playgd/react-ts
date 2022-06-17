import { useState, useCallback } from 'react'

type CounterAction = (n?: number) => void

export function SetStateAbstraction () {
  const [counter, setCounter] = useState(0)

  const increment: CounterAction = useCallback((inc = 1) => {
    setCounter(c => c + inc)
  }, [])

  const decrement: CounterAction = useCallback((dec = 1) => {
    setCounter(c => c - dec)
  }, [])

  return (
    <>
      <ShowCounter counter={counter} />
      <CounterActions increment={increment} decrement={decrement} />
    </>
  )
}

type ShowCounterProps = {
  counter: number
}

function ShowCounter ({ counter }: ShowCounterProps) {
  return <h1>Counter: {counter}</h1>
}

type CounterActionsProps = {
  increment: CounterAction
  decrement: CounterAction
}

function CounterActions ({ increment, decrement }: CounterActionsProps) {
  return (
    <>
      <button onClick={() => decrement(3)}>-</button>
      <button onClick={() => increment(3)}>+</button>
    </>
  )
}
