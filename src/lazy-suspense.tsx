import { Suspense, lazy } from 'react'

const Home = lazy(() => import('./lazy/home'))
const About = lazy(() => import('./lazy/about'))
const Contact = lazy(() => import('./lazy/contact'))

export function LazySuspense () {
  return (
    <>
      <h1>Lazy suspense</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Suspense>
    </>
  )
}

type RouteProps = {
  path?: string
  element: JSX.Element
}
function Route ({ path, element }: RouteProps) {
  const page = window.location.search.split('=')[1]
  if (`/${page}` === path) {
    return element
  }
  return null
}
