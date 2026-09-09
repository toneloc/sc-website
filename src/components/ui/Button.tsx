import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'light' | 'outline' | 'dark';
  href?: string;
  isExternal?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  isExternal = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold text-sm rounded-xl px-6 py-2.5 transition-all duration-200 active:scale-98 text-center cursor-pointer';

  const variants = {
    primary:
      'bg-[#F7931A] hover:bg-[#F7931A] text-black font-bold shadow-md shadow-[#F7931A]/20 hover:shadow-[#F7931A]/30 hover:-translate-y-0.5',
    light:
      'bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-xs',
    outline:
      'bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white',
    dark: 'bg-zinc-900 dark:bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 shadow-sm',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClassName =
    `${baseStyles} ${variants[variant]} ${widthStyle} ${className}`.trim();

  if (href) {
    if (isExternal || href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
