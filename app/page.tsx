import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { LogoStatic } from "@/public/assets/icons/LogoStatic";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[400px]">
          <div className="mb-6 flex flex-col items-center justify-center gap-2">
            <LogoStatic className="mb-2 size-20" />
            <p className="text-dark-700">Get started with appointments.</p>
          </div>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 Doxset
            </p>
            <Link href="/?admin=true" className="text-white">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
