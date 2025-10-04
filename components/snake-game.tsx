"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type Point = { x: number; y: number }
const CELL = 16
const COLS = 24
const ROWS = 24
const SPEED_MS = 90
const WIN_SECONDS = 10

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 })
  const [snake, setSnake] = useState<Point[]>([{ x: 4, y: 12 }])
  const [food, setFood] = useState<Point>({ x: 12, y: 12 })
  const [running, setRunning] = useState(true)
  const [won, setWon] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!running) return
      if (["ArrowUp", "KeyW"].includes(e.code) && dir.y !== 1) setDir({ x: 0, y: -1 })
      else if (["ArrowDown", "KeyS"].includes(e.code) && dir.y !== -1) setDir({ x: 0, y: 1 })
      else if (["ArrowLeft", "KeyA"].includes(e.code) && dir.x !== 1) setDir({ x: -1, y: 0 })
      else if (["ArrowRight", "KeyD"].includes(e.code) && dir.x !== -1) setDir({ x: 1, y: 0 })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [dir, running])

  useEffect(() => {
    if (!running || won) return
    const id = setInterval(() => setElapsed((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [running, won])

  useEffect(() => {
    if (elapsed >= WIN_SECONDS && running) {
      setWon(true)
      setRunning(false)
    }
  }, [elapsed, running])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    // initial draw so canvas isn't blank before first tick
    ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL)
    ctx.fillStyle = "hsla(var(--muted), 0.15)"
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)
    ctx.fillStyle = "hsl(var(--primary))"
    ctx.fillRect(food.x * CELL, food.y * CELL, CELL, CELL)
    ctx.fillStyle = "hsl(var(--foreground))"
    snake.forEach((p) => ctx.fillRect(p.x * CELL, p.y * CELL, CELL, CELL))
  }, []) // initial paint

  useEffect(() => {
    if (!running || won) return
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    const id = setInterval(() => {
      // compute next state locally to draw the same frame we set
      let nextFood = food
      let body: Point[] = []
      setSnake((prev) => {
        const head = prev[0]
        const next = { x: (head.x + dir.x + COLS) % COLS, y: (head.y + dir.y + ROWS) % ROWS }
        const ate = next.x === food.x && next.y === food.y
        body = [next, ...prev.slice(0, ate ? prev.length : prev.length - 1)]
        if (ate) {
          let nf: Point
          do {
            nf = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
          } while (body.some((p) => p.x === nf.x && p.y === nf.y))
          nextFood = nf
        }
        return body
      })
      if (nextFood !== food) setFood(nextFood)

      ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL)
      ctx.fillStyle = "hsla(var(--muted), 0.15)"
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)

      // food
      ctx.fillStyle = "hsl(var(--primary))"
      ctx.fillRect(nextFood.x * CELL, nextFood.y * CELL, CELL, CELL)

      // snake body just computed
      ctx.fillStyle = "hsl(var(--foreground))"
      body.forEach((p) => ctx.fillRect(p.x * CELL, p.y * CELL, CELL, CELL))
    }, SPEED_MS)

    return () => clearInterval(id)
  }, [dir, food, running, won]) // removed snake from deps; we draw with local 'body'

  const width = COLS * CELL
  const height = ROWS * CELL

  return (
    <div className="relative w-full">
      <div className="rounded-xl border border-border overflow-hidden bg-background">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full h-auto block"
          style={{ imageRendering: "pixelated" }}
          aria-label="Snake game canvas"
        />
      </div>

      {!won && (
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Time: {elapsed}s / {WIN_SECONDS}s
          </span>
          <span>Use arrow keys or WASD</span>
        </div>
      )}

      {won && (
        <div className="mt-4 rounded-xl border border-border bg-background/70 backdrop-blur p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold">You won! Now you have to hire me.</h2>
          <p className="text-muted-foreground mt-1">Let’s build something great together.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <a href="mailto:gauravchhetri6363@gmail.com">Contact me</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/resume" aria-label="View resume">
                View Resume
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="https://www.linkedin.com/in/gaurav-chhetri-a9a254250/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
