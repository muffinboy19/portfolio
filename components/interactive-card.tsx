"use client"

import type React from "react"

import { type ReactNode, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

type InteractiveCardProps = {
  children: ReactNode
  className?: string
}

export function InteractiveCard({ children, className }: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 })
  const sheenX = useSpring(mx, { stiffness: 200, damping: 28 })

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set(px)
    my.set(py)
  }

  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      className={["relative will-change-transform", className || ""].join(" ")}
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{ z: 12 }}
    >
      {/* Card 3D tilt */}
      <motion.div
        className="group relative rounded-xl bg-card ring-1 ring-border transition duration-300"
        style={{
          rotateX: rx as any,
          rotateY: ry as any,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Purple glow gradient border on hover (replaces old box-shadow) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[calc(var(--radius-lg)+2px)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, var(--brand-1) 0deg, transparent 120deg, var(--brand-2) 240deg, transparent 360deg)",
          }}
        />
        {/* Sheen sweep */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            translateZ: 1,
            transform: "translateZ(1px)",
            backgroundPositionX: sheenX.to((v) => `${(v - 0.5) * 50}%`),
            backgroundSize: "300% 100%",
            mixBlendMode: "screen",
          }}
        />
        <div className="relative z-[1]">{children}</div>
      </motion.div>
    </motion.div>
  )
}

export default InteractiveCard
