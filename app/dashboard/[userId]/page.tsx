"use client"; // Marking this as a Client Component

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import UserSetting from "@/components/UserSetting"; // Ensure the path is correct
import { getPatientAppointments } from "@/lib/actions/patient.actions";
import { Appointment } from "@/types/appwrite.types";

interface PatientDashboardProps {
  params: {
    userId: string; // Define the type for userId
  };
}

const PatientDashboard = ({ params }: PatientDashboardProps) => {
  const { userId } = params; // Get userId from params

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (userId) {
        try {
          const fetchedAppointments = await getPatientAppointments(userId);
          setAppointments(fetchedAppointments);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    ); // Optional loading state
  }

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/Doxset.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>

          <UserSetting />
          {/* <p className="text-16-semibold">Patient Dashboard</p> */}
        </header>

        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋🏻</h1>
            <p className="text-dark-700">Your Appointment History</p>
          </section>
          {/* <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section> */}
        </main>
      </div>

      <div className="mx-auto max-w-7xl p-2 md:p-12">
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden border-collapse overflow-hidden rounded-xl bg-white shadow-md md:table md:min-w-full">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {appointments.map((appointment) => (
                <tr
                  key={appointment.$id}
                  className="transition-colors duration-150 hover:bg-gray-100"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-800">
                    {new Date(appointment.schedule).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {appointment.primaryPhysician}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {appointment.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {appointment.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card Layout */}
          <div className="mt-4 block md:hidden">
            {appointments.map((appointment) => (
              <div
                key={appointment.$id}
                className="mb-4 rounded-lg border bg-white p-4 shadow-md"
              >
                <div className="flex justify-between">
                  <div className="text-sm text-gray-800">
                    {new Date(appointment.schedule).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-800">
                    {appointment.status}
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="text-sm text-gray-800">
                    Doctor: {appointment.primaryPhysician}
                  </div>
                  <div className="text-sm text-gray-800">
                    Reason: {appointment.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
