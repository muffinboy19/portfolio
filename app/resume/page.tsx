import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Resume | Gaurav",
  description: "Resume overview and download link.",
}

export default function ResumePage() {
  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>
            <p className="text-muted-foreground">Gaurav — Backend Developer • Android Developer • Problem Solver</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <a href="/resume.pdf" download>
                Download PDF
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/work">Work Experience</Link>
            </Button>
          </div>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border p-4 md:p-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                Email:{" "}
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="mailto:gauravchhetri6363@gmail.com"
                >
                  gauravchhetri6363@gmail.com
                </a>
              </li>
              <li>
                Institute Email:{" "}
                <a className="underline underline-offset-4 hover:text-primary" href="mailto:ife2022004@iiita.ac.in">
                  ife2022004@iiita.ac.in
                </a>
              </li>
              <li>
                Phone:{" "}
                <a className="underline underline-offset-4 hover:text-primary" href="tel:+919022772397">
                  +91 9022772397
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="https://www.linkedin.com/in/gaurav-chhetri-a9a254250/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Profile
                </a>
              </li>
              <li>
                GitHub:{" "}
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="https://github.com/muffinboy19/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  muffinboy19
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border p-4 md:p-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Backend (APIs, Databases, Performance), Android (Compose/Kotlin), Problem Solving, System Design, Testing,
              Observability.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border p-0 overflow-hidden">
          <div className="px-4 py-4 md:px-6 md:py-5 border-b border-border">
            <h2 className="text-xl font-semibold">Resume Viewer</h2>
            <p className="text-sm text-muted-foreground mt-1">
              If the PDF doesn’t display below, use the Download button.
            </p>
          </div>
          <div className="p-3 md:p-4">
            <object
              data="/resume.pdf"
              type="application/pdf"
              className="w-full h-[75dvh] rounded-lg border border-border"
              aria-label="Embedded resume PDF"
            >
              <div className="text-sm text-muted-foreground p-4">
                PDF preview is not supported here.{" "}
                <a className="underline underline-offset-4 hover:text-primary" href="/resume.pdf" download>
                  Download the resume
                </a>
                .
              </div>
            </object>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border p-4 md:p-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="mt-2 text-pretty">
            I build reliable, performant systems with clean interfaces and great developer ergonomics. I care about
            observability, tests, and shipping pragmatic solutions.
          </p>
        </section>
      </div>
    </main>
  )
}
