"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { Button } from "@/components/ui/button"
import { RoleRotator } from "./role-rotator"
// import { DynamicBackground } from "./dynamic-background" // DynamicBackground moved to page-level

export function Hero() {
  return (
    <Section id="top" className="relative pt-12 md:pt-16">
      {/* DynamicBackground moved to page-level so the whole page reacts to the mouse */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid gap-8 md:grid-cols-2"
      >
        <div className="space-y-6">
          <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            {"Hi, I'm "}
            <span className="bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] bg-clip-text text-transparent">
              Gaurav
            </span>
          </h1>
          <p className="text-pretty text-muted-foreground md:text-lg">
            <span className="sr-only">Roles:</span>
            <RoleRotator roles={["Backend Developer", "Android Developer", "Problem Solver"]} />
          </p>
          <p className="text-pretty text-muted-foreground md:text-lg">
            I design and build accessible, performant web experiences with delightful micro-interactions. Currently
            available for select projects and collaborations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#work" aria-label="See selected work">
                See work
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="#contact" aria-label="Contact me">
                Contact
              </a>
            </Button>
          </div>
        </div>

        <div className="relative rounded-xl border border-border bg-card/60 p-4 md:p-6">
          <div
            className="aspect-video w-full overflow-hidden rounded-lg bg-muted/40 ring-1 ring-border"
            aria-hidden="true"
          >
            {/* Placeholder visual preview */}
            <img src="/portfolio-preview-grid.jpg" alt="" className="h-full w-full rounded-lg object-cover" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Preview — swap with a hero image or interactive canvas later.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
