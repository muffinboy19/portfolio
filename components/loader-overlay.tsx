"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function LoaderOverlay() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = typeof window !== "undefined" ? sessionStorage.getItem("v0_seen_loader") : "1"
    if (seen) return
    setShow(true)
    const id = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem("v0_seen_loader", "1")
      } catch {}
    }, 1200)
    return () => clearTimeout(id)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Loading"
          role="status"
        >
          <div className="relative flex flex-col items-center gap-4">
            <motion.div
              className="relative h-16 w-16 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, var(--brand-1), var(--brand-2), transparent 270deg)",
                filter: "drop-shadow(0 0 24px color-mix(in oklch, var(--brand-1), transparent 60%))",
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "linear" }}
            >
              <div className="absolute inset-1 rounded-full bg-card" />
            </motion.div>
            <span className="text-sm text-muted-foreground">Gaurav — loading…</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
