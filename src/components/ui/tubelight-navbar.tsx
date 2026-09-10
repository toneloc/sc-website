'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeTab?: string;
  onTabChange?: (name: string) => void;
  rightSlot?: React.ReactNode;
  brandSlot?: React.ReactNode;
}

export function NavBar({
  items,
  className,
  activeTab: controlledActiveTab,
  onTabChange,
  rightSlot,
  brandSlot,
}: NavBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    items[0]?.name || ''
  );
  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (name: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(name);
    }
    onTabChange?.(name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
      className={cn(
        'fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0 sm:pt-4 pointer-events-none w-fit max-w-[95vw]',
        className
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 py-1.5 px-2 sm:px-3 rounded-full shadow-lg shadow-black/5 dark:shadow-black/70 transition-colors duration-300">
        {brandSlot && (
          <div className="flex items-center pr-1 sm:pr-2">{brandSlot}</div>
        )}

        <div className="flex items-center gap-1 sm:gap-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => handleTabClick(item.name)}
                className={cn(
                  'relative cursor-pointer text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 rounded-full transition-colors select-none',
                  'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white',
                  isActive &&
                    'bg-zinc-100 dark:bg-zinc-900 text-[#C6720D] dark:text-[#F7931A]'
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden flex items-center justify-center">
                  <Icon size={18} strokeWidth={2.2} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-[#F7931A]/10 dark:bg-[#F7931A]/15 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#F7931A] rounded-t-full">
                      <div className="absolute w-12 h-6 bg-[#F7931A]/30 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-[#F7931A]/40 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-[#F7931A]/50 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>

        {rightSlot && (
          <div className="flex items-center gap-1 pl-1 sm:pl-2">
            {rightSlot}
          </div>
        )}
      </div>
    </motion.div>
  );
}
