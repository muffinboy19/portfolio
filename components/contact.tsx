import { Section } from "./section"
import Link from "next/link"

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
          <a
            href="mailto:hello@example.com"
            className="mt-1 inline-block text-lg underline underline-offset-4 hover:text-primary"
          >
            hello@example.com
          </a>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-5">
          <p className="text-sm text-muted-foreground">Social</p>
          <ul className="mt-1 flex flex-wrap gap-3 text-lg">
            <li>
              <Link href="#" className="hover:text-primary">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                GitHub
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Bluesky
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
