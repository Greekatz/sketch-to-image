import { Brain, Cloud, Shield, Zap } from "lucide-react"

const features = [
  {
    name: "AI Sketch Recognition",
    description: "Our AI understands and enhances your sketches with precision.",
    icon: Brain,
  },
  {
    name: "Cloud-Native Architecture",
    description: "Scalable, resilient, and efficient solutions built for the modern cloud ecosystem.",
    icon: Cloud,
  },
  {
    name: "Secure and Private",
    description: "Your sketches remain yours—100% secure and private.",
    icon: Shield,
  },
  {
    name: "Lightning-Fast Rendering",
    description: "Transform your sketches into high-quality images in seconds.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">AI-Powered Sketch Transformation</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Experience the future of creativity with AI-driven sketch-to-image technology.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

