import React from 'react';
import clsx from 'clsx';

export default function Button({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'accent'
  size = 'md',            // 'sm' | 'md' | 'lg'
  leftIcon,
  rightIcon,
  disabled = false,
  isFullWidth = false,
  className,              // allows custom classes
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-yellow-500 text-blue-950 hover:bg-yellow-600',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600',
    accent: 'bg-green-600 text-white hover:bg-green-700',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const fullWidthClass = isFullWidth ? 'w-full' : '';

  return (
    <button
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidthClass,
        className // allow additional custom classes
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
    </button>
  );
}