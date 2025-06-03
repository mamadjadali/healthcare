import { ArrowLeftIcon, CircleFadingPlus } from "lucide-react";
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
        {/* <Link href="/">
          <Image
            src="/assets/images/logo-typo.svg"
            height={81}
            width={361}
            alt="logo"
            className="mb-8 h-14 w-fit"
          />
        </Link> */}

        <section className="flex flex-col items-center gap-4">
          {/* <Image
            src="/assets/images/Success.svg"
            height={100}
            width={100}
            alt="success"
            className="animate-pulse"
          /> */}
          <span className="relative mb-4 flex size-10">  
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-10 rounded-full bg-green-500"></span>
            </span>
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
          <Button variant="ghost" className="group items-center justify-center text-gray-400 hover:bg-transparent hover:text-gray-400">
            <ArrowLeftIcon
              className="-ms-1 mr-1 opacity-60 transition-transform group-hover:-translate-x-2"
              size={16}
              aria-hidden="true"
            />
            <Link href={`/patients/${userId}/onboarding`}>Back</Link>
          </Button>
          <Button variant="outline" className="shad-primary-btn items-center rounded-xl">
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
            <CircleFadingPlus className="mx-2" />
          </Button>

        </div>

        <p className="copyright">© 2024 Doxset</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
