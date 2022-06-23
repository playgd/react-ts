import { useState, useLayoutEffect } from 'react'

export function HookLayoutEffect () {
  const [counter, setCounter] = useState(0)

  useLayoutEffect(() => {
    if (counter === 0) {
      setCounter(10 + Math.random() * 10000000000000)
    }
  }, [counter])

  return (
    <>
      <h1>Counter {counter}</h1>
      <button onClick={() => setCounter(0)}>Clique!</button>
    </>
  )
}
