import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const hocAuth = (OriginalComponent: any) => {
  function HOCAuth(props: any) {
    const router = useRouter();
    const userToken: any = localStorage.getItem("token");
    const pathName = usePathname();
    const publicPaths = [
      "/"
    ]; // add public paths here
    const protectedPaths = ["movies", "movie"]; // add protected routes here

    const isPublicPath = publicPaths.some((path) => pathName.startsWith(path));
    const isProtectedPath = protectedPaths.includes(pathName);
    useEffect(() => {
      if (isPublicPath && userToken) {
        router.push("/movies");
      } else if (isProtectedPath && !userToken) {
        router.push("/");
      } //eslint-disable-next-line
    }, [isPublicPath, isProtectedPath, userToken, router, pathName]);

    if ((isPublicPath && userToken) || (isProtectedPath && !userToken)) {
      router.push("/");
      return null;
    }

    return <OriginalComponent {...props} />;
  }

  HOCAuth.displayName = "HOCAuth";

  return HOCAuth;
};
