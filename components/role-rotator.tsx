"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function RoleRotator({ roles, interval = 1800 }: { roles: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval)
    return () => clearInterval(id)
  }, [roles.length, interval])

  const role = roles[index]

  return (
    <div className="relative h-6 md:h-7 overflow-y-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={role}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] bg-clip-text text-transparent"
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
