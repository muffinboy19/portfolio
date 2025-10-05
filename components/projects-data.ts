import { StaticImageData } from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string | StaticImageData
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  playstoreUrl?: string
  challenges?: { title: string; description: string }[]
  solutions?: { title: string; description: string }[]
}

export const projectsData: Project[] = [
  {
    "id": "project-orbit",
    "title": "ORBIT – Voice-Integrated AI Assistant",
    "description": "A multi-agent, voice-integrated assistant that automates 5+ workflows and enables real-time, interruptible voice conversations powered by Gemini API.",
    "image": "/images/orbit-thumbnail.jpg",
    "tags": ["Python", "Gemini API", "FastAPI", "SpeechRecognition"],
    "githubUrl": "https://github.com/automatefreely/ORBIT",
    "liveUrl": "https://orbit.example.com",
    "challenges": [
      {
        "title": "Real-time voice processing",
        "description": "Integrating real-time speech-to-text and text-to-speech with low latency for natural conversation flow."
      }
    ],
    "solutions": [
      {
        "title": "Optimized API calls",
        "description": "Utilized asynchronous programming and efficient audio chunking to minimize latency in Gemini API interactions."
      }
    ]
  },
  {
    "id": "project-asmita",
    "title": "Asmita App – Official Fest Application",
    "description": "A scalable festival management platform built with Node.js and Firebase, featuring secure JWT authentication, Redis caching, and Docker-based deployment.",
    "image": "/images/asmita-thumbnail.jpg",
    "tags": ["Node.js", "Firebase", "Redis", "Docker"],
    "githubUrl": "https://github.com/insanecoder02/Asmita-24",
    "liveUrl": "https://asmita.example.com",
    "challenges": [
      {
        "title": "Scalability for high traffic",
        "description": "Ensuring the platform could handle thousands of concurrent users during peak festival times without performance degradation."
      }
    ],
    "solutions": [
      {
        "title": "Redis caching and Docker",
        "description": "Implemented Redis for caching frequently accessed data and deployed with Docker for easy scaling and isolation."
      }
    ]
  },
  {
    "id": "project-bankingapi",
    "title": "Banking API – Payment System Backend",
    "description": "A modular, secure payment backend built with Express and JWT authentication. Includes concurrency-safe transaction management and robust error handling.",
    "image": "/images/bankingapi-thumbnail.jpg",
    "tags": ["Node.js", "Express", "SQLite", "JWT"],
    "githubUrl": "https://github.com/muffinboy19/payment-api",
    "liveUrl": "https://bankingapi.example.com",
    "challenges": [
      {
        "title": "Concurrency in transactions",
        "description": "Preventing race conditions and ensuring data integrity during simultaneous payment transactions."
      }
    ],
    "solutions": [
      {
        "title": "Database transactions and locking",
        "description": "Utilized SQLite's transaction capabilities and implemented optimistic locking for safe concurrent operations."
      }
    ]
  },
  {
    "id": "project-semanticsearch",
    "title": "Distributed Semantic Search Engine",
    "description": "A distributed search platform leveraging Lucene, Kafka, and Elasticsearch with semantic embeddings and vector-based retrieval for AI-driven search.",
    "image": "/images/semanticsearch-thumbnail.jpg",
    "tags": ["Java", "Lucene", "Kafka", "Elasticsearch", "MongoDB"],
    "githubUrl": "https://github.com/muffinboy19/semantic-search",
    "liveUrl": "https://semanticsearch.example.com",
    "challenges": [
      {
        "title": "Efficient semantic retrieval",
        "description": "Implementing fast and accurate semantic search across large datasets using vector embeddings."
      }
    ],
    "solutions": [
      {
        "title": "Elasticsearch and vector search",
        "description": "Integrated Elasticsearch with custom semantic embeddings for efficient vector-based similarity search."
      }
    ]
  },
  {
    "id": "project-sembreaker",
    "title": "Sembreaker – Academic Utility App",
    "description": "An academic utility app enabling note-sharing, authentication, and analytics integration with Firebase, achieving 1,000+ installs on the Play Store.",
    "image": "/images/sembreaker-thumbnail.jpg",
    "tags": ["Flutter", "Firebase"],
    "playstoreUrl": "https://play.google.com/store/apps/details?id=com.garnox.geekhaven&hl=en_IN",
    "liveUrl": "https://sembreaker.example.com",
    "challenges": [
      {
        "title": "Cross-platform compatibility",
        "description": "Ensuring consistent user experience and functionality across both Android and iOS devices."
      }
    ],
    "solutions": [
      {
        "title": "Flutter framework",
        "description": "Leveraged Flutter's single codebase for native performance and consistent UI on multiple platforms."
      }
    ]
  },
  {
    "id": "project-dodole",
    "title": "Dodole – Backend to Frontend Interface Generator",
    "description": "A developer tool that auto-generates front-end code from backend structures using schema mapping and component templates for rapid prototyping.",
    "image": "/images/dodole-thumbnail.jpg",
    "tags": ["Python", "Next.js", "TypeScript", "Django"],
    "githubUrl": "https://github.com/muffinboy19/dodole",
    "liveUrl": "https://dodole.example.com",
    "challenges": [
      {
        "title": "Dynamic code generation",
        "description": "Creating a robust system to dynamically generate correct and usable frontend code from backend schemas."
      }
    ],
    "solutions": [
      {
        "title": "Schema mapping and templates",
        "description": "Developed a flexible schema mapping system and component templates for accurate code generation."
      }
    ]
  },
  {
    "id": "project-lifted",
    "title": "Lifted – Kickstarter-Style Crowdfunding Platform",
    "description": "A Kickstarter-inspired crowdfunding platform enabling campaign creation, funding, and analytics, built using Django for backend and Next.js for frontend.",
    "image": "/images/lifted-thumbnail.jpg",
    "tags": ["Python", "Django", "Next.js", "PostgreSQL"],
    "githubUrl": "https://github.com/muffinboy19/lifted",
    "liveUrl": "https://lifted.example.com",
    "challenges": [
      {
        "title": "Secure payment integration",
        "description": "Implementing a secure and reliable payment gateway for crowdfunding transactions."
      }
    ],
    "solutions": [
      {
        "title": "Stripe API integration",
        "description": "Integrated Stripe API for secure payment processing and managed transactions with Django."
      }
    ]
  }
]
