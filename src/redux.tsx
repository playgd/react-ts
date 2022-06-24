import { useReducer } from 'react'

type State = number

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT'
  payload: {
    value: number
  }
}

export function Redux () {
  // const [counter, dispatch] = useReducer(counterReducer, initialState)
  const [movies, dispatchMovies] = useReducer(moviesReducer, initialMoviesState)

  return (
    <>
      <h1>Redux</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.name}
            <button onClick={() => {
              dispatchMovies({
                type: 'REMOVE',
                payload: { id: movie.id },
              })
            }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        dispatchMovies({
          type: 'ADD',
          payload: { name: 'New movie' + Math.random() },
        })
      }}
      >
        +
      </button>
    </>
  )
}

// reducer
const initialState: State = 0

function counterReducer (state: State, action: CounterAction): State {
  if (action.type === 'DECREMENT') {
    return action.payload.value
  }

  if (action.type === 'INCREMENT') {
    return action.payload.value
  }

  return state
}

interface MovieState {
  id: number
  name: string
}

type MoviesState = MovieState[]

interface MoviesActionAdd {
  type: 'ADD'
  payload: {
    name: string
  }
}

interface MoviesActionRemove {
  type: 'REMOVE'
  payload: {
    id: number
  }
}

type MoviesAction = MoviesActionAdd | MoviesActionRemove

const initialMoviesState: MoviesState = []

function moviesReducer (
  state: MoviesState = initialMoviesState,
  action: MoviesAction,
): MoviesState {
  if (action.type === 'ADD') {
    return state.concat({
      id: state.length,
      name: action.payload.name,
    })
  }

  if (action.type === 'REMOVE') {
    return state.filter(movie => movie.id !== action.payload.id)
  }
  return state
}
