import type { Metadata } from "next"
import FlappyBirdGame from "@/components/flappy-bird-game"

export const metadata: Metadata = {
  title: "Game",
  description: "A quick browser mini-game — survive the pipes.",
}

export default function GamePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center px-4 py-12 md:py-16">
      <div className="w-full max-w-xl text-center mb-8 md:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
          Play a game
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Neon flap</h1>
        <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
          Tap the canvas (or press Space) once to start, then keep tapping to stay up. Survive twelve seconds to win.
        </p>
      </div>
      <FlappyBirdGame />
    </main>
  )
}
