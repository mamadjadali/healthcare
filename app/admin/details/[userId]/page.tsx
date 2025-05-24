import { notFound } from "next/navigation";

import { getPatient } from "@/lib/actions/patient.actions";

type Params = {
  params: {
    userId: string;
  };
};

const Details = async ({ params }: Params) => {
  const patient = await getPatient(params.userId);

  if (!patient) return notFound();

  return (
    <div className="h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="mx-auto size-full max-w-[860px] justify-between py-8">
          {/* <pre>{JSON.stringify(patient, null, 2)}</pre> */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 ">
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2 md:col-span-1">
              <p className="text-gray-400">
                Name:{" "}
                <span className="pl-2 text-green-400">{patient.name}</span>
              </p>
            </div>
            <div className="m-4 whitespace-pre-wrap break-words rounded-xl border border-gray-400 px-4 py-2 md:col-span-2">
              <p className="text-gray-400">
                User ID:{" "}
                <span className="pl-2 text-green-400">{patient.userId}</span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Phone:{" "}
                <span className="pl-2 text-green-400">{patient.phone}</span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Gender:{" "}
                <span className="pl-2 text-green-400">{patient.gender}</span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2 md:col-span-2">
              <p className="text-gray-400">
                Email:{" "}
                <span className="pl-2 text-green-400">{patient.email}</span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2 md:row-span-2">
              <p className="text-gray-400">
                Address:{" "}
                <span className="pl-2 text-green-400">{patient.address}</span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Birth Date:{" "}
                <span className="pl-2 text-green-400">
                  {patient.birthDate.split("T")[0]}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Emergency Contact Name:{" "}
                <span className="pl-2 text-green-400">
                  {patient.emergencyContactName}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Emergency Contact Number:{" "}
                <span className="pl-2 text-green-400">
                  {patient.emergencyContactNumber}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Allergies:{" "}
                <span className="pl-2 text-green-400">{patient.allergies}</span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2 md:col-span-2">
              <p className="text-gray-400">
                Current Medication:{" "}
                <span className="pl-2 text-green-400">
                  {patient.currentMedication}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2 md:row-span-2">
              <p className="text-gray-400">
                Family Medical History:{" "}
                <span className="pl-2 text-green-400">
                  {patient.familyMedicalHistory}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2 md:col-span-3">
              <p className="text-gray-400">
                Past Medical History:{" "}
                <span className="pl-2 text-green-400">
                  {patient.pastMedicalHistory}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2 md:col-span-2">
              <p className="text-gray-400">
                Insurance Number:{" "}
                <span className="pl-2 text-green-400">
                  {patient.insurancePolicyNumber}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Primary Physician :{" "}
                <span className="pl-2 text-green-400">
                  {patient.primaryPhysician}
                </span>
              </p>
            </div>
            <div className="m-4 rounded-xl border border-gray-400 px-4 py-2">
              <p className="text-gray-400">
                Created At :{" "}
                <span className="pl-2 text-green-400">
                  {patient.$createdAt.split("T")[0]}
                </span>
              </p>
            </div>
          </div>
          <p className="copyright mt-10 py-12">© 2025 Doxset</p>
        </div>
      </section>
    </div>
  );
};

export default Details;
