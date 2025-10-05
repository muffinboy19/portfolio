"use client"

import dynamic from "next/dynamic"

const DynamicFlappyBirdGame = dynamic(() => import("@/components/flappy-bird-game"), {
  ssr: false, // Ensure it's client-side rendered
  loading: () => <p>Loading game...</p>, // Optional: Add a loading indicator
})

export default function GamePage() {
  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-pretty">Play Flappy Bird</h1>
        <p className="text-muted-foreground mt-2">You’ll win in 10 seconds. Then it’s time to hire me.</p>
        <div className="mt-6">
          <DynamicFlappyBirdGame />
        </div>
      </div>
    </main>
  )
}
