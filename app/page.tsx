import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { LoaderOverlay } from "@/components/loader-overlay"
import { DynamicBackground } from "@/components/dynamic-background"
import { Timeline } from "@/components/timeline"
import { Section } from "@/components/section"

export default function Home() {
  return (
    <main className="divide-y divide-border">
      <LoaderOverlay /> {/* first-visit loading animation */}
      <DynamicBackground /> {/* interactive aurora follows the cursor across the page */}
      <Nav />
      <Hero />
      <Projects />
      <Section id="experience" className="relative">
        <Timeline
          items={[
            {
              title: "Backend Developer",
              subtitle: "APIs, services, performance",
              period: "2023 — Present",
              description:
                "Designing and building secure, high‑performance services. Focus on clean architecture, observability, and scalability.",
              tags: ["Node.js", "Postgres", "Prisma", "REST", "GraphQL"],
            },
            {
              title: "Android Developer",
              subtitle: "Apps & UI experiences",
              period: "2022 — 2023",
              description:
                "Shipped Android apps with modern tooling. Crafted responsive UI and smooth interactions with attention to detail.",
              tags: ["Kotlin", "Jetpack", "Compose", "Material"],
            },
            {
              title: "Problem Solver",
              subtitle: "Algorithms & systems",
              period: "2019 — Present",
              description:
                "Solve complex problems with a pragmatic mindset—optimize bottlenecks, simplify systems, and iterate quickly.",
              tags: ["DSA", "Performance", "Systems"],
            },
          ]}
        />
      </Section>
      <About />
      <Contact />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p className="text-pretty">© {new Date().getFullYear()} Gaurav. All rights reserved.</p>
      </footer>
    </main>
  )
}
