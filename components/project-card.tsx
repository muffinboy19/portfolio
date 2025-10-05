"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRef } from "react"

import { Github, Play, Globe } from "lucide-react" // Importing icons for links

type ProjectCardProps = {
  title: string
  description: string
  id: string
  tags?: string[]
  imageAlt?: string
  imageUrl?: string
  className?: string
  githubUrl?: string
  liveUrl?: string
  playstoreUrl?: string
}

export function ProjectCard({
  title,
  description,
  id,
  tags = [],
  imageAlt = "",
  imageUrl = "/project-thumbnail.jpg",
  className,
  githubUrl,
  liveUrl,
  playstoreUrl,
}: ProjectCardProps) {
  const projectPageHref = `/projects/${id}`
  const Wrapper = Link
  const wrapperProps = { href: projectPageHref }

  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 22 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 22 })

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
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card/60 p-3 transition-colors hover:bg-card",
        "will-change-transform", // performance hint
        className,
      )}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      ref={ref}
    >
      {/* purple glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[calc(var(--radius-lg)+2px)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, var(--brand-1) 0deg, transparent 120deg, var(--brand-2) 240deg, transparent 360deg)",
        }}
      />
      {/* sheen sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-[-120%] rotate-6 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[120%] group-hover:opacity-100"
      />
      <Wrapper
        {...(wrapperProps as any)}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="will-change-transform"
        >
          <div className="overflow-hidden rounded-md">
            <img
              src={imageUrl || "/placeholder.svg?height=400&width=640&query=project%20thumbnail"}
              alt={imageAlt}
              className="aspect-[16/10] w-full scale-100 transform rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="mt-3 space-y-2">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            {tags.length > 0 && (
              <ul className="mt-1 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-background/60 backdrop-blur-sm px-2 py-1 text-xs text-foreground transition-all duration-300 hover:scale-105"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {(githubUrl || liveUrl || playstoreUrl) && (
              <div className="mt-3 flex flex-wrap gap-3">
                {githubUrl && (
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    aria-label="GitHub repository"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                )}
                {liveUrl && (
                  <Link
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    aria-label="Live demo"
                  >
                    <Globe className="h-4 w-4" />
                    Live Demo
                  </Link>
                )}
                {playstoreUrl && (
                  <Link
                    href={playstoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    aria-label="Play Store link"
                  >
                    <Play className="h-4 w-4" />
                    Play Store
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </Wrapper>
    </motion.article>
  )
}
