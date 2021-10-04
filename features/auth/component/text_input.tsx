import _ from "lodash";
import React, { Fragment } from "react";

interface TextInputProps {
  type?: "text" | "password";
  placeholder: string;
  formik;
  name: string;
}

export default function TextInput(props: TextInputProps) {
  return (
    <Fragment>
      <input
        type={props.type || "text"}
        className="focus:outline-none bg-[#EDEDED] text-[#878787] px-[20px] tablet:px-40 rounded-[23px] h-48 w-full caption1 tablet:mt-16"
        placeholder={props.placeholder}
        onChange={(e) => {
          props.formik.setFieldValue(props.name, e.target.value);
        }}
      />
      <p className="w-full pl-24 text-red-500 caption3 h-[18px]">
        {_.get(props.formik.errors, props.name, "")}
      </p>
    </Fragment>
  );
}
