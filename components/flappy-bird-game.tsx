"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type Pipe = { x: number; y: number; width: number; height: number; scored?: boolean }
type GameStatus = "ready" | "playing" | "won" | "lost"

const COLS = 24
const CELL = 16
const WIDTH = COLS * CELL
const HEIGHT = COLS * CELL
const WIN_SECONDS = 12

const GRAVITY = 0.22
const JUMP_STRENGTH = -5.35
const PIPE_WIDTH = 34
const PIPE_GAP = 118
const PIPE_SPEED = 1.88
const BIRD_SIZE = CELL
const BIRD_X = WIDTH * 0.22
const BIRD_SCORE_X = BIRD_X + BIRD_SIZE / 2
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
  const statusRef = useRef<GameStatus>("ready")
  const startTimeRef = useRef(0)
  const lastElapsedSecRef = useRef(-1)
  const simRef = useRef({
    birdY: HEIGHT / 2 - BIRD_SIZE / 2,
    velocity: 0,
    pipes: [] as Pipe[],
    score: 0,
  })

  const [outcome, setOutcome] = useState<"won" | "lost" | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [score, setScore] = useState(0)
  const [awaitingFirstTap, setAwaitingFirstTap] = useState(true)

  const reset = useCallback(() => {
    simRef.current = {
      birdY: HEIGHT / 2 - BIRD_SIZE / 2,
      velocity: 0,
      pipes: [],
      score: 0,
    }
    statusRef.current = "ready"
    startTimeRef.current = 0
    lastElapsedSecRef.current = -1
    setOutcome(null)
    setElapsed(0)
    setScore(0)
    setAwaitingFirstTap(true)
  }, [])

  /** After a loss: new run immediately (R, Space, or tap) without a blank screen. */
  const retryAfterLoss = useCallback(() => {
    reset()
    statusRef.current = "playing"
    startTimeRef.current = performance.now()
    lastElapsedSecRef.current = -1
    setAwaitingFirstTap(false)
    simRef.current.velocity = JUMP_STRENGTH
  }, [reset])

  const jump = useCallback(() => {
    const st = statusRef.current
    if (st === "won") return

    if (st === "lost") {
      retryAfterLoss()
      return
    }

    if (st === "ready") {
      statusRef.current = "playing"
      startTimeRef.current = performance.now()
      lastElapsedSecRef.current = -1
      setElapsed(0)
      simRef.current.score = 0
      setScore(0)
      setAwaitingFirstTap(false)
    }

    if (statusRef.current === "playing") {
      simRef.current.velocity = JUMP_STRENGTH
    }
  }, [retryAfterLoss])

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        jump()
      }
      if (e.code === "KeyR") {
        if (statusRef.current === "lost") {
          e.preventDefault()
          retryAfterLoss()
        } else if (statusRef.current === "won") {
          e.preventDefault()
          reset()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [jump, reset, retryAfterLoss])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0

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
        { x: WIDTH + 8, y: 0, width: PIPE_WIDTH, height: pipeHeight, scored: false },
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
      const status = statusRef.current

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

      if (status === "playing" || status === "lost") {
        ctx.save()
        ctx.textAlign = "center"
        ctx.font = "800 28px system-ui, ui-sans-serif, sans-serif"
        ctx.fillStyle = withAlpha(colors.foreground, 0.95)
        ctx.strokeStyle = withAlpha(colors.background, 0.85)
        ctx.lineWidth = 4
        const scoreText = String(s.score)
        ctx.strokeText(scoreText, WIDTH / 2, 44)
        ctx.fillText(scoreText, WIDTH / 2, 44)
        ctx.restore()
      }

      if (status === "lost") {
        ctx.save()
        ctx.textAlign = "center"
        ctx.font = "600 17px system-ui, ui-sans-serif, sans-serif"
        ctx.fillStyle = withAlpha(colors.foreground, 0.95)
        ctx.strokeStyle = withAlpha(colors.background, 0.9)
        ctx.lineWidth = 3
        const line1 = "Try again"
        const line2 = "Press R or tap"
        ctx.strokeText(line1, WIDTH / 2, HEIGHT * 0.62)
        ctx.fillText(line1, WIDTH / 2, HEIGHT * 0.62)
        ctx.font = "500 13px system-ui, ui-sans-serif, sans-serif"
        ctx.strokeText(line2, WIDTH / 2, HEIGHT * 0.62 + 22)
        ctx.fillText(line2, WIDTH / 2, HEIGHT * 0.62 + 22)
        ctx.restore()
      }

      if (status === "ready") {
        ctx.save()
        ctx.textAlign = "center"
        ctx.font = "600 15px system-ui, ui-sans-serif, sans-serif"
        ctx.fillStyle = withAlpha(colors.foreground, 0.92)
        ctx.fillText("Tap or press Space to start", WIDTH / 2, HEIGHT * 0.72)
        ctx.font = "500 12px system-ui, ui-sans-serif, sans-serif"
        ctx.fillStyle = withAlpha(colors.muted, 0.95)
        ctx.fillText("First tap begins the run", WIDTH / 2, HEIGHT * 0.72 + 20)
        ctx.restore()
      }

      if (status === "won") {
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

          let pipesCleared = 0
          for (const p of s.pipes) {
            if (p.y === 0 && !p.scored && p.x + p.width < BIRD_SCORE_X) {
              p.scored = true
              pipesCleared += 1
            }
          }
          if (pipesCleared > 0) {
            s.score += pipesCleared
            setScore(s.score)
          }

          const sec = Math.floor((performance.now() - startTimeRef.current) / 1000)
          if (sec !== lastElapsedSecRef.current) {
            lastElapsedSecRef.current = sec
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
          aria-label="Mini game: first tap starts; flap with tap or Space; after a loss, R or tap to retry"
          onPointerDown={(e) => {
            e.preventDefault()
            jump()
          }}
        />
      </div>

      {(!outcome || outcome === "lost") && (
        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
          {outcome === "lost" ? (
            <>
              <span className="font-medium tabular-nums">
                Score {score} · Run ended
              </span>
              <span className="text-xs sm:text-sm">Press R or tap the game to retry</span>
            </>
          ) : awaitingFirstTap ? (
            <>
              <span className="font-medium">Tap the game to begin</span>
              <span className="text-xs sm:text-sm">Space also starts</span>
            </>
          ) : (
            <>
              <span className="font-medium tabular-nums">
                Score {score} · Time {elapsed}s / {WIN_SECONDS}s
              </span>
              <span className="text-xs sm:text-sm">Tap / Space · R after you win</span>
            </>
          )}
        </div>
      )}

      {outcome === "won" && (
        <div className="mt-5 rounded-2xl border border-border bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md p-5 md:p-7 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-2)] mb-2">You made it</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--brand-1)] to-[var(--brand-2)] bg-clip-text text-transparent">
            Hire me now
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            <span className="font-semibold text-foreground tabular-nums">Score: {score}</span>
            <span className="mx-2 text-border">·</span>
            You cleared the run — imagine what we could ship together.
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
