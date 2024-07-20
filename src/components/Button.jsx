import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-lg px-4 py-2 ${bgColor} ${textColor} ${className} hover:bg-blue-900 hover:text-slate-50  `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
