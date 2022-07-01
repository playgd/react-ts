import { useEffect } from 'react'
import { getUser } from '@/api/get-users'

export function RuntimeValidations () {
  useEffect(() => {
    getUser('fdaciuk')
      .then(user => console.log('user:', user))
      .catch(error => console.log('error:', error))
  }, [])

  return (
    <h1>RuntimeValidations</h1>
  )
}
