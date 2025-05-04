"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4" variant="outline">
            Introducing Sketch
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Design with <span className="text-primary">magic</span>, deliver with confidence
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Sketch transforms your design workflow with AI-powered tools that help you create stunning interfaces in
            minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2" 
              onClick={() => router.push("/sketches")}
            >
              <Sparkles className="h-4 w-4" />
              Start designing for free
            </Button>
            <Button size="lg" variant="outline">
              Watch demo
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="relative w-full max-w-5xl rounded-xl border bg-background/50 shadow-xl">
          <Image
            src="/placeholder.svg?height=720&width=1280"
            width={1280}
            height={720}
            alt="Sketch dashboard preview"
            className="rounded-xl"
            priority
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}
