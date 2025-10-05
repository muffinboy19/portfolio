import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Sora, Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
})
import HireMeBar from "@/components/hire-me-bar"
import { Nav } from "@/components/nav" // Import the Nav component
import { PageLoader } from "@/components/page-loader" // Import the PageLoader component

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
    <html lang="en" className={`dark ${GeistSans.variable} ${sora.variable} ${poppins.variable} antialiased`}>
      <body className="font-sans">
        <PageLoader /> {/* Render the PageLoader component */}
        <Nav /> {/* Render the Nav component */}
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
