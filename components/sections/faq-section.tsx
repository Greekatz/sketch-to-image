import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about Sketch</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the free trial work?</AccordionTrigger>
              <AccordionContent>
                Our free trial gives you full access to all Pro features for 14 days. No credit card required. At the
                end of your trial, you can choose to subscribe or downgrade to the Free plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I change plans later?</AccordionTrigger>
              <AccordionContent>
                Yes, you can upgrade, downgrade, or cancel your plan at any time. When upgrading, you'll be prorated for
                the remainder of your billing cycle. When downgrading, the new plan will take effect at the end of your
                current billing cycle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and for annual Enterprise
                plans, we can also accommodate bank transfers and purchase orders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How does team billing work?</AccordionTrigger>
              <AccordionContent>
                For team plans, you're billed based on the number of active users in your workspace. You can add or
                remove users at any time, and your billing will adjust accordingly at the start of the next billing
                cycle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Do you offer discounts for nonprofits or educational institutions?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer special pricing for verified nonprofit organizations, educational institutions, and
                student design teams. Please contact our sales team for more information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What happens to my designs if I cancel?</AccordionTrigger>
              <AccordionContent>
                If you cancel your subscription, you'll have 30 days to export your designs. After that, your account
                will be downgraded to the Free plan, and you'll only have access to the number of projects allowed under
                that plan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

