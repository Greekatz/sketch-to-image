import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the perfect plan for your design needs</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Free Plan */}
          <PricingCard
            title="Free"
            description="Perfect for trying out Sketch"
            price="$0"
            duration="/month"
            features={[
              "5 design projects",
              "Basic components",
              "Export to PNG/JPG",
              "7-day history",
              "Community support",
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
          />

          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            description="For professional designers"
            price="$19"
            duration="/month"
            popular={true}
            features={[
              "Unlimited projects",
              "Advanced components",
              "Export to all formats",
              "AI design assistant (limited)",
              "Code export (HTML/CSS)",
              "30-day history",
              "Priority support",
            ]}
            buttonText="Start Free Trial"
            buttonVariant="default"
          />

          {/* Enterprise Plan */}
          <PricingCard
            title="Enterprise"
            description="For design teams and organizations"
            price="$49"
            duration="/user/month"
            features={[
              "Everything in Pro",
              "Team collaboration",
              "Design system tools",
              "Unlimited AI design assistant",
              "Advanced code export (React, Vue)",
              "Unlimited history",
              "Custom integrations",
              "Dedicated support",
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
          />
        </div>

        <div className="mt-16">
          <FeatureComparisonTable />
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">Need something custom?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer custom plans for larger teams and specific requirements. Contact our sales team to discuss your
            needs.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  popular?: boolean
}

function PricingCard({
  title,
  description,
  price,
  duration,
  features,
  buttonText,
  buttonVariant,
  popular = false,
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${popular ? "border-primary shadow-lg relative" : ""}`}>
      {popular && <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">Most Popular</Badge>}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{duration}</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

function FeatureComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-4 text-left font-medium">Feature</th>
            <th className="py-4 px-4 text-center font-medium">Free</th>
            <th className="py-4 px-4 text-center font-medium">Pro</th>
            <th className="py-4 px-4 text-center font-medium">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <FeatureRow
            feature="Projects"
            free="5 projects"
            pro="Unlimited"
            enterprise="Unlimited"
            tooltip="Design projects you can create and save"
          />
          <FeatureRow
            feature="Team members"
            free="1 user"
            pro="1 user"
            enterprise="Unlimited"
            tooltip="Number of team members who can access your workspace"
          />
          <FeatureRow
            feature="Storage"
            free="100MB"
            pro="10GB"
            enterprise="100GB"
            tooltip="Cloud storage for your design assets"
          />
          <FeatureRow
            feature="Version history"
            free="7 days"
            pro="30 days"
            enterprise="Unlimited"
            tooltip="How long we keep your design history"
          />
          <FeatureRow
            feature="AI design assistant"
            free="❌"
            pro="Limited (100/mo)"
            enterprise="Unlimited"
            tooltip="AI-powered design suggestions and generation"
          />
          <FeatureRow
            feature="Code export"
            free="❌"
            pro="HTML/CSS"
            enterprise="All frameworks"
            tooltip="Export your designs as production-ready code"
          />
          <FeatureRow
            feature="Design system tools"
            free="❌"
            pro="Basic"
            enterprise="Advanced"
            tooltip="Tools to create and manage design systems"
          />
          <FeatureRow
            feature="Collaboration"
            free="❌"
            pro="Basic"
            enterprise="Advanced"
            tooltip="Real-time collaboration features"
          />
          <FeatureRow
            feature="Support"
            free="Community"
            pro="Priority"
            enterprise="Dedicated"
            tooltip="Level of customer support"
          />
        </tbody>
      </table>
    </div>
  )
}

interface FeatureRowProps {
  feature: string
  free: string
  pro: string
  enterprise: string
  tooltip: string
}

function FeatureRow({ feature, free, pro, enterprise, tooltip }: FeatureRowProps) {
  return (
    <TooltipProvider>
      <tr className="border-b">
        <td className="py-4 px-4">
          <div className="flex items-center gap-1">
            {feature}
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </td>
        <td className="py-4 px-4 text-center">{free}</td>
        <td className="py-4 px-4 text-center">{pro}</td>
        <td className="py-4 px-4 text-center">{enterprise}</td>
      </tr>
    </TooltipProvider>
  )
}

