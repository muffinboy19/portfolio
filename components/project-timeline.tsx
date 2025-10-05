import { cn } from "@/lib/utils"
import { projectsData } from "./projects-data" // Import projects data
import Link from "next/link"
import { Github, Play, Globe } from "lucide-react"

export type ProjectTimelineItem = {
  id: string
  title: string
  description?: string
  tags?: string[]
  githubUrl?: string
  liveUrl?: string
  playstoreUrl?: string
}

type ProjectTimelineProps = {
  className?: string
}

export function ProjectTimeline({ className }: ProjectTimelineProps) {
  return (
    <div className={cn("w-full", className)}>
      <header className="mb-8">
        <h2 className="text-balance font-serif text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
      </header>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[0.875rem] md:left-4 top-0 bottom-0 w-px bg-border/60"
        />
        <ul className="space-y-8 md:space-y-10">
          {projectsData.map((item, i) => (
            <li key={item.id} className="relative pl-8 md:pl-12 group">
              <span
                aria-hidden
                className="absolute left-2 md:left-3 top-2 size-2 rounded-full bg-primary shadow-[0_0_0_3px] shadow-background"
              />
              <div className="rounded-lg border border-border/60 bg-background/40 p-4 md:p-5 backdrop-blur-sm transition-colors duration-300 group-hover:border-primary/50">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-pretty font-serif text-lg md:text-xl font-medium">
                    <Link href={`/projects/${item.id}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                </div>
                {item.description ? (
                  <p className="mt-2 text-pretty text-sm md:text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
                {item.tags && item.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-border bg-background/60 backdrop-blur-sm px-2.5 py-1 text-xs text-foreground transition-all duration-300 hover:scale-105"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                {(item.githubUrl || item.liveUrl || item.playstoreUrl) && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {item.githubUrl && (
                      <Link
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                        aria-label="GitHub repository"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </Link>
                    )}
                    {item.liveUrl && (
                      <Link
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                        aria-label="Live demo"
                      >
                        <Globe className="h-4 w-4" />
                        Live Demo
                      </Link>
                    )}
                    {item.playstoreUrl && (
                      <Link
                        href={item.playstoreUrl}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
