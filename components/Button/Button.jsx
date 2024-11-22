"use client";

import { useFormStatus } from "react-dom";

const Button = ({ children, onClick, className, formButton, disabled }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled || (formButton && pending)}
      className={`cursor-pointer ${className} bg-white rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed border-threads-gray-light w-full mt-4 p-4 hover:bg-gray-300 duration-150`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
