"use client";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`cursor-pointer ${className} bg-white rounded-3xl border-threads-gray-light w-full mt-4 p-4 hover:bg-gray-300 duration-150`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
