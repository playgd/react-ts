import { useReducer } from 'react'

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

type State = number

interface MainState {
  counter: State,
  movies: MoviesState,
}

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT'
}

type MainAction<C, M> = C | M

const initialState: State = 0
const initialMoviesState: MoviesState = []

function mainReducer <C = CounterAction, M = MoviesAction> (state: MainState, action: MainAction<C, M>) {
  return {
    counter: counterReducer(state.counter, action),
    movies: moviesReducer(state.movies, action),
  }
}

const mainInitialState = {
  counter: initialState,
  movies: initialMoviesState,
}

export function Redux () {
  // const [counter, dispatchCounter] = useReducer(counterReducer, initialState)
  // const [movies, dispatchMovies] = useReducer(moviesReducer, initialMoviesState)
  const [store, dispatch] = useReducer(mainReducer, mainInitialState)

  return (
    <>
      <h1 onClick={() => dispatch({ type: 'INCREMENT' })}>Redux: {store.counter}</h1>
      <ul>
        {store.movies.map(movie => (
          <li key={movie.id}>
            {movie.name}
            <button onClick={() => dispatch(remove(movie.id))}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(add('New movie' + Math.random()))}>
        +
      </button>
    </>
  )
}


function counterReducer (state: State, action: CounterAction): State {
  if (action.type === 'DECREMENT') {
    return state - 1
  }

  if (action.type === 'INCREMENT') {
    return state + 1
  }

  return state
}

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

function add (name: string): MoviesActionAdd {
  return {
    type: 'ADD',
    payload: { name },
  }
}

function remove (id: number): MoviesActionRemove {
  return {
    type: 'REMOVE',
    payload: { id },
  }
}
