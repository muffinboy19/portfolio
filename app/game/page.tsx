import FlappyBirdGame from "@/components/flappy-bird-game"

export const metadata = {
  title: "Play Flappy Bird | Gaurav",
  description: "Survive for 10 seconds — then you have to hire me.",
}

export default function GamePage() {
  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-pretty">Play Flappy Bird</h1>
        <p className="text-muted-foreground mt-2">You’ll win in 10 seconds. Then it’s time to hire me.</p>
        <div className="mt-6">
          <FlappyBirdGame />
        </div>
      </div>
    </main>
  )
}
