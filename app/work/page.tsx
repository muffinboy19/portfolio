import { Timeline } from "@/components/timeline"
import { experienceData } from "@/components/experience-data"

export const metadata = {
  title: "Work Experience | Gaurav",
  description: "Highlighted roles and responsibilities.",
}

export default function WorkPage() {
  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Work Experience</h1>
        <p className="text-muted-foreground mt-2">A few highlights of my recent roles and responsibilities.</p>

        <div className="mt-8">
          <Timeline />
        </div>
      </div>
    </main>
  )
}
