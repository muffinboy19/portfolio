import { projectsData } from "@/components/projects-data"
import { Section } from "@/components/section"
import Image from "next/image"
import Link from "next/link"
import { Github, Play, Globe } from "lucide-react"
interface ProjectDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projectsData.find((p) => p.id === params.slug)

  if (!project) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
      </Section>
    )
  }

  return (
    <Section className="space-y-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto relative z-10"> {/* Added relative z-10 to ensure content is above background */}
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{project.description}</p>

        {project.image && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto"> {/* Reduced image size and centered */}
            <Image
              src={project.image as string}
              alt={project.title}
              width={1000}
              height={562}
              layout="responsive"
              className="object-cover"
            />
          </div>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-background/60 backdrop-blur-sm px-3 py-1 text-sm text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(project.githubUrl || project.liveUrl || project.playstoreUrl) && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-lg text-primary hover:underline"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-lg text-primary hover:underline"
                >
                  <Globe className="h-5 w-5" />
                  Live Demo
                </Link>
              )}
              {project.playstoreUrl && (
                <Link
                  href={project.playstoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-lg text-primary hover:underline"
                >
                  <Play className="h-5 w-5" />
                  Play Store
                </Link>
              )}
            </div>
          </div>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Challenges Faced</h2>
            <div className="space-y-4">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="rounded-lg border border-border bg-card/60 p-4">
                  <h3 className="text-xl font-medium mb-1">{challenge.title}</h3>
                  <p className="text-muted-foreground">{challenge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.solutions && project.solutions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Solutions Implemented</h2>
            <div className="space-y-4">
              {project.solutions.map((solution, index) => (
                <div key={index} className="rounded-lg border border-border bg-card/60 p-4">
                  <h3 className="text-xl font-medium mb-1">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
