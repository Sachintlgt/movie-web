"use client"
import { getLocalStorage } from "@/services/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// Higher order component to prevent users from accessing the private routes
export const hocAuth = (OriginalComponent: any) => {
  function HOCAuth(props: any) {
    const router = useRouter();
    const userToken: any = getLocalStorage("token");
    const pathName = usePathname();
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    // Add public paths here
    const publicPaths = [`/${locale}`]; 
    // add protected routes here
    const protectedPaths = [`/${locale}/movies-list`, `/${locale}/movie`]; 

    // Check if the path is public or private
    const isPublicPath = publicPaths.includes(pathName);
    const isProtectedPath = protectedPaths.some((path) =>
      pathName.startsWith(path)
    );
    
    useEffect(() => {
      if (isPublicPath && userToken) {
        // If user logged in redirect to the movies list
        router.push(`${locale}/movies-list`);
      } else if (isProtectedPath && !userToken) {
        // Redirect the user to sign in page if try to access the protected route
        router.push(`/${locale}`);
      } //eslint-disable-next-line
    }, [isPublicPath, isProtectedPath, userToken, router, pathName]);

    if ((isPublicPath && userToken) || (isProtectedPath && !userToken)) {
      router.push(`/${locale}`);
      return null;
    }

    return <OriginalComponent {...props} />;
  }

  HOCAuth.displayName = "HOCAuth";

  return HOCAuth;
};
