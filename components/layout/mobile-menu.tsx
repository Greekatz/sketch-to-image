"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 mt-10">
          <Link href="#features" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Features
          </Link>
          <Link href="#how-it-works" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            How It Works
          </Link>
          <Link href="#team" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Team
          </Link>
          <Link href="#pricing" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <div className="flex flex-col gap-4 mt-4">
            <Link href="/login" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Button onClick={() => setOpen(false)}>Get Started</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

