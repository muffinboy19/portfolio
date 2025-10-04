"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HireMeBar() {
  return (
    <div
      aria-label="Hire Gaurav"
      className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-border/60 bg-background/70 backdrop-blur-md shadow-[0_0_0_1px_hsl(var(--border))] px-4 py-3 md:px-6 md:py-4"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">Hire me — let’s build something great together.</p>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <Link
            href="mailto:gauravchhetri6363@gmail.com"
            aria-label="Email Gaurav: gauravchhetri6363@gmail.com"
            className="text-sm underline underline-offset-4 hover:text-primary"
          >
            gauravchhetri6363@gmail.com
          </Link>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <Link
            href="mailto:ife2022004@iiita.ac.in"
            aria-label="Email Gaurav: ife2022004@iiita.ac.in"
            className="text-sm underline underline-offset-4 hover:text-primary"
          >
            ife2022004@iiita.ac.in
          </Link>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <Link href="tel:+919022772397" aria-label="Call Gaurav at 9022772397" className="text-sm hover:text-primary">
            +91 9022772397
          </Link>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <Link
            href="https://www.linkedin.com/in/gaurav-chhetri-a9a254250/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 hover:text-primary"
          >
            LinkedIn
          </Link>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <Link
            href="https://github.com/muffinboy19/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 hover:text-primary"
          >
            GitHub
          </Link>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <Button asChild size="sm" variant="secondary" className="border border-border/60">
            <Link href="/game" aria-label="Play a game">
              Play a game
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
