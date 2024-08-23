'use client'
import { clearLocalStorage } from "@/services/utils";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import plus from "@/../public/images/plus-circle.svg"
import logout from "@/../public/images/logout.svg"
import { useCookies } from "react-cookie";
// Header component for the movies list page
const Header = () => {
  const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);
  const router = useRouter();
  const { t } = useTranslation();
  const handleCreateButton = () =>{
    if(cookie.NEXT_LOCALE === 'fr'){
      router.push(`/${cookie.NEXT_LOCALE}/movie/new-movie`)
    } else {
      router.push('/movie/new-movie')
    }
  }
  const pathname = usePathname()
  console.log(pathname, 'pathna,e');
  
  return (
    <header className="text-white px-6 py-20 md:py-30">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-5xl font-semibold flex items-center gap-2 md:gap-3">
          <h1>{t("list.header.title")}</h1>
          <button className="relative md:top-1" type="button" onClick={handleCreateButton}><Image src={plus} alt="plus" /></button>
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
