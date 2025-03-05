import Link from "next/link"

export function Navbar() {
  return (
    <nav className="hidden md:flex gap-6">
      <Link href="#features" className="text-sm font-medium hover:text-primary">
        Features
      </Link>
      <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
        How It Works
      </Link>
      <Link href="#team" className="text-sm font-medium hover:text-primary">
        Team
      </Link>
      <Link href="#pricing" className="text-sm font-medium hover:text-primary">
        Pricing
      </Link>
    </nav>
  )
}

