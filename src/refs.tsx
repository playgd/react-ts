import { useRef, useEffect, useState } from 'react'

export function Refs () {
  const [counter, setCounter] = useState(0)
  const semRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  console.log('canvasRef:', canvasRef)

  useEffect(() => {
    handleCanvas()
  }, [])

  useEffect(() => {
    console.log('antes de mudar o semRef:', semRef.current)
    semRef.current++
    console.log('depois de mudar o semRef:', semRef.current)
  }, [counter, semRef])

  const handleCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return
    ctx.fillStyle = 'green'
    ctx.fillRect(10, 10, 150, 100)
  }

  return (
    <>
      <h1 onClick={() => setCounter(c => c + 1)}>Refs: {counter}</h1>
      <canvas ref={canvasRef} data-js='canvas' style={{ border: '1px solid #000' }} />
    </>
  )
}
