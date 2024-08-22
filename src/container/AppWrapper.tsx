"use client";
import FlagDropdown from "@/app/[locale]/components/Flags";
import Spinner from "@/app/[locale]/components/spinner";
import { IRedux } from "@/interfaces/redux";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const AppWrapper = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const loader = useSelector((state: IRedux) => state.loader.loading);
  if (!mounted) {
    return null;
  }
  return (
    <>
      <FlagDropdown />
      {children}
      {loader && <Spinner />}
    </>
  );
};

export default AppWrapper;
