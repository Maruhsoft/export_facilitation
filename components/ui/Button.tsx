
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "py-3 px-6 rounded-lg font-semibold transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: 'bg-brand-orange text-white hover:bg-opacity-90',
    secondary: 'bg-brand-green text-white hover:bg-opacity-90',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
