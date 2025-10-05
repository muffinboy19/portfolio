import { Section } from "./section"
import { projectsData } from "./projects-data"
import { ProjectCard } from "./project-card" // Import ProjectCard

export function Projects() {
  return (
    <Section id="work" className="space-y-8">
      <header className="mb-8">
        <h2 className="text-balance font-serif text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.image as string}
            tags={project.tags}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            playstoreUrl={project.playstoreUrl}
          />
        ))}
      </div>
    </Section>
  )
}
