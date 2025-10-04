"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function DynamicBackground() {
  // track mouse as viewport percentages (0-100)
  const [pos, setPos] = useState({ x: 50, y: 30 })
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100))
        const y = Math.max(0, Math.min(100, (e.clientY / window.innerHeight) * 100))
        setPos({ x, y })
      })
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* interactive purple blob that follows the cursor */}
      <motion.div
        className="absolute h-[50vmin] w-[65vmin] rounded-full blur-3xl"
        style={{
          left: `calc(${pos.x}% - 32vmin)`,
          top: `calc(${pos.y}% - 32vmin)`,
          background: `radial-gradient(closest-side at ${pos.x}% ${pos.y}%, color-mix(in oklch, var(--brand-1), transparent 35%), transparent 75%)`,
          opacity: 0.75,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />
      {/* a secondary, slower blob for parallax depth */}
      <motion.div
        className="absolute h-[60vmin] w-[80vmin] rounded-full blur-3xl"
        style={{
          left: `calc(${Math.max(0, Math.min(100, pos.x * 0.8 + 10))}% - 40vmin)`,
          top: `calc(${Math.max(0, Math.min(100, pos.y * 0.7 + 8))}% - 40vmin)`,
          background: `radial-gradient(closest-side at ${pos.x}% ${pos.y}%, color-mix(in oklch, var(--brand-2), transparent 45%), transparent 78%)`,
          opacity: 0.45,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 22 }}
      />
      <motion.div
        className="absolute rounded-full blur-2xl"
        style={{
          left: `calc(${pos.x}% - ${pressed ? "16vmin" : "10vmin"})`,
          top: `calc(${pos.y}% - ${pressed ? "16vmin" : "10vmin"})`,
          width: pressed ? "32vmin" : "20vmin",
          height: pressed ? "32vmin" : "20vmin",
          background: `radial-gradient(closest-side at 50% 50%, color-mix(in oklch, var(--brand-1), white 12%), transparent 70%)`,
          opacity: pressed ? 0.9 : 0.6,
          mixBlendMode: "screen",
        }}
        animate={{ scale: pressed ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
      />
      {/* faint grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(1200px 600px at 50% 30%, black 70%, transparent 100%)",
        }}
      />
    </div>
  )
}
