import { StaticImageData } from "next/image"

interface Experience {
  id: string
  title: string
  subtitle: string
  period: string
  description: string
  tags: string[]
}

export const experienceData: Experience[] = [
  {
    "id": "exp-1",
    "title": "Software Developer Intern",
    "subtitle": "GleoAI",
    "period": "May 2025 – Jul 2025",
    "description": "• Revamped onboarding & profile workflows, reducing load times by 35% and scaling backend throughput for 10k+ users.\n• Implemented an image-caching module (Kotlin + Coil), eliminating 40% of redundant network calls and reducing database load by 25%.\n• Optimized backend concurrency using Coroutines, boosting execution speed by 30%.",
    "tags": ["Kotlin", "Android", "Coroutines", "Coil"]
  },
  {
    "id": "exp-2",
    "title": "App Developer Intern",
    "subtitle": "CehPoint",
    "period": "Nov 2023 – Feb 2024",
    "description": "• Migrated Java modules to Kotlin MVVM, reducing crash rates by 20% and improving maintainability.\n• Strengthened API reliability with server-side validation and optimized SQL queries, improving latency by 25%.",
    "tags": ["Kotlin", "MVVM", "SQL", "API Design"]
  },
  {
    "id": "exp-3",
    "title": "Mentor",
    "subtitle": "OpenCode",
    "period": "Dec 2023 – Jan 2024",
    "description": "• Mentored 200+ contributors across 3 repositories, reviewed/merged 60+ PRs, and increased test coverage by 25%.\n• Reduced bug backlog by 40% through structured reviews and CI/CD improvements.",
    "tags": ["Open Source", "Git", "CI/CD", "Mentorship"]
  },
  {
    "id": "exp-4",
    "title": "App Wing Coordinator",
    "subtitle": "GeekHaven, IIIT Allahabad",
    "period": "2024 – Present",
    "description": "• Directed Android wing, managing 3 production apps end-to-end and mentoring 50+ students.\n• Introduced scalable architecture practices, cutting code smells by 40% across projects.",
    "tags": ["Leadership", "Android", "Mentorship", "Architecture Design"]
  }
]
