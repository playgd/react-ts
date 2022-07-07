import { useEffect } from 'react'
import { getUser, ValidationError } from './api/get-users'

export function CustomErrors () {
  useEffect(() => {
    getUser('fdaciuk')
      .then(function promiseThen (result) {
        console.log(result)
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          console.log('error:', error)
        }
      })
  }, [])
  return (
    <h1>Custom Errors</h1>
  )
}
