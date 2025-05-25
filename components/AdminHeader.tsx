import Image from "next/image";
import Link from "next/link";

export const AdminHeader = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <header className="admin-header my-6 border border-gray-400">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/images/logo-typo.svg"
            height={81}
            width={361}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold text-gray-400">Admin Dashboard</p>
      </header>
    </div>
  );
};
