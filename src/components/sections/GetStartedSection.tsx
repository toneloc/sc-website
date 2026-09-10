'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Smartphone,
  Monitor,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/data/siteConfig';
import { getStartedSteps } from '@/data/getStarted';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const GetStartedSection: React.FC = () => {
  return (
    <section
      id="get-started"
      data-section="get-started"
      className="py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
    >
      <Container>
        {/* Header with pill, title, subtitle & highlighted Get Started CTA */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center mb-5">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#C6720D] dark:text-[#F7931A]">
              Get Started
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-5">
            Up and running in minutes.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] leading-relaxed mb-8 max-w-xl mx-auto">
            Simple three-step setup to protect your Bitcoin purchasing power
            without banks or custody risk.
          </p>

          {/* Highlighted Apple-style Get Started Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={siteConfig.releasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-black bg-[#F7931A] hover:bg-[#E08213] rounded-full shadow-lg shadow-[#F7931A]/20 hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-200 group active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-full transition-colors"
            >
              View on GitHub
            </Link>
          </div>
        </AnimatedSection>

        {/* Minimalist 3-Step Flow (No heavy box cards) */}
        <div className="relative">
          {/* Subtle connecting hairline on desktop */}
          <div className="hidden lg:block absolute top-7 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10 relative z-10">
            {getStartedSteps.map((step, index) => {
              const formattedNum = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={step.stepNumber}
                  className="flex flex-col items-center text-center lg:items-start lg:text-left group"
                >
                  {/* Step Number & Indicator */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl sm:text-4xl font-light tracking-tight text-[#C6720D] dark:text-[#F7931A]">
                      {formattedNum}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-mono">
                      / Step
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 group-hover:text-[#C6720D] dark:group-hover:text-[#F7931A] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-[#86868b] leading-relaxed max-w-sm">
                    {step.description}
                  </p>

                  {/* Contextual platform details for Step 1 */}
                  {index === 0 && (
                    <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800">
                        <Smartphone className="w-3 h-3 text-[#F7931A]" />
                        Android
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800">
                        <Monitor className="w-3 h-3 text-[#F7931A]" />
                        Desktop
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border border-zinc-200/60 dark:border-zinc-800">
                        iOS Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Contextual features for Step 2 & 3 */}
                  {index === 1 && (
                    <div className="mt-5 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <ShieldCheck className="w-4 h-4 text-[#F7931A]" />
                      <span>2-of-2 Multi-Sig Self-Custody</span>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="mt-5 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <Zap className="w-4 h-4 text-[#F7931A]" />
                      <span>Instant Lightning Rebalancing</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
