import { useEffect } from 'react'
import { z } from 'zod'

const userSchema = z.object({
  userName: z.string(),
  age: z.number(),
  street: z.string(),
})

// type User = z.infer<typeof userSchema>

export function RuntimeValidations () {
  useEffect(() => {
    getUser().then(result => {
      console.log('retorno da api:', result)
      const data = userSchema.safeParse(JSON.parse(result))
      if (data.success === false) {
        console.log('deu erro:', data.error)
        return
      }

      console.log(data.data.userName, data.data.age, data.data.street)
    })
  }, [])

  return (
    <h1>RuntimeValidations</h1>
  )
}

async function getUser () {
  // código do backend
  return JSON.stringify({
    userName: 'Daciuk',
    age: 37,
    street: 'Rua dos bobos',
  })
}
