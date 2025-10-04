import { cn } from "@/lib/utils"

export type TimelineItem = {
  title: string
  subtitle?: string
  period?: string
  description?: string
  tags?: string[]
}

type TimelineProps = {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("w-full", className)}>
      <header className="mb-8">
        <h2 className="text-balance font-serif text-2xl md:text-3xl font-semibold tracking-tight">Experience</h2>
      </header>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[0.875rem] md:left-4 top-0 bottom-0 w-px bg-border/60"
        />
        <ul className="space-y-8 md:space-y-10">
          {items.map((item, i) => (
            <li key={i} className="relative pl-8 md:pl-12 group">
              <span
                aria-hidden
                className="absolute left-2 md:left-3 top-2 size-2 rounded-full bg-primary shadow-[0_0_0_3px] shadow-background"
              />
              <div className="rounded-lg border border-border/60 bg-background/40 p-4 md:p-5 backdrop-blur-sm transition-colors duration-300 group-hover:border-primary/50">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-pretty font-serif text-lg md:text-xl font-medium">
                    {item.title}
                    {item.subtitle ? (
                      <span className="block md:inline md:ml-2 text-muted-foreground font-normal">{item.subtitle}</span>
                    ) : null}
                  </h3>
                  {item.period ? <time className="text-sm text-muted-foreground">{item.period}</time> : null}
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
                        className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-primary/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
