import _ from "lodash";
import React, { Fragment } from "react";

interface TextInputProps {
  type?: "text";
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

export default function TextInput(props: TextInputProps) {
  return (
    <Fragment>
      <input
        type={props.type || "text"}
        className="focus:outline-none rounded-[16px] px-16 h-32 border w-full caption1"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </Fragment>
  );
}
