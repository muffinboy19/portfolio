"use client"

import type React from "react"
import { cn } from "@/lib/utils"

type SectionProps = React.PropsWithChildren<{
  id?: string
  className?: string
}>

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-16 sm:py-20 md:py-24", className)}>
      {children}
    </section>
  )
}
