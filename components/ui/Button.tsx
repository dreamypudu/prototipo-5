
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-200 ease-in-out transform hover:bg-blue-500 hover:scale-105 active:scale-100 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 flex flex-col items-center justify-center shadow-md hover:shadow-lg disabled:shadow-none"
    >
      {children}
    </button>
  );
};

export default Button;
