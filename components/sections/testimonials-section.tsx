import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by designers worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our users are saying about their experience with Sketch
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Testimonial
            quote="Sketch has completely transformed how our team approaches design. What used to take days now takes hours."
            author="Jordan Lee"
            company="Design Lead at Acme Inc."
          />
          <Testimonial
            quote="The AI features are mind-blowing. I described what I wanted, and Sketch generated a perfect starting point that I could refine."
            author="Casey Taylor"
            company="Freelance UI Designer"
          />
          <Testimonial
            quote="As a developer, I love that I can export production-ready code directly from designs. It's cut our implementation time in half."
            author="Morgan Smith"
            company="Senior Frontend Developer"
          />
        </div>
      </div>
    </section>
  )
}

interface TestimonialProps {
  quote: string
  author: string
  company: string
}

export function Testimonial({ quote, author, company }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M11.28 3.22a.75.75 0 0 1 0 1.06L4.56 11h8.69a.75.75 0 0 1 0 1.5H4.56l6.72 6.72a.75.75 0 1 1-1.06 1.06L2.47 12.53a.75.75 0 0 1 0-1.06l7.75-7.75a.75.75 0 0 1 1.06 0zm10 0a.75.75 0 0 1 0 1.06L14.56 11h8.69a.75.75 0 0 1 0 1.5h-8.69l6.72 6.72a.75.75 0 1 1-1.06 1.06l-7.75-7.75a.75.75 0 0 1 0-1.06l7.75-7.75a.75.75 0 0 1 1.06 0z" />
          </svg>
        </div>
        <p className="flex-1 text-lg italic">{quote}</p>
        <div className="mt-6">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
      </CardContent>
    </Card>
  )
}

