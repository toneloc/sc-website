'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Zap, FileText, Lock, Heart, LucideIcon } from 'lucide-react';
import { GithubIcon, TwitterIcon } from '@/components/ui/Icons';
import { siteConfig } from '@/data/siteConfig';
import { footerSections } from '@/data/navigation';
import { FooterCTA } from '@/components/layout/FooterCTA';

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  fileText: FileText,
  lock: Lock,
};

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative bg-white dark:bg-black py-16 px-4 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl">
        <FooterCTA />

        <div className="pt-16 pb-6">
          {/* Top Directory Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <Image
                  src="/images/app-icon.svg"
                  alt={siteConfig.name}
                  width={36}
                  height={36}
                  className="rounded-xl shadow-sm"
                />
                <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {siteConfig.name}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-[#86868b] mb-5 leading-relaxed">
                Self-custodial USD stability on Bitcoin Lightning. No banks, no
                synthetic tokens, and zero custody risk.
              </p>
              <div className="flex gap-2">
                <Link
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-zinc-600 dark:text-[#86868b] hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </Link>
                <Link
                  href={siteConfig.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-zinc-600 dark:text-[#86868b] hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-flex items-center justify-center"
                  aria-label="Telegram"
                >
                  <TwitterIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Dynamic Footer Sections */}
            {footerSections.map((section) => {
              const Icon = iconMap[section.iconName] || Zap;
              return (
                <div key={section.title}>
                  <h4 className="font-bold mb-4 text-[#F7931A] text-xs uppercase tracking-wider flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#F7931A]" />
                    {section.title}
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={link.isExternal ? '_blank' : undefined}
                          rel={
                            link.isExternal ? 'noopener noreferrer' : undefined
                          }
                          className="text-zinc-600 dark:text-[#86868b] hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </motion.div>

          {/* Bottom Copyright Section */}
          <div className="border-t border-zinc-200 dark:border-white/[0.08] pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-zinc-500 dark:text-[#86868b]">
                (C) {new Date().getFullYear()} {siteConfig.name}. Open source
                under the GPLv3 License.
              </p>
              <p className="text-xs text-zinc-500 dark:text-[#86868b] flex items-center gap-1.5">
                Built with{' '}
                <Heart className="inline h-3 w-3 text-[#F7931A] fill-current" />{' '}
                for Bitcoiners worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
