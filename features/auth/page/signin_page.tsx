import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../core/contexts/auth_context";
import getConfig from "next/config";
import { useFormik } from "formik";
import { siginFormValidate, signinFormInit } from "../form/signin_form";
import { Observer } from "mobx-react-lite";

export default function SigninPage() {
  const router = useRouter();

  const context = useContext(AuthContext);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    validationSchema: siginFormValidate,
    initialValues: signinFormInit,
    onSubmit: (value) => {
      context.signin(value);
    },
  });

  return (
    <Observer>
      {() => (
        <div className="h-screen mx-128">
          <div className="flex items-center h-full">
            <div className="flex items-center justify-center w-5/12 mt-48">
              <img src="/images/kaiya_graphic.svg" />
            </div>
            <div className="flex items-center justify-center w-7/12 h-full">
              <div className="w-2/3 rounded-[24px] bg-[#C4C4C4] flex flex-col items-center p-24 pb-32 relative">
                <h1 className="w-max heading1 text-[#4D506C]">sign up</h1>
                <input
                  type="text"
                  className="focus:outline-none bg-[#EDEDED] text-[#878787] px-40 rounded-[23px] h-48 w-full caption1 mt-16"
                  placeholder="Username"
                  onChange={(e) => {
                    formik.setFieldValue("username", e.target.value);
                  }}
                />
                <p className="w-full pl-24 text-red-500 caption3 h-[18px]">
                  {formik.errors.username || ""}
                </p>
                <input
                  type="Password"
                  className="focus:outline-none bg-[#EDEDED] text-[#878787] px-40 rounded-[23px] h-48 w-full caption1 mt-16"
                  placeholder="Password"
                  onChange={(e) => {
                    formik.setFieldValue("password", e.target.value);
                  }}
                />
                <p className="w-full pl-24 text-red-500 caption3 h-[18px]">
                  {formik.errors.password || ""}
                </p>
                <button
                  className="focus:outline-none bg-[#008795] h-40 w-128 rounded-full text-white caption1 mt-32"
                  onClick={() => {
                    formik.submitForm();
                  }}
                >
                  sign in
                </button>
                <p
                  className="absolute bottom-8 mt-8 text-white cursor-pointer right-[20px] drop-shadow-md caption3"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Create Account
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
}
