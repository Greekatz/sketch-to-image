import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TeamSection } from "@/components/sections/team-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CTASection } from "@/components/sections/cta-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FAQSection } from "@/components/sections/faq-section"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TeamSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

