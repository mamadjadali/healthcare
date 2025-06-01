"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/tremor/Button";
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@/components/ui/tremor/RadioCardGroup";

const employeeCounts = [
  { url: "/new-appointment", label: "New Appointment" },
  { url: "/dashboard", label: "View Recent Appiontment" },
  { url: "/", label: "Contact The Reception (Emergency)" },
];

export default function RouteChoose() {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/patients/${userId}${selectedRoute}`);
    }, 600);
  };

  return (
    <section className="mx-auto max-w-2xl p-4">
      <div
        className="motion-safe:animate-revealBottom"
        style={{ animationDuration: "500ms" }}
      >
        <h1 className="mb-6 text-2xl font-semibold text-gray-50 sm:text-xl">
          Where do you want to go?
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <fieldset>
          <legend className="sr-only">Select number of employees</legend>
          <RadioCardGroup
            value={selectedRoute}
            onValueChange={(value) => setSelectedRoute(value)}
            required
            aria-label="Routes"
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
                  className="active:scale-[99%]"
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
        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            className="disabled:bg-gray-300 disabled:text-gray-600"
            type="submit"
            disabled={!selectedRoute || loading}
            aria-disabled={!selectedRoute || loading}
            isLoading={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </form>
    </section>
  );
}
