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
      <Hero />
      <Projects />
      <Section id="experience" className="relative">
        <Timeline />
      </Section>
      <About />
      <Contact />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p className="text-pretty">Made with ❤️</p>
      </footer>
    </main>
  )
}
