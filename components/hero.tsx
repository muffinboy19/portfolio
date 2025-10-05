"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { Button } from "@/components/ui/button"
import { RoleRotator } from "./role-rotator"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

export function Hero() {
  return (
    <Section id="top" className="relative pt-12 md:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid gap-8 md:grid-cols-2"
      >
        <div className="space-y-6">
          <h1 className="font-serif text-6xl font-extrabold md:text-7xl lg:text-8xl py-0">
            {"Hi, I'm "}
            <span className="bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] bg-clip-text text-transparent">
              Gaurav
            </span>
            <span className="text-white">.</span>
          </h1>
          <p className="text-pretty text-muted-foreground md:text-lg">
            <span className="sr-only">Roles:</span>
            <RoleRotator roles={["Backend Developer", "Android Developer", "Problem Solver"]} />
          </p>
          <p className="text-pretty text-muted-foreground md:text-lg">
            I design and build accessible, performant web experiences with delightful micro-interactions. Currently
            available for select projects and collaborations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#work" aria-label="See selected work">
                See work
              </a>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" aria-label="Contact me">
                  Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background shadow-lg border border-border/50">
                <DialogHeader>
                  <DialogTitle>Contact Gaurav Chhetri</DialogTitle>
                  <DialogDescription>
                    I'm always open to new opportunities and collaborations. Feel free to reach out!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="text-right text-muted-foreground">Email:</p>
                    <p className="col-span-3">gaurav.chhetri@example.com</p> {/* Replace with actual email */}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="text-right text-muted-foreground">LinkedIn:</p>
                    <a href="https://www.linkedin.com/in/gauravchhetri" target="_blank" rel="noopener noreferrer" className="col-span-3 text-blue-400 hover:underline">
                      linkedin.com/in/gauravchhetri
                    </a>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="text-right text-muted-foreground">GitHub:</p>
                    <a href="https://github.com/muffinboy19" target="_blank" rel="noopener noreferrer" className="col-span-3 text-blue-400 hover:underline">
                      github.com/muffinboy19
                    </a>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => window.open('mailto:gaurav.chhetri@example.com', '_blank')}>Send Email</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative rounded-xl border border-border bg-card/60 p-4 md:p-6 flex justify-center items-center">
          <div
            className="w-full rounded-lg bg-muted/40 ring-1 ring-border overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src="/images/profile_pic.jpg"
              alt="Gaurav Chhetri"
              layout="responsive"
              width={16}
              height={9}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
