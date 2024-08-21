'use client'
import { clearLocalStorage } from "@/services/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">Movies</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li
              className="hover:underline"
              onClick={() => {
                // logout
                clearLocalStorage();
                router.push("/");
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
