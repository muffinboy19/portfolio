import { notFound } from "next/navigation"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Section } from "@/components/section"
import { Project3DBackground } from "@/components/project-3d-background"
import { getProject } from "@/components/projects-data"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) return notFound()

  return (
    <main className="relative min-h-screen">
      <Project3DBackground />

      <Section className="relative">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/#work">Work</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 space-y-4">
            <h1 className="text-pretty text-3xl font-semibold md:text-4xl">{project.title}</h1>
            <p className="text-pretty text-muted-foreground">{project.description}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            {project.heroImage && (
              <div className="overflow-hidden rounded-lg border border-border bg-card/70">
                <Image
                  src={project.heroImage || "/placeholder.svg"}
                  alt={`${project.title} hero`}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-medium">Overview</h2>
            <p className="text-muted-foreground">
              This case study outlines the goals, constraints, and the solution architecture. Replace this copy with
              your specific narrative—emphasize decisions, tradeoffs, and outcomes with concrete metrics.
            </p>

            <h3 className="text-lg font-medium">Approach</h3>
            <p className="text-muted-foreground">
              Lead with clarity. Summarize your process and highlight where motion, micro‑interactions, and performance
              made a difference to usability.
            </p>

            <h3 className="text-lg font-medium">Results</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Key metric improvement</li>
              <li>Performance gains or UX wins</li>
              <li>Business impact or user satisfaction</li>
            </ul>
          </div>
          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-card/70 p-4">
              <h4 className="text-sm font-medium">Project info</h4>
              <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between gap-3">
                  <dt>Role</dt>
                  <dd>Design & Frontend</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Year</dt>
                  <dd>{new Date().getFullYear()}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Status</dt>
                  <dd>Concept</dd>
                </div>
              </dl>
            </div>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-md border border-border bg-primary/10 px-3 py-2 text-sm text-primary hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a project
            </a>
          </aside>
        </div>
      </Section>
    </main>
  )
}
