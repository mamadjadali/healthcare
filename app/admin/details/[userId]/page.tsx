import { HeartPulse, SettingsIcon, User2Icon } from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
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
    <section className="pb-32 pt-10">
      <div className="container">
        <div className="mx-auto max-w-xl">
          <div className="text-center lg:text-left">
            <h1 className="text-left text-3xl font-medium text-gray-400 md:text-4xl">
              Patient Info
            </h1>
          </div>
          <div className="mx-auto mt-6 flex flex-col gap-16 md:mt-14">
            <div className="grid">
              <div className="flex items-center justify-start gap-2 py-4 text-blue-400">
                <User2Icon />
                <h2 className="text-xl font-medium">Personal Information</h2>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Name
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.name}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Email
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.email}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Phone
                </p>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="pointer-events-none mr-3 rounded-xl"
                  >
                    {patient.phone}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer rounded-xl border-none bg-emerald-400 text-white"
                  >
                    <a href={`tel:${patient.phone}`}>Call</a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Gender
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.gender}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Address
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.address}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Birth Date
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.birthDate.split("T")[0]}
                </Button>
              </div>
              <div className="flex items-center justify-start gap-2 py-8 text-violet-400">
                <HeartPulse />
                <h2 className="text-xl font-medium">Medical Information</h2>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Emergency Contact Name
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.emergencyContactName}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Emergency Contact Number
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.emergencyContactNumber}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Primary Physician
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.primaryPhysician}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Insurance Policy Number
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.insurancePolicyNumber}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Past Medical History
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.pastMedicalHistory}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Family Medical History
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.familyMedicalHistory}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Current Medication
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.currentMedication}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Allergies
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.allergies}
                </Button>
              </div>
              <div className="flex items-center justify-start gap-2 py-8 text-emerald-400">
                <SettingsIcon />
                <h2 className="text-xl font-medium">User Information</h2>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  User Id
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.userId}
                </Button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <p className="font-semibold text-gray-400 hover:underline">
                  Created At
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none rounded-xl"
                >
                  {patient.$createdAt.split("T")[0]}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
