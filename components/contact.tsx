import { Section } from "./section"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react" // Importing icons

export function Contact() {
  return (
    <Section id="contact" className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold md:text-3xl">Let’s talk</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          If you’d like to discuss a project or just say hi, I’m always down to chat.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/60 p-5">
          <p className="text-sm text-muted-foreground">Email</p>
          <div className="mt-1 flex flex-col gap-2">
            <a
              href="mailto:ife2022004@iiita.ac.in"
              className="inline-flex items-center gap-2 text-lg underline underline-offset-4 hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              ife2022004@iiita.ac.in
            </a>
            <a
              href="mailto:gauravchhetri6363@gmail.com"
              className="inline-flex items-center gap-2 text-lg underline underline-offset-4 hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              gauravchhetri6363@gmail.com
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-5">
          <p className="text-sm text-muted-foreground">Social</p>
          <ul className="mt-1 flex flex-wrap gap-3 text-lg">
            <li>
              <Link href="https://www.linkedin.com/in/gaurav-chhetri-a9a254250/" className="inline-flex items-center gap-2 hover:text-primary" aria-label="LinkedIn profile"> {/* Replace with your LinkedIn profile URL */}
                <Linkedin className="h-6 w-6" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="https://github.com/your-github-profile" className="inline-flex items-center gap-2 hover:text-primary" aria-label="GitHub profile"> {/* Replace with your GitHub profile URL */}
                <Github className="h-6 w-6" />
                GitHub
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
