"use client"
import React from "react"

import { Logo } from "@/components/ui/Logo"
import { Button } from "@/components/ui/tremor/Button"
import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"


// interface Step {
//   name: string
//   href: string
// }

// const steps: Step[] = [
//   { name: "Product selection", href: "/onboarding/product" },
//   { name: "Employees", href: "/onboarding/employees" },
//   { name: "Infrastructure", href: "/onboarding/infrastructure" },
// ]

// interface StepProgressProps {
//   steps: Step[]
// }

const StepProgress = () => {
  return (
    <div aria-label="Onboarding progress">
      <ol className="mx-auto flex w-24 flex-nowrap gap-1 md:w-fit">
          <li
            className="h-1 w-12 rounded-full bg-gray-300">
          </li>
      </ol>
    </div>
  )
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const scrolled = useScroll(15)

  return (
    <>
      <header
        className={cx(
          "sticky inset-x-0 top-0 isolate z-50 flex items-center justify-between border-b border-gray-400 bg-transparent px-4 transition-all md:grid md:grid-cols-[200px_auto_200px] md:px-6",
          scrolled ? "h-12" : "h-20",
        )}
      >
          <Logo
            className="w-32 p-px"
            aria-hidden="true"
          />
        <StepProgress/>
        <Button variant="ghost" className="ml-auto w-fit" asChild>
          <a href="/reports">Skip to dashboard</a>
        </Button>
      </header>
      <main id="main-content" className="mx-auto mb-20 mt-28 max-w-lg">
        {children}
      </main>
    </>
  )
}

export default Layout
