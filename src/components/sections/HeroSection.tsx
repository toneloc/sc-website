'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GooglePlayButton } from '@/components/ui/app-store-buttons';
import { siteConfig } from '@/data/siteConfig';
import { Iphone17Pro } from '@/components/ui/iphone-17-pro';
import { BalanceScaleHero } from '@/components/ui/BalanceScaleHero';

// Smooth cubic-bezier timing curve (easeInOutCubic)
const EASE_CUBIC = [0.645, 0.045, 0.355, 1] as const;

interface HeroDeviceItem {
  readonly title: string;
  readonly src: string;
}

const HERO_DEVICES: readonly HeroDeviceItem[] = [
  { title: 'Receive Stable USD', src: '/images/hero/receive-view.jpg' },
  { title: 'Payment History', src: '/images/hero/payments-view.jpg' },
  { title: 'Self-Custodial Dashboard', src: '/images/hero/home-view.jpg' },
  { title: 'Adjust your Bitcoin exposure.', src: '/images/hero/btc-to-usd.jpg' },
  {
    title: 'Continuous Settlement Details',
    src: '/images/hero/payment-details-view.jpg',
  },
];

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll({ offset: ['start start', 'end start'] });
  const t = useTransform(scrollY, [0, 300], [100, 0]);
  const s = useTransform(scrollY, [0, 300], [50, 0]);
  const x = useTransform(scrollY, [0, 300], [0, 0]);
  const m = useTransform(scrollY, [0, 300], [50, 0]);
  const h = useTransform(scrollY, [0, 300], [100, 0]);

  return (
    <section
      id="hero"
      data-section="hero"
      className="min-h-[100vh] w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300 relative"
    >
      <main className="mx-auto pt-16 sm:pt-24 md:pt-32 text-center relative px-4">
        {/* Splash App Icon to Header Animation */}
        <div className="relative">
          <motion.div
            initial={{ scale: 4.5, height: '80vh' }}
            animate={{ scale: 1, height: '10vh' }}
            transition={{
              scale: { delay: 0, duration: 1.8, ease: EASE_CUBIC },
              height: { delay: 0, duration: 1.8, ease: EASE_CUBIC },
            }}
            className="mb-16 relative z-20"
            style={{ transformOrigin: 'top' }}
          >
            <div className="h-20 w-20 mx-auto flex items-center justify-center bg-[#2D2D2D] rounded-2xl shadow-2xl p-2 border border-white/10 overflow-hidden">
              <BalanceScaleHero size={64} initialDelay={0.0} />
            </div>
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute inset-0 top-24 z-10 font-bold text-xl tracking-tight text-zinc-900 dark:text-white"
          >
            {siteConfig.name}
          </motion.div>
        </div>

        {/* Copy Section with Staggered Entrance */}
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_CUBIC }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tighter text-zinc-900 dark:text-white leading-[1.12]"
          >
            Stable money.
            <br />
            <span className="text-[#F7931A]">Your bitcoin.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_CUBIC }}
            className="max-w-2xl mx-auto text-lg sm:text-xl mb-8 font-medium text-balance text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            Choose how much of your balance targets a steady dollar value, and
            how much stays exposed to Bitcoin&apos;s price. All in a
            self-custodial Lightning wallet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <GooglePlayButton
              href={siteConfig.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className="hover:scale-105 transition-transform shadow-xs"
            />
            <a
              href="#demo"
              className="inline-flex items-center justify-center h-[52px] px-6 rounded-full border border-zinc-300 dark:border-white/[0.15] text-sm font-medium text-zinc-900 dark:text-white hover:border-[#F7931A] hover:text-[#F7931A] transition-colors"
            >
              Watch the demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="max-w-2xl mx-auto -mt-10 mb-14 space-y-2"
          >
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              No stablecoins. No custodian. Open-source software.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
              Dollar stability depends on channel liquidity, connectivity, and
              continued settlement with your counterparty.{' '}
              <a
                href="#how-it-works"
                className="underline underline-offset-2 hover:text-[#F7931A]"
              >
                How stability works, and its limits
              </a>
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              <a
                href={siteConfig.releasesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#F7931A]"
              >
                Desktop downloads
              </a>{' '}
              &middot; iOS coming soon
            </p>
          </motion.div>
        </div>

        {/* Mobile: Apple-style Touch Carousel with Snap Scrolling and Indicator Dots */}
        <div className="block sm:hidden pb-16">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none px-6 gap-6 items-center">
            {HERO_DEVICES.map((device, idx) => (
              <div
                key={device.src}
                className="snap-center shrink-0 w-[72vw] max-w-[280px] flex flex-col items-center"
              >
                <div className="w-full h-auto drop-shadow-2xl">
                  <Iphone17Pro
                    src={device.src}
                    width="100%"
                    height="100%"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F7931A]">
                    Step {idx + 1}
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">
                    {device.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Subtle Swipe Guidance Hint */}
          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-4 tracking-wide">
            Swipe to explore app features
          </p>
        </div>

        {/* Desktop / Tablet: 5-Device Showcase with Fan-Out Animation & Scroll Parallax */}
        <div className="hidden sm:flex flex-nowrap items-center justify-center gap-4 sm:gap-8 h-auto select-none overflow-visible pb-16 sm:pb-24">
          {/* Device 1 - Far Left (Receive Screen) */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: t }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 md:w-64 h-auto flex-shrink-0"
          >
            <Iphone17Pro
              src="/images/hero/receive-view.jpg"
              width="100%"
              height="100%"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Device 2 - Left (Payments Screen) */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: s }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 md:w-64 h-auto flex-shrink-0"
          >
            <Iphone17Pro
              src="/images/hero/payments-view.jpg"
              width="100%"
              height="100%"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Device 3 - Center (Hero Focus - Home Dashboard) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ y: x }}
            transition={{ duration: 1, delay: 1 }}
            className="w-44 sm:w-64 md:w-72 h-auto flex-shrink-0 z-10"
          >
            <Iphone17Pro
              src="/images/hero/home-view.jpg"
              width="100%"
              height="100%"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Device 4 - Right (BTC to USD Conversion) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: m }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 md:w-64 h-auto flex-shrink-0"
          >
            <Iphone17Pro
              src="/images/hero/btc-to-usd.jpg"
              width="100%"
              height="100%"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Device 5 - Far Right (Payment Details Screen) */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: h }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 md:w-64 h-auto flex-shrink-0"
          >
            <Iphone17Pro
              src="/images/hero/payment-details-view.jpg"
              width="100%"
              height="100%"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </main>
    </section>
  );
};
