import { useEffect } from 'react'

export function App () {
  useEffect(() => {
    getUserInfo('123')
      .then(result => console.log('userInfo:', result))
  }, [])
  return (
    <>
      <h1>App</h1>
    </>
  )
}

const debounceUseInfo = makeDebounce(300)
// interface do backend
async function getUserInfo (userId: string): Promise<string> {
  return debounceUseInfo(() => retornaResultadoDoBackend(userId))
}

function makeDebounce (time: number) {
  let id: ReturnType<typeof setTimeout>

  return <T, > (fn: () => Promise<T>): Promise<T> => {
    clearTimeout(id)
    return new Promise((resolve) => {
      id = setTimeout(() => {
        fn().then(resolve)
      }, time)
    })
  }
}

// função que faz o request e vc não tem acesso ao código interno dela
function retornaResultadoDoBackend (userId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`{ "id": ${userId}, "user": "Daciuk", "age": 37 }`)
    }, 2000)
  })
}
