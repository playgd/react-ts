import { ChangeEvent, useState } from 'react'

export function Events () {
  const [cpf, setCpf] = useState('')

  const handleChangeCpf = (e: ChangeEvent<HTMLInputElement>) => {
    setCpf(maskCpf(e.target.value))
  }

  const maskCpf = (value: string) => {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  return (
    <>
      <form>
        <label htmlFor='username'>CPF:</label>
        <input
          type='text'
          name='cpf'
          id='cpf'
          value={cpf}
          onChange={handleChangeCpf}
        />
        <button type='submit'>Enviar</button>
      </form>
    </>
  )
}
