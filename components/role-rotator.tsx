"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function RoleRotator({
  roles,
  interval = 1800,
}: {
  roles: string[]
  interval?: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!roles || roles.length === 0) return
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval)
    return () => clearInterval(id)
  }, [roles, interval])

  if (!roles || roles.length === 0) return null

  const role = roles[index]

  return (
    // use a span so this component can be placed inline (inside headings/paragraphs)
    <span className="relative inline-block h-8 md:h-9 overflow-hidden text-xl md:text-2xl lg:text-3xl font-bold" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={role}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          // make the animated element a block so vertical movement is clipped by the wrapper
          className="block bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] bg-clip-text text-transparent drop-shadow-sm"
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
