"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      {/* Show "Log in" and "Get Started" only when signed out */}
      <SignedOut>
        <SignInButton>
          <Button variant="ghost" className="text-sm font-medium hover:text-primary">
            Log in
          </Button>
        </SignInButton>
        <Button asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </SignedOut>

      {/* Show UserButton when signed in */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
