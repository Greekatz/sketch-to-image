import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] bg-fixed" />
        <div className="absolute h-40 w-40 rounded-full bg-primary/10 -top-20 -left-20 blur-3xl" />
        <div className="absolute h-40 w-40 rounded-full bg-primary/10 -bottom-20 -right-20 blur-3xl" />
      </div>

      {/* Testimonial */}
      <div className="hidden lg:block absolute right-10 bottom-10 max-w-sm">
        <blockquote className="p-6 bg-black/40 backdrop-blur rounded-lg text-white">
          <p className="mb-4">"Sketchy has completely transformed our design workflow. What used to take days now takes hours."</p>
          <footer className="text-sm text-gray-300">
            — HCMIU.
          </footer>
        </blockquote>
      </div>

      {/* Clerk SignIn with custom appearance */}
      <SignIn 
        appearance={{
          elements: {
            rootBox: "relative z-10",
            card: "bg-white shadow-xl",
            headerTitle: "text-gray-900",
            headerSubtitle: "text-gray-600",
            socialButtonsBlockButton: "text-gray-900 border-gray-200 hover:bg-gray-50",
            dividerText: "text-gray-500",
            formFieldLabel: "text-gray-700",
            formFieldInput: "text-gray-900 border-gray-200",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            footerActionText: "text-gray-600",
            footerActionLink: "text-primary hover:text-primary/90",
            identityPreviewText: "text-gray-600",
            identityPreviewEditButton: "text-primary hover:text-primary/90",
          },
          layout: {
            socialButtonsPlacement: "top",
            socialButtonsVariant: "blockButton",
          },
        }}
      />
    </div>
  );
}
