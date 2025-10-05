import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game",
  description: "Coming Soon",
};

export default function GamePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold">Game Coming Soon!</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We're working hard to bring you an exciting game. Please check back later!
      </p>
    </div>
  );
}
