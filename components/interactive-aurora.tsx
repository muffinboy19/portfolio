"use client"

import { useEffect, useRef } from "react"

export default function InteractiveAurora() {
  const ref = useRef<HTMLDivElement | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handle = (e: PointerEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const x = e.clientX
        const y = e.clientY
        el.style.setProperty("--x", `${x}px`)
        el.style.setProperty("--y", `${y}px`)
      })
    }

    window.addEventListener("pointermove", handle, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handle)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        // Three additive radial layers that follow the pointer
        background: `
          radial-gradient(500px circle at var(--x) var(--y),
            color-mix(in oklab, var(--brand), white 15%) 0%,
            transparent 55%),
          radial-gradient(900px circle at calc(var(--x) * 0.6) calc(var(--y) * 0.7),
            color-mix(in oklab, var(--accent), white 10%) 0%,
            transparent 65%),
          radial-gradient(1200px circle at calc(var(--x) * 0.3) calc(var(--y) * 0.4),
            color-mix(in oklab, var(--brand), black 35%) 0%,
            transparent 75%)
        `,
        mixBlendMode: "screen",
        transition: "background-position 120ms linear",
        opacity: 0.7,
      }}
    />
  )
}
