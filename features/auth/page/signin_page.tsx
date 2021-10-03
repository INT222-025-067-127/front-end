import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../core/contexts/auth_context";
import { useFormik } from "formik";
import { siginFormValidate, signinFormInit } from "../form/signin_form";
import { Observer } from "mobx-react-lite";
import TextInput from "../component/text_input";

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

  useEffect(() => {
    context.setValue("signinFormik", formik)
  }, [])

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
                <h1 className="w-max heading1 text-[#4D506C]">sign in</h1>
                <TextInput
                  formik={formik}
                  name="username"
                  placeholder="Username"
                />
                <TextInput
                  formik={formik}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
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
