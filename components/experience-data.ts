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
    "title": "Backend Developer Intern",
    "subtitle": "DealShare",
    "period": "Jan 2026 – Present",
    "description": "• Solely engineered an end-to-end warehouse replenishment system across 11 Spring Boot REST APIs built with Maven, handling 48k+ production requests at <0.1% error rate within a microservices architecture.\n• Built a product recommendation engine using collaborative and content-based filtering on cleaned transactional data; integrated Elasticsearch for SKU/UPC lookup and Redis caching backed by a dynamic UI.\n• Resolved 3 production bugs via Datadog on-call monitoring and engineered 4 CRON jobs for inventory sync, ensuring concurrency safety using optimistic locking and Memcached distributed locks.",
    "tags": ["Spring Boot", "REST APIs", "Microservices", "Elasticsearch", "Redis", "Datadog"]
  },
  {
    "id": "exp-2",
    "title": "Software Developer Intern",
    "subtitle": "GleoAI",
    "period": "May 2025 – Jul 2025",
    "description": "• Fine-tuned Whisper-base (seq2seq, 20 epochs), used Sarvam AI for realtime NLP language suggestions.\n• Built 6 Flutter/Dart screens with REST API integration and state management via dynamic widgets.\n• Integrated Glide caching and Kotlin Coroutines across 3 async workflows, eliminating redundant calls.",
    "tags": ["Whisper", "Sarvam AI", "Flutter", "Dart", "REST APIs", "Kotlin Coroutines"]
  },
  {
    "id": "exp-4",
    "title": "Mentor",
    "subtitle": "OpenCode",
    "period": "Dec 2023 – Jan 2024",
    "description": "• Mentored 200+ contributors across 4 repositories, reviewed and merged 582 PRs, and resolved 189 issues.\n• Maintained repos with 41 stars and 228 forks, increasing test coverage by 25% across active codebases.",
    "tags": ["Open Source", "Git", "Code Review", "Mentorship"]
  },
  {
    "id": "exp-5",
    "title": "App Wing Coordinator",
    "subtitle": "GeekHaven, IIIT Allahabad",
    "period": "2024 – Present",
    "description": "• Directed Android wing, managing 3 production apps end-to-end, mentoring 50+ students, and introducing scalable architecture practices across all projects.",
    "tags": ["Leadership", "Android", "Mentorship", "Architecture"]
  },
  {
    "id": "exp-5",
    "title": "Teaching Assistant",
    "subtitle": "IIT Kanpur — Basics of Android Development",
    "period": "2025",
    "description": "• Guided 50+ students in Android development, debugging, and backend integration, earning 95% positive feedback.",
    "tags": ["Android", "Teaching", "Debugging", "Backend Integration"]
  }
]
