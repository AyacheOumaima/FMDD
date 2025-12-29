import React from 'react';
import clsx from 'clsx';

export default function Button({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'accent'
  size = 'md',            // 'sm' | 'md' | 'lg'
  leftIcon,
  rightIcon,
  disabled = false,
  isFullWidth = false,    // Ajout explicite pour éviter l'erreur
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition';
  const variants = {
    primary: 'bg-yellow hover:bg-yellow/90 text-blue-dark',
    secondary: 'bg-teal-500 hover:bg-turquoise/90 text-white',
    accent: 'bg-green-600 hover:bg-green-700 text-white'
  };
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Ajoute la classe w-full si isFullWidth est activé
  const fullWidthClass = isFullWidth ? 'w-full' : '';

  return (
    <button
      className={clsx(
        base,
        "bg-yellow-500",
        variants[variant],
        sizes[size],
        fullWidthClass, // Utilisation en interne sans passer au DOM
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
