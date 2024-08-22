"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { emailregex } from "@/utils/regex";
import { sweetAlertToast } from "../services/toastServices";
import { login } from "../services/loginService";
import { saveLocalStorage } from "../services/utils";
import { useDispatch } from 'react-redux';
import { setLoader } from "@/redux/loaderSlice";
import { hocAuth } from "./hoc/HOCAuth";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const handleLogin = async (data: any) => {
    dispatch(setLoader(true));
    try {
      const resp = await login(data.email, data.password);
      if (resp.status === 200) {
        sweetAlertToast("success", resp.message);
        saveLocalStorage("token", resp.data.token);
        saveLocalStorage("userId", resp.data.id);
        router.push("/movies-list");
      }
      dispatch(setLoader(false));
    } catch (err: any) {
      const { error } = err.data;
      sweetAlertToast("error", error);
      dispatch(setLoader(false));
      return;
    }
  };

  return (
    <div className="flex w-full overflow-auto min-h-screen items-center md:justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      <div className="max-w-[270px] sm:max-w-[484px] w-full py-2">
        <form
          className="flex gap-4 w-full flex-col"
          onSubmit={handleSubmit(handleLogin)}
        >
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
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Email
            </label>
            {errors.email && (
              <span className="text-red-500">
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
              className="block rounded-2xl px-5 pb-3 pt-6 pr-12 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Password
            </label>

            {errors.password && (
              <span className="text-red-500">
                {(errors.password as { message: string }).message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 text-base  w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default hocAuth(Login);
