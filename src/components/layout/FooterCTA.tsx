'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CornerDownLeft } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { AppIconModel } from '@/components/3d/AppIconModel';
import { siteConfig } from '@/data/siteConfig';

export function FooterCTA() {
  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#121214] overflow-hidden p-6 md:p-12 transition-colors duration-300">
      {/* 3D App Icon positioned in top right */}
      <div className="absolute right-6 xl:right-12 md:flex hidden top-1/2 -translate-y-1/2 items-center justify-center pointer-events-auto">
        <AppIconModel className="w-52 h-52 xl:w-60 xl:h-60 drop-shadow-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center max-w-xl">
        <h3 className="tracking-tight font-bold text-2xl md:text-4xl text-left text-zinc-900 dark:text-white">
          Ready to experience{' '}
          <span className="text-[#F7931A]">dollar stability</span> on Bitcoin?
        </h3>
        <p className="text-base pt-4 text-zinc-600 dark:text-[#86868b] text-left leading-relaxed">
          Get instant USD stability in a self-custodial wallet. No banks, no
          synthetic tokens - transparent, continuous settlement over Lightning.
        </p>

        <motion.div
          className="w-full flex flex-row gap-3 sm:gap-4 flex-wrap items-center mt-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        >
          <Link
            className="w-full sm:w-auto h-12 text-black font-bold inline-flex items-center justify-center rounded-full px-6 text-sm bg-[#F7931A] hover:bg-[#E08213] transition-colors duration-200 group gap-2"
            href={siteConfig.releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Download App</span>
            <CornerDownLeft className="size-4" />
          </Link>
          <Link
            className="w-full sm:w-auto h-12 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/[0.15] bg-white dark:bg-black/60 hover:border-[#F7931A] hover:text-[#F7931A] dark:hover:text-[#F7931A] inline-flex items-center justify-center rounded-full px-6 text-sm font-medium transition-colors duration-200 group gap-2"
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
            <GithubIcon className="size-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
