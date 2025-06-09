"use client";

import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { getTimeSettings, updateTimeSettings } from "@/lib/actions/time-settings.actions";

const DEFAULT_TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export function TimeSettingsSheet() {
  const [timeSlots, setTimeSlots] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTimeSettings();
  }, []);

  const fetchTimeSettings = async () => {
    try {
      setIsLoading(true);
      const settings = await getTimeSettings();
      
      if (settings) {
        const enabledSlots = settings.timeSlots;
        const slotsState = DEFAULT_TIME_SLOTS.reduce((acc, slot) => {
          acc[slot] = enabledSlots.includes(slot);
          return acc;
        }, {} as Record<string, boolean>);
        setTimeSlots(slotsState);
      } else {
        // Initialize with all slots enabled if no settings exist
        const initialSlots = DEFAULT_TIME_SLOTS.reduce((acc, slot) => {
          acc[slot] = true;
          return acc;
        }, {} as Record<string, boolean>);
        setTimeSlots(initialSlots);
      }
    } catch (error) {
      console.error("Error fetching time settings:", error);
      toast.error("Failed to load time settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeToggle = async (timeSlot: string) => {
    try {
      const newTimeSlots = {
        ...timeSlots,
        [timeSlot]: !timeSlots[timeSlot],
      };
      setTimeSlots(newTimeSlots);

      const enabledSlots = Object.entries(newTimeSlots)
        .filter(([_, enabled]) => enabled)
        .map(([slot]) => slot);

      await updateTimeSettings(enabledSlots);
      toast.success("Time settings updated successfully");
    } catch (error) {
      console.error("Error updating time settings:", error);
      toast.error("Failed to update time settings");
      // Revert the toggle if update fails
      setTimeSlots(timeSlots);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-sm text-gray-400">
          <Clock className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 text-gray-400">
        <SheetHeader>
          <SheetTitle>Time Settings</SheetTitle>
          <SheetDescription>
            Configure available time slots for appointments
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {DEFAULT_TIME_SLOTS.map((timeSlot) => (
            <div
              key={timeSlot}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span className="font-medium">{timeSlot}</span>
              <Switch
                checked={timeSlots[timeSlot] ?? false}
                onCheckedChange={() => handleTimeToggle(timeSlot)}
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
} 