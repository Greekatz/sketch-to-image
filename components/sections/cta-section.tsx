import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to transform your design workflow?</h2>
          <p className="mt-4 text-lg opacity-90">Join thousands of designers who are creating magic with Sketch</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Start your free trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
            >
              Schedule a demo
            </Button>
          </div>
          <p className="mt-4 text-sm opacity-80">No credit card required. 14-day free trial.</p>
        </div>
      </div>
    </section>
  )
}

