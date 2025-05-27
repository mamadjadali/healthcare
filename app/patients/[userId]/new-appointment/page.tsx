import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const authUser = await getUser(userId);
  const patient = await getPatient(authUser.$id);

  console.log("Auth user ID:", authUser.$id);
  console.log("Patient ID:", patient?.$id);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/images/logo-typo.svg"
            height={81}
            width={361}
            alt="logo"
            className="mx-auto mb-12 h-14 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id}
            userId={authUser.$id}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2025 Doxset</p>
        </div>
      </section>

      {/* <Image
        src="/assets/images/appointment-img.svg"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] rounded-l-3xl bg-bottom"
      /> */}
    </div>
  );
};

export default Appointment;
