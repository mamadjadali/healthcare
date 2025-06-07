import { PatientForm } from "@/components/forms/PatientForm";
import { LogoStatic } from "@/public/assets/icons/LogoStatic";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <section className="container">
        <div className="mx-auto max-w-[400px]">
          <div className="mb-6 flex flex-col items-center justify-center gap-2">
            <LogoStatic className="mb-2 size-20" />
            <p className="text-dark-700">Get started with appointments.</p>
          </div>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-center">
            <p className="text-dark-600">
              © 2025 Doxset
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
