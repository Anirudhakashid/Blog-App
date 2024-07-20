import React, { useId, useState, forwardRef } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const [inputType, setInputType] = useState(type);
  const [icon, setIcon] = useState(faEyeSlash);

  const handleToggle = () => {
    if (inputType === "password") {
      setInputType("text");
      setIcon(faEye);
    } else {
      setInputType("password");
      setIcon(faEyeSlash);
    }
  };

  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="flex items-center ">
        <input
          type={inputType}
          className={`px-3 py-2  rounded-lg bg-white text-black outline-none  focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
        {type === "password" && (
          <span
            className="absolute right-1  ml-2 cursor-pointer dark:text-black "
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
      </div>
    </div>
  );
});

export default Input;
