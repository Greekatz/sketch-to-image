import { Logo } from "@/components/layout/logo"
import { Navbar } from "@/components/layout/navbar"
import { AuthButtons } from "@/components/layout/auth-buttons"
import { MobileMenu } from "@/components/layout/mobile-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <Navbar />
        <div className="flex items-center">
          <div className="hidden md:block">
            <AuthButtons />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

