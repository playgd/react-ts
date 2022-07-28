import { useEffect } from 'react'
import { useState } from './use-state-hook'

export function UseStateExample () {
  const [getStateString, setStateString] = useState('string')
  const [getStateNumber, setStateNumber] = useState(0)
  console.log('state:', getStateString(), getStateNumber())

  useEffect(() => {
    setStateString('nova string')
    setStateString(() => 'outra nova string')
    setStateNumber(1)

    console.log('novo state:', getStateString(), getStateNumber())
  }, [])

  return (
    <h1>useState example</h1>
  )
}
