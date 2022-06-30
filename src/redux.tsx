import { useReducer } from 'react'

type UserData = { id: number, name: string }
type UserError = string

type UserStateIdle = {
  status: 'IDLE'
  data: null
  error: null
}

type UserStateProcessing = {
  status: 'PROCESSING'
}

type UserStateSuccess = {
  status: 'SUCCESS'
  data: UserData
}

type UserStateError = {
  status: 'ERROR'
  error: UserError
}

type UserState =
  | UserStateIdle
  | UserStateProcessing
  | UserStateSuccess
  | UserStateError

const initialState: UserState = {
  status: 'IDLE',
  data: null,
  error: null,
}

type UserActionsIdle = {
  type: 'IDLE'
}

type UserActionsProcessing = {
  type: 'PROCESSING'
}

type UserActionsSuccess = {
  type: 'SUCCESS'
  data: UserData
}

type UserActionsError = {
  type: 'ERROR'
  error: UserError
}

type UserActions =
  | UserActionsIdle
  | UserActionsProcessing
  | UserActionsSuccess
  | UserActionsError

export function Redux () {
  const [user, dispatch] = useReducer(userReducer, initialState)
  console.log('user:', user)

  const handleClick = async () => {
    dispatch({ type: 'PROCESSING' })
    try {
      const userData = await getUser(123)
      console.log('userData (retorno da API):', userData)
      if ('id' in userData) {
        dispatch({ type: 'SUCCESS', data: userData })
        return
      }

      dispatch({ type: 'IDLE' })
    } catch (e) {
      if (e instanceof Error) {
        dispatch({ type: 'ERROR', error: e.message })
      }
    }
  }

  return (
    <>
      <h1>Redux</h1>
      <button onClick={handleClick}>Buscar dados do usuário</button>
      {user.status === 'PROCESSING' && <h3>Carregando dados do usuário...</h3>}
      {user.status === 'SUCCESS' && <UserDetails user={user.data} />}
      {user.status === 'ERROR' && <h3>Deu erro! {user.error}</h3>}
    </>
  )
}

type UserDetailsProps = {
  user: UserData
}
function UserDetails ({ user }: UserDetailsProps) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>UserID: {user.id}</p>
    </div>
  )
}

function userReducer (state: UserState, action: UserActions) {
  if (action.type === 'PROCESSING') {
    return {
      ...state, // retorno tudo ou zero os valores?
      status: action.type,
    }
  }

  if (action.type === 'SUCCESS') {
    return {
      status: action.type,
      data: action.data,
      error: null,
    }
  }

  if (action.type === 'IDLE') {
    return {
      status: action.type,
      data: null,
      error: null,
    }
  }

  if (action.type === 'ERROR') {
    return {
      status: action.type,
      data: null,
      error: action.error,
    }
  }

  return state
}

// API que conversa com backend
interface ApiResponseSuccess {
  success: true
  id: number
  name: string
}

type ApiResponseError = Error
type ApiResponse = ApiResponseSuccess | ApiResponseError

function getUser (id: number): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.ceil(Math.random() * 2) === 1) {
        return reject(new Error('Não foi possível encontrar dados do usuário'))
      }

      resolve({
        success: true,
        id,
        name: 'John Doe ' + Math.random() * id,
      })
    }, 2000)
  })
}
