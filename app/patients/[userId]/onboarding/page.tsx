"use client"
import Link from "next/Link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

import { Button } from "@/components/ui/tremor/Button"
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@/components/ui/tremor/RadioCardGroup"

const employeeCounts = [
  { url: "register", label: "Register Medical Info" },
  { url: "new-appiontment", label: "Make a New Appointment" },
  { url: "dashboard", label: "Go to your Dashboard - Overview of appointments" },
]

export default function Onboarding({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const [selectedRoute, setSelectedRouteCount] = useState("")
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!selectedRoute) return;

    setLoading(true);
    const targetUrl= `/patients/${userId}/${selectedRoute}`;
    setTimeout(() => {
    router.push(targetUrl);
  }, 600);
  }

  return (
    <main className="mx-auto p-4">
      <div
        className="motion-safe:animate-revealBottom"
        style={{ animationDuration: "500ms" }}
      >
        <h1 className="text-2xl font-semibold text-gray-300 sm:text-xl">
          What Do You Wanna Do?
        </h1>
        <p className="mt-6 text-gray-400 sm:text-sm">
          This will help us customize the experience to you.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <fieldset>
          <legend className="sr-only">Select number of employees</legend>
          <RadioCardGroup
            value={selectedRoute}
            onValueChange={(value) => setSelectedRouteCount(value)}
            required
            aria-label="route choice"
          >
            {employeeCounts.map((count, index) => (
              <div
                className="motion-safe:animate-revealBottom"
                key={count.url}
                style={{
                  animationDuration: "600ms",
                  animationDelay: `${100 + index * 50}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <RadioCardItem
                  className="bg-transparent"
                  key={count.url}
                  value={count.url}
                  style={{
                    animationDuration: "600ms",
                    animationDelay: `${100 + index * 50}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <RadioCardIndicator />
                    <span className="block sm:text-sm">{count.label}</span>
                  </div>
                </RadioCardItem>
              </div>
            ))}
          </RadioCardGroup>
        </fieldset>
        <div className="mt-6 flex justify-between">
          <Button type="button" variant="ghost" asChild>
            <Link href="/">Back</Link>
          </Button>
          <Button
            className="disabled:bg-gray-200 disabled:text-gray-500"
            type="submit"
            disabled={!selectedRoute || loading}
            aria-disabled={!selectedRoute || loading}
            isLoading={loading}
          >
            {loading ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </form>
    </main>
  )
}
