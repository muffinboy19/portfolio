export const metadata = {
  title: "Work Experience | Gaurav",
  description: "Highlighted roles and responsibilities.",
}

type Experience = {
  company: string
  role: string
  period: string
  summary: string
  bullets?: string[]
}

const experiences: Experience[] = [
  {
    company: "Your Company A",
    role: "Backend Developer",
    period: "2023 — Present",
    summary: "Built scalable APIs and services, improved reliability and performance for high-traffic workloads.",
    bullets: [
      "Shipped REST/GraphQL endpoints with caching and rate limiting",
      "Implemented observability with logs, tracing, and alerts",
      "Reduced p95 latency by 35% via query optimization and async processing",
    ],
  },
  {
    company: "Your Company B",
    role: "Android Developer",
    period: "2022 — 2023",
    summary: "Developed Android features with a focus on stability, UX, and offline-first behavior.",
    bullets: [
      "Delivered complex UI flows with Compose and Kotlin coroutines",
      "Cut crashes by 50% through better error handling and tests",
    ],
  },
]

export default function WorkPage() {
  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Work Experience</h1>
        <p className="text-muted-foreground mt-2">A few highlights of my recent roles and responsibilities.</p>

        <div className="mt-8 space-y-6">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.role}`}
              className="rounded-xl border border-border p-4 md:p-6 bg-background/60"
            >
              <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                <h2 className="text-xl md:text-2xl font-semibold">{exp.role}</h2>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </header>
              <p className="mt-2 text-pretty">
                {exp.company} — {exp.summary}
              </p>
              {exp.bullets && (
                <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold">Timeline</h2>
          <div className="mt-6 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-6" aria-hidden="true" />
            <ol className="space-y-8">
              {experiences.map((exp, i) => (
                <li key={`${exp.company}-${i}`} className="relative pl-12 md:pl-16">
                  <span
                    className="absolute left-3.5 md:left-5 top-1.5 h-3 w-3 rounded-full bg-primary ring-2 ring-background"
                    aria-hidden="true"
                  />
                  <div className="rounded-lg border border-border bg-background/60 p-4 md:p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base md:text-lg font-medium">{exp.role}</h3>
                      <span className="text-xs md:text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{exp.company}</p>
                    <p className="mt-2 text-pretty">{exp.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}
