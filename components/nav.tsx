"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/game", label: "Play a game" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto relative flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="#top" className="font-mono text-sm text-muted-foreground hover:text-foreground">
          <span className="bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] bg-clip-text text-transparent">
            gaurav.dev
          </span>
          <span className="sr-only">Home</span>
        </Link>

        <nav aria-label="Primary">
          <button
            className="md:hidden rounded-md border border-border px-3 py-2 text-sm"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
          <ul className={cn("hidden md:flex items-center gap-6 text-sm")} id="mobile-menu">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="mailto:gauravchhetri6363@gmail.com"
                className="inline-block rounded-md border border-border px-3 py-1.5 text-foreground hover:text-primary transition"
              >
                Hire me
              </a>
            </li>
          </ul>
        </nav>

        {open && (
          <div className="md:hidden absolute right-4 top-full mt-2 z-50 rounded-lg border border-border bg-background/95 p-3 shadow-lg">
            <ul className="flex flex-col gap-3 text-sm">
              {links.map((l) => (
                <li key={`m-${l.href}`}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded px-2 py-1.5 text-muted-foreground hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1 border-t border-border">
                <a
                  href="mailto:gauravchhetri6363@gmail.com"
                  onClick={() => setOpen(false)}
                  className="block rounded-md border border-border px-3 py-1.5 text-center text-foreground hover:text-primary"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
