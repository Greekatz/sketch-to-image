import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Layers, Code } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Sketch solves your design challenges</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From concept to production, Sketch streamlines your entire design process
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-primary" />}
            title="Rapid Prototyping"
            description="Turn ideas into interactive prototypes in minutes with AI-assisted design tools and pre-built components."
          />
          <FeatureCard
            icon={<Layers className="h-6 w-6 text-primary" />}
            title="Design System Management"
            description="Create, maintain, and evolve your design system with smart components that adapt to your brand guidelines."
          />
          <FeatureCard
            icon={<Code className="h-6 w-6 text-primary" />}
            title="Code Generation"
            description="Export production-ready code directly from your designs, eliminating the handoff gap between design and development."
          />
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-background/60 backdrop-blur">
      <CardContent className="pt-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

