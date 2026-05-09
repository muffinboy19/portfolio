"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type Pipe = { x: number; y: number; width: number; height: number }

const COLS = 24
const CELL = 16
const WIDTH = COLS * CELL
const HEIGHT = COLS * CELL
const WIN_SECONDS = 12

const GRAVITY = 0.42
const JUMP_STRENGTH = -6.8
const PIPE_WIDTH = 34
const PIPE_GAP = 118
const PIPE_SPEED = 2.35
const BIRD_SIZE = CELL
const BIRD_X = WIDTH * 0.22
const PIPE_SPAWN_MARGIN = 200

function readThemeColors() {
  if (typeof window === "undefined") {
    return {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      brand1: "oklch(0.62 0.25 303.9)",
      brand2: "oklch(0.67 0.23 320)",
      primary: "oklch(0.985 0 0)",
      muted: "oklch(0.708 0 0)",
    }
  }
  const root = getComputedStyle(document.documentElement)
  const g = (name: string) => root.getPropertyValue(name).trim() || "#888"
  return {
    background: g("--background"),
    foreground: g("--foreground"),
    brand1: g("--brand-1"),
    brand2: g("--brand-2"),
    primary: g("--primary"),
    muted: g("--muted-foreground"),
  }
}

/** Canvas-safe alpha for oklch() or other CSS colors from the theme. */
function withAlpha(cssColor: string, alpha: number): string {
  const t = cssColor.trim()
  if (t.startsWith("oklch(")) {
    const inner = t.slice(6, -1).trim()
    if (/\s\/\s*[\d.]/.test(inner)) {
      return `oklch(${inner})`
    }
    return `oklch(${inner} / ${alpha})`
  }
  if (t.startsWith("#") && (t.length === 7 || t.length === 9)) {
    const hex = t.slice(1, 7)
    const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
      .toString(16)
      .padStart(2, "0")
    return `#${hex}${a}`
  }
  return t
}

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const statusRef = useRef<"playing" | "won" | "lost">("playing")
  const startTimeRef = useRef(0)
  const simRef = useRef({
    birdY: HEIGHT / 2 - BIRD_SIZE / 2,
    velocity: 0,
    pipes: [] as Pipe[],
  })

  const [outcome, setOutcome] = useState<"won" | "lost" | null>(null)
  const [elapsed, setElapsed] = useState(0)

  const reset = useCallback(() => {
    simRef.current = {
      birdY: HEIGHT / 2 - BIRD_SIZE / 2,
      velocity: 0,
      pipes: [],
    }
    statusRef.current = "playing"
    startTimeRef.current = performance.now()
    setOutcome(null)
    setElapsed(0)
  }, [])

  const jump = useCallback(() => {
    if (statusRef.current === "playing") {
      simRef.current.velocity = JUMP_STRENGTH
    }
  }, [])

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        jump()
      }
      if (e.code === "KeyR" && statusRef.current !== "playing") {
        e.preventDefault()
        reset()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [jump, reset])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let lastElapsedSec = -1

    const end = (kind: "won" | "lost") => {
      if (statusRef.current !== "playing") return
      statusRef.current = kind
      setOutcome(kind)
    }

    const spawnPipePair = () => {
      const maxTop = HEIGHT - PIPE_GAP - 48
      const pipeHeight = 32 + Math.floor(Math.random() * (maxTop - 32))
      const s = simRef.current
      s.pipes.push(
        { x: WIDTH + 8, y: 0, width: PIPE_WIDTH, height: pipeHeight },
        {
          x: WIDTH + 8,
          y: pipeHeight + PIPE_GAP,
          width: PIPE_WIDTH,
          height: HEIGHT - pipeHeight - PIPE_GAP,
        }
      )
    }

    const hitPipe = (bx: number, by: number, pipes: Pipe[]) => {
      for (const p of pipes) {
        if (
          bx < p.x + p.width &&
          bx + BIRD_SIZE > p.x &&
          by < p.y + p.height &&
          by + BIRD_SIZE > p.y
        ) {
          return true
        }
      }
      return false
    }

    const draw = () => {
      const colors = readThemeColors()
      const s = simRef.current
      const playing = statusRef.current === "playing"

      const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT)
      sky.addColorStop(0, withAlpha(colors.brand1, 0.33))
      sky.addColorStop(0.45, colors.background)
      sky.addColorStop(1, withAlpha(colors.brand2, 0.2))
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.strokeStyle = withAlpha(colors.muted, 0.13)
      ctx.lineWidth = 1
      for (let x = 0; x < WIDTH; x += CELL * 2) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, HEIGHT)
        ctx.stroke()
      }

      const pipeGrad = ctx.createLinearGradient(0, 0, PIPE_WIDTH, 0)
      pipeGrad.addColorStop(0, colors.brand2)
      pipeGrad.addColorStop(0.5, colors.foreground)
      pipeGrad.addColorStop(1, colors.brand1)

      for (const p of s.pipes) {
        ctx.fillStyle = pipeGrad
        const r = 6
        ctx.beginPath()
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(p.x, p.y, p.width, p.height, r)
        } else {
          ctx.rect(p.x, p.y, p.width, p.height)
        }
        ctx.fill()
        ctx.strokeStyle = withAlpha(colors.primary, 0.27)
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.fillStyle = withAlpha(colors.primary, 0.1)
        ctx.fillRect(p.x + 6, p.y + 8, 8, Math.max(0, p.height - 16))
      }

      const cx = BIRD_X + BIRD_SIZE / 2
      const cy = s.birdY + BIRD_SIZE / 2
      const birdGrad = ctx.createRadialGradient(cx - 2, cy - 2, 2, cx, cy, BIRD_SIZE * 0.65)
      birdGrad.addColorStop(0, colors.primary)
      birdGrad.addColorStop(1, colors.brand1)
      ctx.fillStyle = birdGrad
      ctx.beginPath()
      ctx.arc(cx, cy, BIRD_SIZE * 0.48, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = colors.brand2
      ctx.beginPath()
      ctx.moveTo(BIRD_X + BIRD_SIZE * 0.85, cy)
      ctx.lineTo(BIRD_X + BIRD_SIZE * 1.15, cy - 4)
      ctx.lineTo(BIRD_X + BIRD_SIZE * 1.15, cy + 4)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = colors.background
      ctx.beginPath()
      ctx.arc(cx + 3, cy - 3, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = colors.foreground
      ctx.beginPath()
      ctx.arc(cx + 4, cy - 3, 1.2, 0, Math.PI * 2)
      ctx.fill()

      if (!playing) {
        ctx.fillStyle = withAlpha(colors.background, 0.62)
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
      }
    }

    const step = () => {
      const s = simRef.current

      if (statusRef.current === "playing") {
        s.velocity += GRAVITY
        s.birdY += s.velocity

        if (s.birdY < 0) {
          s.birdY = 0
          end("lost")
        } else if (s.birdY + BIRD_SIZE > HEIGHT) {
          s.birdY = HEIGHT - BIRD_SIZE
          end("lost")
        }

        if (statusRef.current === "playing") {
          s.pipes = s.pipes.map((p) => ({ ...p, x: p.x - PIPE_SPEED })).filter((p) => p.x + p.width > -12)

          const last = s.pipes[s.pipes.length - 1]
          if (s.pipes.length === 0 || !last || last.x < WIDTH - PIPE_SPAWN_MARGIN) {
            spawnPipePair()
          }

          if (hitPipe(BIRD_X, s.birdY, s.pipes)) {
            end("lost")
          }

          const sec = Math.floor((performance.now() - startTimeRef.current) / 1000)
          if (sec !== lastElapsedSec) {
            lastElapsedSec = sec
            setElapsed(sec)
          }
          if (sec >= WIN_SECONDS) {
            end("won")
          }
        }
      }

      draw()
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="group relative rounded-2xl border border-border overflow-hidden bg-card/40 shadow-2xl ring-1 ring-inset ring-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-1)]/12 via-transparent to-[var(--brand-2)]/10 pointer-events-none" />
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="relative z-[1] w-full h-auto block cursor-pointer touch-manipulation select-none"
          style={{ imageRendering: "pixelated" }}
          aria-label="Flappy-style mini game: tap or space to flap"
          onPointerDown={(e) => {
            e.preventDefault()
            jump()
          }}
        />
      </div>

      {!outcome && (
        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
          <span className="font-medium tabular-nums">
            Survive {WIN_SECONDS}s — {elapsed}s
          </span>
          <span className="text-xs sm:text-sm">Tap / Space · R to restart</span>
        </div>
      )}

      {outcome && (
        <div className="mt-5 rounded-2xl border border-border bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md p-5 md:p-7 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-2)] mb-2">
            {outcome === "won" ? "You made it" : "Nice try"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--brand-1)] to-[var(--brand-2)] bg-clip-text text-transparent">
            Hire me now
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            {outcome === "won"
              ? "You cleared the run — imagine what we could ship together."
              : "One more run? Either way, I’d love to build your next thing."}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={reset}>Play again</Button>
            <Button variant="secondary" asChild>
              <a href="mailto:gauravchhetri6363@gmail.com">Email</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/resume">Resume</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
