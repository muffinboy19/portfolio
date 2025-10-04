import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Sora } from "next/font/google"
import "./globals.css"
import HireMeBar from "@/components/hire-me-bar"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${sora.variable} antialiased`}>
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <HireMeBar />
        <Analytics />
      </body>
    </html>
  )
}
