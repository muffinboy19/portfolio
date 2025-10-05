"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type Point = { x: number; y: number; width?: number; height?: number }
const CELL = 16
const COLS = 24
const ROWS = 24
const SPEED_MS = 60
const WIN_SECONDS = 10

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [birdY, setBirdY] = useState(ROWS / 2)
  const [velocity, setVelocity] = useState(0)
  const [pipes, setPipes] = useState<Point[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(true) // Auto-start the game
  const [won, setWon] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const GRAVITY = 0.4
  const JUMP_STRENGTH = -7
  const PIPE_WIDTH = 30
  const PIPE_GAP = 120 // Increased gap for easier play
  const PIPE_SPEED = 2.5 // Increased speed for faster play
  const BIRD_SIZE = CELL // Bird size, simpler

  useEffect(() => {
    function handleJump() {
      if (!gameOver && gameStarted) {
        setVelocity(JUMP_STRENGTH)
      }
    }

    function handleRestart(e: KeyboardEvent) {
      if (e.code === "KeyR" && gameOver) {
        setGameStarted(true)
        setGameOver(false)
        setWon(false)
        setElapsed(0)
        setBirdY(ROWS / 2)
        setVelocity(0)
        setPipes([])
      }
    }

    window.addEventListener("click", handleJump)
    window.addEventListener("keydown", handleRestart)
    return () => {
      window.removeEventListener("click", handleJump)
      window.removeEventListener("keydown", handleRestart)
    }
  }, [gameOver, gameStarted])

  useEffect(() => {
    if (!gameStarted || gameOver || won) return
    const id = setInterval(() => setElapsed((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [gameStarted, gameOver, won])

  useEffect(() => {
    if (elapsed >= WIN_SECONDS && gameStarted && !gameOver) {
      setWon(true)
      setGameOver(true)
    }
  }, [elapsed, gameStarted, gameOver])

  // Game logic loop
  useEffect(() => {
    if (!gameStarted || gameOver || won) return

    const gameTick = setInterval(() => {
      // Update bird
      setBirdY((prevBirdY) => {
        const newY = prevBirdY + velocity
        if (newY < 0 || newY > ROWS * CELL - BIRD_SIZE) {
          setGameOver(true)
          return prevBirdY
        }
        return newY
      })
      setVelocity((prevVelocity) => prevVelocity + GRAVITY)

      // Update pipes
      setPipes((prevPipes) => {
        let newPipes = prevPipes
          .map((p) => ({ ...p, x: p.x - PIPE_SPEED }))
          .filter((p) => p.x + PIPE_WIDTH > 0)

        // Add new pipes
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < COLS * CELL - 200) {
          const pipeHeight = Math.floor(Math.random() * (ROWS * CELL - PIPE_GAP - 50)) + 25
          newPipes.push(
            { x: COLS * CELL, y: 0, width: PIPE_WIDTH, height: pipeHeight },
            { x: COLS * CELL, y: pipeHeight + PIPE_GAP, width: PIPE_WIDTH, height: ROWS * CELL - pipeHeight - PIPE_GAP }
          )
        }
        return newPipes
      })
    }, SPEED_MS)

    return () => clearInterval(gameTick)
  }, [gameStarted, gameOver, won, velocity]) // Removed birdY and pipes from deps to avoid re-creating interval

  // Collision detection and drawing loop
  // Collision detection and drawing loop
  // Drawing loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!ctx || !canvas) {
      return
    }

    // Function to draw the current state of the game
    const drawGame = (currentBirdY: number, currentPipes: Point[]) => {
      ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL)
      ctx.fillStyle = "var(--background)"
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)

      // Draw bird as a simple circle with a beak
      ctx.fillStyle = "var(--primary)" // Bird color
      ctx.beginPath()
      ctx.arc(COLS * CELL / 4 + BIRD_SIZE / 2, currentBirdY + BIRD_SIZE / 2, BIRD_SIZE / 2, 0, Math.PI * 2)
      ctx.fill()
      // Draw a small triangle for the beak
      ctx.fillStyle = "var(--accent)"
      ctx.beginPath()
      ctx.moveTo(COLS * CELL / 4 + BIRD_SIZE, currentBirdY + BIRD_SIZE / 2)
      ctx.lineTo(COLS * CELL / 4 + BIRD_SIZE + 5, currentBirdY + BIRD_SIZE / 2 - 5)
      ctx.lineTo(COLS * CELL / 4 + BIRD_SIZE + 5, currentBirdY + BIRD_SIZE / 2 + 5)
      ctx.closePath()
      ctx.fill()

      // Draw pipes
      ctx.fillStyle = "var(--foreground)" // Pipes color
      currentPipes.forEach((p) => ctx.fillRect(p.x, p.y, p.width!, p.height!))
    }

    // Initial draw to ensure something is visible immediately
    drawGame(birdY, pipes)

    const animate = () => {
      if (gameOver || won) {
        return
      }

      // Collision detection (needs to be here to use latest birdY and pipes)
      const currentBirdX = COLS * CELL / 4
      for (const p of pipes) {
        if (
          currentBirdX < p.x + p.width! &&
          currentBirdX + BIRD_SIZE > p.x &&
          birdY < p.y + p.height! &&
          birdY + BIRD_SIZE > p.y
        ) {
          setGameOver(true)
          return
        }
      }

      // Drawing
      drawGame(birdY, pipes) // Draw with the latest state

      requestAnimationFrame(animate)
    }

    const animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [birdY, pipes, gameOver, won, gameStarted]) // Redraw when birdY or pipes change

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

      {!won && !gameOver && gameStarted && (
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Time: {elapsed}s / {WIN_SECONDS}s
          </span>
          <span>Click to Jump, Press R to Restart</span>
        </div>
      )}


      {gameOver && !won && (
        <div className="mt-4 rounded-xl border border-border bg-background/70 backdrop-blur p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold">Game Over!</h2>
          <p className="text-muted-foreground mt-1">Try again to win in {WIN_SECONDS} seconds.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => {
              setGameStarted(true)
              setGameOver(false)
              setWon(false)
              setElapsed(0)
              setBirdY(ROWS / 2)
              setVelocity(0)
              setPipes([])
            }}>
              Restart Game
            </Button>
          </div>
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
