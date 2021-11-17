import React from "react";

interface TextInputProps {
  title?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div className="flex space-x-[4px] w-full">
      <div className="caption1 text-[#4D506C] flex w-full space-x-[8px] items-center">
        {props.title && <span className="font-extrabold">{props.title}:</span>}
        <input
          type={props.type || "text"}
          className="focus:outline-none rounded-[4px] flex-grow px-[4px] py-[4px]"
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    </div>
  );
}
