import React, { ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ children, isLoading, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-200 disabled:from-blue-400 disabled:to-indigo-400 ${className}`}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}