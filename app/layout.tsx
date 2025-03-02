import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import MouseMoveEffect from "@/components/mouse-move-effect";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sketchy",
  description: "To be updated",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ClerkProvider>
          <ConvexClientProvider>
            {/* Header with Clerk Authentication */}
            <header className="flex justify-between items-center p-4 border-b">
              <h1 className="text-xl font-bold">Sketchy</h1>
              <nav className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </nav>
            </header>

            {/* Mouse Effect */}
            <MouseMoveEffect />

            {/* Main Content */}
            <main>{children}</main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
