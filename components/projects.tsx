import { Section } from "./section"
import { ProjectCard } from "./project-card"

export function Projects() {
  return (
    <Section id="work" className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Selected work</p>
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Projects</h2>
        </div>
        <a
          href="#contact"
          className="text-sm text-primary underline-offset-4 hover:underline"
          aria-label="Get in touch about a project"
        >
          Start a project
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title="Dashboard experience"
          description="Design system-driven analytics dashboard focused on clarity and motion."
          tags={["Next.js", "TypeScript", "Design System"]}
          imageAlt="Analytics dashboard thumbnail"
          href="/projects/dashboard-experience"
        />
        <ProjectCard
          title="E‑commerce concept"
          description="Elegant product exploration with fast filtering and frictionless checkout."
          tags={["Shop", "Performance"]}
          imageAlt="Storefront thumbnail"
          imageUrl="/minimal-ecommerce-mock.jpg"
          href="/projects/ecommerce-concept"
        />
        <ProjectCard
          title="Interactive case study"
          description="Narrative case study with scrollytelling and subtle parallax."
          tags={["Story", "Framer Motion"]}
          imageAlt="Case study thumbnail"
          imageUrl="/case-study-hero.jpg"
          href="/projects/interactive-case-study"
        />
      </div>
    </Section>
  )
}
