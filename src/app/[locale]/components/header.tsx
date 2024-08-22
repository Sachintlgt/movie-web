'use client'
import { clearLocalStorage } from "@/services/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import plus from "@/../public/images/plus-circle.svg"
import logout from "@/../public/images/logout.svg"

const Header = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <header className="text-white px-6 py-20 md:py-30">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-5xl font-semibold flex items-center gap-2 md:gap-3">
          <Link href="/">{t("list.header.title")}</Link>
          <Link className="relative md:top-1" href="/movie/new-movie"><Image src={plus} alt="plus" /></Link>
        </h1>
        <nav>
            <div
              className="hover:underline flex gap-3 items-center text-base font-bold cursor-pointer"
              onClick={() => {
                // logout
                clearLocalStorage();
                router.push("/");
              }}
            >
              <span className="hidden md:block"> {t("list.header.logout")}</span> <Image src={logout} alt="logout" />
            </div> 
        </nav>
      </div>
    </header>
  );
};

export default Header;
