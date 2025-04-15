import { Button } from "~/components/ui/button"

import type { Route } from "./+types/home"
import { Hero1 } from "~/customComponents/hero"
import { Navbar } from "~/customComponents/navbar"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero1
      badge="✨ Your Website Builder"
      heading="Blocks Built With Shadcn & Tailwind"
      description="Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project."
      buttons={{
        primary: {
          text: "Discover all components",
          url: "https://www.shadcnblocks.com"
        },
        secondary: {
          text: "View on GitHub",
          url: "https://github.com/shadcn/ui"
        }
      }}
      image={{
        src: "/hero-image.jpg",
        alt: "Hero section demo image"
      }}
    />
    </>
    // <div className="flex flex-col items-center justify-center min-h-svh">
    //   <Button>Click me</Button>
    // </div>
  )
}
