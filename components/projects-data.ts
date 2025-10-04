export type ProjectMeta = {
  slug: string
  title: string
  description: string
  tags: string[]
  heroImage?: string
}

export const projects: ProjectMeta[] = [
  {
    slug: "dashboard-experience",
    title: "Dashboard experience",
    description: "A clean, data-forward analytics dashboard powered by a design system and subtle motion.",
    tags: ["Next.js", "TypeScript", "Design System"],
    heroImage: "/portfolio-preview-grid.jpg",
  },
  {
    slug: "ecommerce-concept",
    title: "E‑commerce concept",
    description: "A fast, elegant storefront with delightful browse-to-buy flows and crisp performance.",
    tags: ["Shop", "Performance"],
    heroImage: "/minimal-ecommerce-mock.jpg",
  },
  {
    slug: "interactive-case-study",
    title: "Interactive case study",
    description: "A narrative, scrollytelling case study with tasteful parallax and editorial typography.",
    tags: ["Story", "Framer Motion"],
    heroImage: "/case-study-hero.jpg",
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
