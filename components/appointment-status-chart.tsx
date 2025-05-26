"use client";

import {  RiCheckboxCircleFill,  RiCloudFill,  RiMapPin2Fill,  RiTimeFill,} from '@remixicon/react';
import { Tracker } from '@tremor/react';
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/tremor/card";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const datatracker = [
  {    tooltip: '23 Sep, 2023',    status: 'Operational',  },  {    tooltip: '24 Sep, 2023',    status: 'Operational',  },  {    tooltip: '25 Sep, 2023',    status: 'Operational',  },  {    tooltip: '26 Sep, 2023',    status: 'Operational',  },  {    tooltip: '27 Sep, 2023',    status: 'Operational',  },  {    tooltip: '28 Sep, 2023',    status: 'Operational',  },  {    tooltip: '29 Sep, 2023',    status: 'Downtime',  },  {    tooltip: '30 Sep, 2023',    status: 'Operational',  },  {    tooltip: '1 Oct, 2023',    status: 'Operational',  },  {    tooltip: '2 Oct, 2023',    status: 'Operational',  },  {    tooltip: '3 Oct, 2023',    status: 'Operational',  },  {    tooltip: '4 Oct, 2023',    status: 'Operational',  },
];
const colorMapping = {  Operational: 'emerald-500',  Downtime: 'red-500',  Inactive: 'gray-300',};
const combinedData = datatracker.map((item) => {  return {    ...item,    color: colorMapping[item.status],  };});

type AppointmentStats = {
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
};

export function AppointmentOverview() {
  const [stats, setStats] = useState<AppointmentStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const data = await getRecentAppointmentList();
      setStats(data);
    }
    fetchStats();
  }, []);

  if (!stats) return null;

  const { totalCount, scheduledCount, pendingCount, cancelledCount } = stats;

  const total = scheduledCount + pendingCount + cancelledCount;
  const scheduled = Math.round((scheduledCount / totalCount) * 100);
  const pending = Math.round((pendingCount / totalCount) * 100);
  const cancelled = Math.round((cancelledCount / totalCount) * 100);

  const data = [
    { label: "Scheduled", value: scheduled, color: "bg-green-500" },
    { label: "Pending", value: pending, color: "bg-gray-400" },
    { label: "Cancelled", value: cancelled, color: "bg-red-400" },
  ];

  return (
    <>
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 p-6">
          <dt className="text-sm font-medium text-gray-400">
            Current Appointments
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-400">{total}</dd>

          {/* Custom multi-color progress bar */}
          <div className="mt-6 flex h-4 w-full overflow-hidden rounded">
            {data.map((item) => (
              <div
                key={item.label}
                className={item.color}
                style={{ flexGrow: item.value, flexBasis: 0 }}
              />
            ))}
          </div>

          {/* Legend */}
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            {data.map((item) => (
              <li key={item.label}>
                <span className="text-base font-semibold text-gray-400">
                  {item.value}%
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`size-2.5 shrink-0 rounded-sm ${item.color}`}
                  />
                  <span className="text-sm text-gray-400">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="sm:mx-auto sm:max-w-xl">   
         <div className="flex space-x-3">
           <span 
            className="w-1 shrink-0 rounded bg-emerald-500" 
             aria-hidden={true} 
             /> 
              <div> 
                 <div className="flex items-center space-x-1.5">   
                  
                   <RiCheckboxCircleFill         
                             className="size-5 shrink-0 text-emerald-500"  aria-hidden={true} />
                             <span className="text-tremor-default font-medium text-emerald-500">
                              Operational 
                              </span>
                              </div> 
                              <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong mt-2 font-medium">
                                Emma&#39;s Online-Shop 
                                </h3>
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                  <span tabIndex="1" className="rounded-tremor-small bg-tremor-background-subtle text-tremor-label text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content inline-flex items-center gap-1.5 px-2.5 py-1 font-medium">
                                    <RiMapPin2Fill className="-ml-0.5 size-4 shrink-0" aria-hidden={true}/>
                                    US-East 1
                                    </span>
                                    <span tabIndex="1" className="rounded-tremor-small bg-tremor-background-subtle text-tremor-label text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content inline-flex items-center gap-1.5 px-2.5 py-1 font-medium"> 
                                      <RiCloudFill className="-ml-0.5 size-4 shrink-0"  aria-hidden={true} /> 
                                       Synced 
                                       </span>
                                       <span tabIndex="1"  className="rounded-tremor-small bg-tremor-background-subtle text-tremor-label text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content inline-flex items-center gap-1.5 px-2.5 py-1 font-medium"> 
                                        <RiTimeFill className="-ml-0.5 size-4 shrink-0" aria-hidden={true} />
                                        Last run: 23/12/23 14:01 
                                        </span>
                                        </div>
                                        </div>
                                        </div> 
                                         <Tracker data={combinedData.slice(30, 90)} className="mt-6 hidden sm:flex" /> 
                                         <Tracker 
                                          data={combinedData.slice(60, 90)}
                                          className="mt-6 flex sm:hidden"  />
                      <div className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-3 flex items-center justify-between"> 
                        <span className="hidden sm:block">60 days ago</span> 
                        <span className="sm:hidden">30 days ago</span>
                        <span>Today</span> 
                        </div> 
                        </Card>

      </dl>
    </>
  );
}
