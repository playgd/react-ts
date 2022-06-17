import { useRef, FormEvent } from 'react'

export function Refs () {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    console.log('e.currentTarget.value', e.currentTarget.value)
    if (!inputRef.current) return
    inputRef.current.value = inputRef.current?.value.replace(/\D+/g, '')
    // e.currentTarget.value = e.currentTarget.value.replace(/\D+/g, '')
  }

  return (
    <>
      <input ref={inputRef} onInput={handleInput} />
    </>
  )
}
