import { Section } from "./section"
import { ProjectCard } from "./project-card"
import { projectsData } from "./projects-data"

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
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            imageAlt={project.title + " thumbnail"}
            imageUrl={project.image as string}
            href={`/projects/${project.id}`} {/* Link to the individual project page */}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            playstoreUrl={project.playstoreUrl}
          />
        ))}
      </div>
    </Section>
  )
}
