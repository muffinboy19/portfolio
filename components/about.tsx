import { Section } from "./section"

export function About() {
  return (
    <Section id="about" className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <h2 className="text-2xl font-semibold md:text-3xl">About</h2>
      </div>
      <div className="md:col-span-2 space-y-6 text-muted-foreground">
        <p className="text-pretty">
          I’m an independent designer/developer focused on building thoughtful, accessible interfaces. My work blends
          systematic design with robust engineering, emphasizing performance and detail.
        </p>
        <p className="text-pretty">
          I enjoy collaborating with ambitious teams, shipping real products, and teaching along the way. Outside of
          work, you’ll find me exploring typography, micro‑interactions, and new tools.
        </p>
      </div>
    </Section>
  )
}
