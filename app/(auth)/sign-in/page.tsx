"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/sketches"); 
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}
