'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon } from '@/components/ui/Icons';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { siteConfig } from '@/data/siteConfig';
import { mainNavItems } from '@/data/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { NavBar } from '@/components/ui/tubelight-navbar';

export const Navbar: React.FC = () => {
  const { activeTab, handleTabChange, scrollToTop } = useScrollSpy(
    mainNavItems,
    'Features'
  );

  const brandSlot = (
    <Link
      href="/"
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      className="flex items-center gap-2 pl-2 pr-1 py-1 group"
    >
      <Image
        src="/images/app-icon.svg"
        alt={siteConfig.name}
        width={24}
        height={24}
        className="rounded-md transition-transform duration-300 group-hover:scale-105"
      />
      <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white tracking-tight hidden lg:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  );

  const rightSlot = (
    <div className="flex items-center gap-1">
      <ThemeToggle className="size-7 sm:size-8" />
      <Link
        href={siteConfig.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        aria-label="GitHub"
      >
        <GithubIcon className="size-4" />
      </Link>
    </div>
  );

  return (
    <NavBar
      items={mainNavItems}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      brandSlot={brandSlot}
      rightSlot={rightSlot}
    />
  );
};
