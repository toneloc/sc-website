'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface FaqAccordionItem {
  id?: string;
  question: string;
  answer: React.ReactNode;
  linkText?: string;
  linkHref?: string;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqAccordionItem[];
  title?: string;
  defaultOpenIndex?: number | null;
}

export function FaqAccordion({
  items,
  title,
  defaultOpenIndex = 0,
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultOpenIndex
  );

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className={cn(
        'w-full max-w-4xl mx-auto py-4 relative font-sans',
        className
      )}
      {...props}
    >
      {title && (
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-10 text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
      )}

      <ul className="w-full mx-auto list-none p-0 flex flex-col space-y-3">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={item.id || index}
              className={cn(
                'w-full relative transition-all duration-300 ease-out rounded-2xl overflow-hidden',
                'border border-zinc-200 dark:border-white/[0.08]',
                isActive
                  ? 'bg-zinc-50 dark:bg-[#121214] border-[#F7931A]/50 dark:border-[#F7931A]/50'
                  : 'bg-zinc-50/50 dark:bg-[#121214]/60 hover:border-zinc-400 dark:hover:border-zinc-700'
              )}
            >
              <button
                className={cn(
                  'flex flex-row items-center justify-between w-full min-h-[64px] py-4 px-6 md:px-8 cursor-pointer',
                  'border-l-[6px] md:border-l-[8px] transition-all duration-300 text-left outline-none text-base md:text-lg',
                  isActive
                    ? 'border-l-[#F7931A] text-zinc-900 dark:text-white font-bold'
                    : 'border-l-transparent text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                )}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                <div className="flex items-center gap-4 pr-6">
                  {/* Plus/Minus Indicator */}
                  <span
                    className={cn(
                      'flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold transition-all duration-300 shrink-0',
                      isActive
                        ? 'bg-[#F7931A] text-black shadow-xs shadow-[#F7931A]/30 scale-105'
                        : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200'
                    )}
                  >
                    {isActive ? '−' : '+'}
                  </span>

                  <span className="font-semibold text-base sm:text-lg tracking-tight">
                    {item.question}
                  </span>
                </div>

                {/* Animated Chevron Indicator */}
                <span
                  className={cn(
                    'block w-2.5 h-2.5 border-t-2 border-r-2 transition-transform duration-300 ease-in-out shrink-0',
                    isActive
                      ? 'rotate-[-45deg] border-[#F7931A] translate-y-0.5'
                      : 'rotate-[135deg] border-zinc-400 dark:border-zinc-500 -translate-y-0.5'
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out w-full',
                  'border-l-[6px] md:border-l-[8px]',
                  isActive
                    ? 'grid-rows-[1fr] border-l-[#F7931A]'
                    : 'grid-rows-[0fr] border-l-transparent'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pl-16 md:pl-20 pb-6 pt-1 text-sm sm:text-base text-zinc-600 dark:text-[#86868b] leading-relaxed border-t border-zinc-100 dark:border-white/[0.08]">
                    <p>{item.answer}</p>
                    {item.linkText && item.linkHref && (
                      <p className="mt-3.5">
                        <a
                          href={item.linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#E08213] dark:text-[#F7931A] hover:underline underline-offset-4"
                        >
                          {item.linkText} →
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
