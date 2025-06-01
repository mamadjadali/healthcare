import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  let appointment;

  try {
    appointment = await getAppointment(appointmentId);
  } catch (error) {
    toast.error("Error fetching appointment details. Please try again later.");
    return (
      <div>Error fetching appointment details. Please try again later.</div>
    );
  }

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/images/logo-typo.svg"
            height={81}
            width={361}
            alt="logo"
            className="mb-8 h-14 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center gap-4">
          <Image
            src="/assets/images/Success.svg"
            height={100}
            width={100}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center text-dark-700">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-dark-700">
            We&apos;ll be in touch shortly to confirm.
          </p>
        </section>

        <section className="request-details text-dark-700">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <div className="flex gap-4">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>

          <Button variant="ghost" className="text-gray-400" asChild>
            <Link href={`/patients/${userId}/onboarding`}>Back</Link>
          </Button>
        </div>

        <p className="copyright">© 2024 Doxset</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
