"use client"

import { useEffect, useState } from "react"

export default function ResumePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Or a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">My Resume</h1>
      <div className="w-full max-w-4xl h-[80vh] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <iframe
          src="/resume/backend_resumeV2.pdf" // Using the provided resume PDF name
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Gaurav's Resume"
        >
          This browser does not support PDFs. Please download the PDF to view it:{" "}
          <a href="/resume/backend_resumeV2.pdf">Download Resume</a>
        </iframe>
      </div>
    </div>
  )
}
