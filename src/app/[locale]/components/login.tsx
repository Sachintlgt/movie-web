"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { emailregex } from "@/utils/regex";
import { sweetAlertToast } from "../../../services/toastServices";
import { login } from "../../../services/loginService";
import { saveLocalStorage } from "../../../services/utils";
import { useDispatch } from 'react-redux';
import { setLoader } from "@/redux/loaderSlice";
import { hocAuth } from "./hoc/HOCAuth";
import { useTranslation } from 'react-i18next';
import Button from "@/app/components/Button";
import Image from "next/image";
import vecter from "@/../public/images/bottom-vector.svg"
import mobilevector from "@/../public/images/mobile-vector.svg"

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(t('title'))
  const router = useRouter();
  const handleLogin = async (data: any) => {
    dispatch(setLoader(true));
    try {
      const resp = await login(data.email, data.password);
      if (resp.status === 200) {
        sweetAlertToast("success", resp.message);
        saveLocalStorage("token", resp.data.token);
        saveLocalStorage("userId", resp.data.id);
        router.push(`/movies-list`);
      }
      dispatch(setLoader(false));
    } catch (err: any) {
      const { error } = err.data;
      sweetAlertToast("error", error);
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="flex w-full overflow-auto min-h-screen items-center justify-center flex-col bg-body relative p-3">
      <div className="max-w-[300px] w-full py-2">
        <form
          className="flex gap-6 w-full flex-col"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h1 className="text-center text-white text-4xl md:text-6xxl md:leading-20 font-semibold">Sign in</h1>
          <div className="relative w-full">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailregex,
                  message: "Enter a valid email",
                },
              })}
              type="text"
              id="email"
              className="block rounded-2lg px-4 py-3 w-full text-sm text-white bg-input-bg  border border-input-bg  appearance-none focus:outline-none focus:ring-0 focus:border-input-bg  peer"
              placeholder= {t("login.email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {(errors.email as { message: string }).message}
              </span>
            )}
          </div>

          <div className="relative w-full">
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type={"password"}
              id="password"
              className="block rounded-2lg px-4 py-3 w-full text-sm text-white bg-input-bg  border border-input-bg  appearance-none focus:outline-none focus:ring-0 focus:border-input-bg  peer"
              placeholder={t("login.password")}
            />
             {errors.password && (
              <span className="text-red-500 text-sm">
                {(errors.password as { message: string }).message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="rounded-2lg text-base font-bold  w-full h-[46px]  p-2.5 flex justify-center items-center bg-primary text-white hover:bg-primary"
            title={t("login.button")}
          />
        </form>
      </div>
      <Image src={vecter} alt="vector"  className="absolute bottom-0 pointer-events-none w-full hidden sm:block" />
      <Image src={mobilevector} alt="vector"  className="absolute bottom-0 pointer-events-none w-full block sm:hidden" />
    </div>
  );
};
export default hocAuth(Login);
