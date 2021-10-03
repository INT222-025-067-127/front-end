import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../core/contexts/auth_context";
import TextInput from "../component/text_input";
import { signupFormInit, signupFormValidate } from "../form/signup_form";

export default function SignupPage() {
  const router = useRouter();

  const context = useContext(AuthContext);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    validationSchema: signupFormValidate,
    initialValues: signupFormInit,
    onSubmit: (value) => {
      context.signup(value);
    },
  });

  useEffect(() => {
    context.setValue("signupFormik", formik)
  }, []);

  return (
    <div className="h-screen mx-128">
      <div className="flex items-center h-full">
        <div className="flex items-center justify-center w-5/12 mt-48">
          <img src="/images/kaiya_graphic.svg" />
        </div>
        <div className="flex items-center justify-center w-7/12 h-full">
          <div className="w-2/3 rounded-[24px] bg-[#C4C4C4] flex flex-col items-center p-24">
            <h1 className="w-max heading1 text-[#4D506C]">sign up</h1>
            <div className="flex w-full space-x-8">
              <div className="w-1/2">
                <TextInput
                  formik={formik}
                  name="firstname"
                  placeholder="Firstname"
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  formik={formik}
                  name="lastname"
                  placeholder="Lastname"
                />
              </div>
            </div>
            <TextInput formik={formik} name="email" placeholder="Email" />
            <TextInput formik={formik} name="username" placeholder="Username" />
            <TextInput
              formik={formik}
              name="password"
              placeholder="Password"
              type="password"
            />
            <button
              className="focus:outline-none bg-[#008795] h-40 w-128 rounded-full text-white caption1 mt-32"
              onClick={() => formik.submitForm()}
            >
              sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
