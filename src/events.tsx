import { FormEvent } from 'react'

type MyFormEvent = FormEvent<HTMLFormElement> & {
  currentTarget: {
    username?: HTMLInputElement
    elements: {
      username?: HTMLInputElement
    }
  }
}

export function Events () {
  const handleSubmit = (e: MyFormEvent) => {
    e.preventDefault()
    const u = 'username'
    console.log(e.currentTarget.elements[u]?.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' />
        <button type='submit'>Enviar</button>
      </form>
    </>
  )
}
