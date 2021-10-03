import _ from "lodash";
import React, { useState } from "react";

interface SelectDropdownProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: Array<{ type_id: string; type_name: string }>;
  value: string;
}

export default function SelectDropdown(props: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (e) => {
    props.onChange(e);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="relative">
        <div
          className="w-full h-32 border rounded-[16px] px-16 caption1 flex items-center justify-between cursor-pointer"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <p>
            {
              _.find(props.options, (option) => option.type_id === props.value)
                .type_name
            }
          </p>
          <i className="fas fa-caret-down" />
        </div>
        {isOpen && (
          <div className="absolute z-20 flex flex-col w-full px-16 py-8 top-40 bg-gray-100 divide-y divide-gray-300 rounded-[10px]">
            {_.map(props.options, (option) => (
              <div
                className="w-full cursor-pointer"
                onClick={() => onChange(option.type_id)}
              >
                <p className="text-left">{option.type_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute top-0 left-0 z-10 w-screen h-screen"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
