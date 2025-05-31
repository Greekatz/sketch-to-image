import Image from "next/image"
import Link from "next/link"

export function TeamSection() {
  return (
    <section id="team" className="py-20 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet the team behind Sketchy</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A passionate group of designers and developers creating the future of design tools
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <TeamMember
            name="Nguyen Thanh Hung"
            role="Project Manager & Backend Developer"
            image="https://raw.githubusercontent.com/tabler/tabler-icons/v2.47.0/icons/info-circle.svg"
            twitter="hungnguyenarbeit1912"
            linkedin="hungnguyenarbeit1912"
          />
          <TeamMember
            name="Nguyen Trang Thien Huong"
            role="Front-end Developer & QC Tester"
            image="https://raw.githubusercontent.com/tabler/tabler-icons/v2.47.0/icons/info-circle.svg"
            twitter="nekonya"
            linkedin="nekoya"
          />
          <TeamMember
            name="Phan Duc ri"
            role="Front-end Developer & QC Tester"
            image="https://raw.githubusercontent.com/tabler/tabler-icons/v2.47.0/icons/info-circle.svg"
            twitter="bofan"
            linkedin="bofan"
          />
        </div>
      </div>
    </section>
  )
}

interface TeamMemberProps {
  name: string
  role: string
  image: string
  twitter: string
  linkedin: string
}

export function TeamMember({ name, role, image, twitter, linkedin }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 overflow-hidden rounded-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={120}
          height={120}
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-medium">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
      <div className="mt-3 flex gap-3">
        <Link href={`https://twitter.com/${twitter}`} className="text-muted-foreground hover:text-primary">
          <span className="sr-only">Twitter</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-twitter"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        </Link>
        <Link href={`https://linkedin.com/in/${linkedin}`} className="text-muted-foreground hover:text-primary">
          <span className="sr-only">LinkedIn</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-linkedin"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

