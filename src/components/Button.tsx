import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base';
  
  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-purple-600 hover:bg-gray-50',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
