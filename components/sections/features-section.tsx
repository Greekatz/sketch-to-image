import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful features for modern designers</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to create exceptional user experiences
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <FeatureItem
              badge="AI-Powered"
              title="Magic Design Assistant"
              description="Describe what you want, and watch as our AI generates complete designs based on your requirements. Refine with natural language for the perfect result."
            />
            <FeatureItem
              badge="Collaboration"
              title="Real-time Co-creation"
              description="Work together with your team in real-time, with smart commenting, version control, and role-based permissions that keep everyone in sync."
            />
            <FeatureItem
              badge="Integration"
              title="Seamless Workflow"
              description="Connect with your favorite tools like Figma, Adobe XD, and development frameworks for a frictionless design-to-development pipeline."
            />
          </div>
          <div className="relative rounded-xl border bg-muted/30 p-2">
            <Image
              src="/placeholder.svg?height=600&width=800"
              width={800}
              height={600}
              alt="Sketch features showcase"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureItemProps {
  badge: string
  title: string
  description: string
}

function FeatureItem({ badge, title, description }: FeatureItemProps) {
  return (
    <div className="space-y-2">
      <Badge variant="outline" className="w-fit">
        {badge}
      </Badge>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

