"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { getClinicSettings, updateClinicSettings } from "@/lib/actions/settings.actions";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function SettingsSheet() {
  const [workingDays, setWorkingDays] = useState<Record<string, boolean>>({
    Sunday: true,
    Monday: false,
    Tuesday: true,
    Wednesday: true,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getClinicSettings();
        if (settings?.workingDays) {
          const newWorkingDays = WEEKDAYS.reduce((acc, day) => {
            acc[day] = settings.workingDays.includes(day);
            return acc;
          }, {} as Record<string, boolean>);
          setWorkingDays(newWorkingDays);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");
      }
    };

    fetchSettings();
  }, []);

  const handleDayToggle = async (day: string) => {
    try {
      const newWorkingDays = {
        ...workingDays,
        [day]: !workingDays[day],
      };
      setWorkingDays(newWorkingDays);

      // Convert workingDays object to array of enabled days
      const enabledDays = Object.entries(newWorkingDays)
        .filter(([_, enabled]) => enabled)
        .map(([day]) => day);

      await updateClinicSettings(enabledDays);
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
      // Revert the toggle if update fails
      setWorkingDays((prev) => ({
        ...prev,
        [day]: !prev[day],
      }));
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-sm text-gray-400">
          <Calendar className="" />
          
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 text-gray-400">
        <SheetHeader>
          <SheetTitle>Working Days Settings</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between rounded-xl border border-gray-400 p-4"
            >
              <span className="text-sm text-gray-400">{day}</span>
              <Switch
                checked={workingDays[day]}
                onCheckedChange={() => handleDayToggle(day)}
              />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
} 