"use client";

import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";

const WORKING_DAYS = ["Sunday", "Tuesday", "Wednesday"] as const;

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
];

const dayNameToIndex = (dayName: string) =>
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayName);

function getNextDatesForWeekday(weekdayIndex: number, count = 3): Date[] {
  const dates: Date[] = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  while (dates.length < count) {
    if (date.getDay() === weekdayIndex && date >= new Date()) {
      dates.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

type Props = {
  onChange: (date: Date) => void;
};

export function AppointmentPickerSheet({ onChange }: Props) {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const dates = WORKING_DAYS.flatMap((day) =>
      getNextDatesForWeekday(dayNameToIndex(day), 3)
    );
    dates.sort((a, b) => a.getTime() - b.getTime());
    setAvailableDates(dates);
  }, []);

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;

    const [time, meridian] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "PM" && hours < 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    const fullDate = new Date(selectedDate);
    fullDate.setHours(hours, minutes, 0, 0);

    onChange(fullDate);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full items-center rounded-xl border-none bg-transparent">
          Pick Appointment
         <CircleFadingPlus className="ml-2"/>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] overflow-auto bg-[#09090b] sm:w-[500px]">
        <div className="p-4">
          <h3 className="mb-4 text-xl font-semibold text-gray-400">Select a Day</h3>
          <div className="mb-6 grid grid-cols-3 gap-3">
            {availableDates.map((date) => {
              const isSelected = selectedDate?.getTime() === date.getTime();
              const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
              const dayNum = date.getDate();
              const monthName = date.toLocaleDateString("en-US", { month: "short" });

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime("");
                  }}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border p-3
                    ${isSelected ? "border-2 border-green-400 bg-transparent text-green-400" : "border-gray-400 text-gray-400"}
                    hover:border-green-500 `}
                >
                  <span className="font-bold">{dayName}</span>
                  <span className="text-lg">{dayNum}</span>
                  <span className="text-sm">{monthName}</span>
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <>
              <h3 className="mb-3 text-xl font-semibold text-gray-400">Select a Time</h3>
              <ul
                className="grid grid-cols-3 gap-2 motion-safe:animate-revealBottom"
                style={{ animationDuration: "500ms" }}
              >
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <li key={time}>
                      <input
                        type="radio"
                        id={`time-${time}`}
                        name="time"
                        className="peer hidden"
                        checked={isSelected}
                        onChange={() => setSelectedTime(time)}
                      />
                      <label
                        htmlFor={`time-${time}`}
                        className={`block cursor-pointer rounded-lg border px-3 py-1 text-center text-sm
                          ${isSelected ? "border-2 border-green-400 bg-transparent text-green-400" : "border-gray-400 text-gray-400"}
                          hover:border-green-500 `}
                      >
                        {time}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

                </div>
          {/* <div className="mt-6 flex justify-between gap-4"> */}
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="w-full border-none bg-green-400 hover:bg-green-400 disabled:bg-transparent disabled:text-gray-400"
                variant="outline"
                disabled={!selectedDate || !selectedTime}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full border border-gray-400 text-gray-400">Cancel</Button>
            </SheetClose>
            </SheetFooter>
        {/* </div> */}
      </SheetContent>
    </Sheet>
  );
}