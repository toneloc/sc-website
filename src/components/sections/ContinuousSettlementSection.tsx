'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface BloomwellStep {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly align: 'left' | 'right';
}

const STEPS: readonly BloomwellStep[] = [
  {
    id: 'step-1',
    number: '1',
    title: 'Continuous Settlement',
    description:
      'Balances rebalance automatically every few minutes. No manual action required. Peer-to-peer satoshi micro-adjustments keep your dollar value steady as Bitcoin price fluctuates.',
    imageSrc: '/images/how-it-works/step-1.jpg',
    imageAlt: 'Continuous settlement satoshi balance scale illustration',
    align: 'left',
  },
  {
    id: 'step-2',
    number: '2',
    title: 'Close Anytime',
    description:
      'All agreements are at-will. Either party can end the agreement and withdraw funds at any time. Continuous settlement keeps counterparty duration minimal.',
    imageSrc: '/images/how-it-works/step-2.jpg',
    imageAlt: 'Instant channel close and on-chain withdrawal illustration',
    align: 'right',
  },
  {
    id: 'step-3',
    number: '3',
    title: 'Built for Privacy and Resilience',
    description:
      'Stable Channels is a Bitcoin-native, self-custodial solution. No tokens, no banks, no third-party risk. Your money remains pure Bitcoin in a wallet you control.',
    imageSrc: '/images/how-it-works/step-3.jpg',
    imageAlt: 'Self-custodial Bitcoin shield and fortress privacy illustration',
    align: 'left',
  },
];

// Concentric decorative sunburst lines behind number badge
const ConcentricRays: React.FC = () => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    className="absolute inset-0 w-full h-full pointer-events-none text-[#F7931A]/25 dark:text-[#F7931A]/20"
  >
    <circle
      cx="100"
      cy="100"
      r="45"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeDasharray="3 3"
    />
    <circle
      cx="100"
      cy="100"
      r="65"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeDasharray="4 4"
    />
    <circle
      cx="100"
      cy="100"
      r="85"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="2 4"
    />
    <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.8" />
  </svg>
);

interface ConnectorData {
  d: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

// Mobile Vertical Connector between stacked cards
const MobileVerticalConnector: React.FC = () => (
  <div
    aria-hidden="true"
    className="md:hidden flex flex-col items-center justify-center my-4 h-16 pointer-events-none text-[#F7931A]"
  >
    <div className="w-2 h-2 rounded-full bg-[#F7931A]" />
    <div className="w-0.5 h-12 border-l-2 border-dashed border-[#F7931A]/60 my-1" />
    <div className="w-2.5 h-2.5 rounded-full bg-[#F7931A] ring-4 ring-[#F7931A]/20" />
  </div>
);

export const ContinuousSettlementSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Exact desktop connecting paths calculated relative to container
  const [path1to2, setPath1to2] = useState<ConnectorData | null>(null);
  const [path2to3, setPath2to3] = useState<ConnectorData | null>(null);

  // Compute exact coordinates connecting Card 1 right middle to Card 2 top center,
  // and Card 2 left middle to Card 3 top center
  const updateConnectorPaths = () => {
    const container = containerRef.current;
    const c1 = cardRefs.current[0];
    const c2 = cardRefs.current[1];
    const c3 = cardRefs.current[2];

    if (!container || !c1 || !c2 || !c3) return;

    // Only render curved overlay on md+ screens
    if (window.innerWidth < 768) {
      setPath1to2(null);
      setPath2to3(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const r1 = c1.getBoundingClientRect();
    const r2 = c2.getBoundingClientRect();
    const r3 = c3.getBoundingClientRect();

    // 1 -> 2
    // Start: middle of the right side of Box 1
    const start1 = {
      x: r1.right - containerRect.left,
      y: r1.top - containerRect.top + r1.height / 2,
    };
    // End: half of the second on top (top center of Box 2)
    const end1 = {
      x: r2.left - containerRect.left + r2.width / 2,
      y: r2.top - containerRect.top,
    };

    const dx1 = Math.max(end1.x - start1.x, 20);
    const dy1 = Math.max(end1.y - start1.y, 20);
    // Control points: exits horizontally right from Card 1, enters vertically down into Card 2
    const cp1x = start1.x + dx1 * 0.65;
    const cp1y = start1.y;
    const cp2x = end1.x;
    const cp2y = end1.y - dy1 * 0.65;
    const d1 = `M ${start1.x} ${start1.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end1.x} ${end1.y}`;

    // 2 -> 3
    // Start: middle of the left side of Box 2
    const start2 = {
      x: r2.left - containerRect.left,
      y: r2.top - containerRect.top + r2.height / 2,
    };
    // End: half of the third on top (top center of Box 3)
    const end2 = {
      x: r3.left - containerRect.left + r3.width / 2,
      y: r3.top - containerRect.top,
    };

    const dx2 = Math.max(start2.x - end2.x, 20);
    const dy2 = Math.max(end2.y - start2.y, 20);
    // Control points: exits horizontally left from Card 2, enters vertically down into Card 3
    const cp3x = start2.x - dx2 * 0.65;
    const cp3y = start2.y;
    const cp4x = end2.x;
    const cp4y = end2.y - dy2 * 0.65;
    const d2 = `M ${start2.x} ${start2.y} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${end2.x} ${end2.y}`;

    setPath1to2({ d: d1, start: start1, end: end1 });
    setPath2to3({ d: d2, start: start2, end: end2 });
  };

  useLayoutEffect(() => {
    updateConnectorPaths();

    const handleResize = () => {
      updateConnectorPaths();
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      updateConnectorPaths();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    cardRefs.current.forEach((el) => {
      if (el) resizeObserver.observe(el);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Intersection Observer for scroll snapping & card highlight focus
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStepIndex(index);
            }
          });
        },
        {
          root: null,
          rootMargin: '-25% 0px -25% 0px',
          threshold: 0.3,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section
      id="how-it-works"
      data-section="how-it-works"
      className="py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden snap-y snap-proximity"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-radial from-[#F7931A]/6 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Bloomwell container width: max-w-[54rem] (864px) */}
      <Container className="max-w-[54rem] relative">
        {/* Header - No emblem or badge */}
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-zinc-950 dark:text-white">
              Engineered for Stability.
              <br />
              <span className="text-[#F7931A]">100% Bitcoin-Native.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] max-w-2xl mx-auto px-4 leading-relaxed">
              Scroll to experience how synthetic dollar agreements settle
              continuously across standard 2-of-2 Lightning channels with zero
              bank intermediaries or token issuance.
            </p>
          </div>
        </AnimatedSection>

        {/* Step Cards Container with Dynamic SVG Connector Overlay */}
        <div ref={containerRef} className="relative space-y-12 md:space-y-16">
          {/* Desktop SVG Dotted Paths Overlay */}
          <svg
            aria-hidden="true"
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
          >
            <defs>
              <linearGradient
                id="hiw-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F7931A" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#F7931A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F7931A" stopOpacity="1" />
              </linearGradient>
              <linearGradient
                id="hiw-gradient-2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F7931A" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#F7931A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F7931A" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Path from Box 1 (middle right) to Box 2 (top center) */}
            {path1to2 && (
              <g>
                <path
                  d={path1to2.d}
                  fill="none"
                  stroke="url(#hiw-gradient-1)"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
                {/* Start terminal circle at Box 1 right middle */}
                <circle
                  cx={path1to2.start.x}
                  cy={path1to2.start.y}
                  r="4"
                  fill="#F7931A"
                />
                {/* End terminal circle at Box 2 top center */}
                <circle
                  cx={path1to2.end.x}
                  cy={path1to2.end.y}
                  r="5"
                  fill="#F7931A"
                />
                <circle
                  cx={path1to2.end.x}
                  cy={path1to2.end.y}
                  r="10"
                  fill="none"
                  stroke="#F7931A"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
              </g>
            )}

            {/* Path from Box 2 (middle left) to Box 3 (top center) */}
            {path2to3 && (
              <g>
                <path
                  d={path2to3.d}
                  fill="none"
                  stroke="url(#hiw-gradient-2)"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
                {/* Start terminal circle at Box 2 left middle */}
                <circle
                  cx={path2to3.start.x}
                  cy={path2to3.start.y}
                  r="4"
                  fill="#F7931A"
                />
                {/* End terminal circle at Box 3 top center */}
                <circle
                  cx={path2to3.end.x}
                  cy={path2to3.end.y}
                  r="5"
                  fill="#F7931A"
                />
                <circle
                  cx={path2to3.end.x}
                  cy={path2to3.end.y}
                  r="10"
                  fill="none"
                  stroke="#F7931A"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
              </g>
            )}
          </svg>

          {/* STEP 1 HOLDER (Left Aligned, max-w-[40rem] card) */}
          <div
            id="step-1"
            className="hiw_card-holder relative flex justify-start w-full snap-center scroll-mt-24 sm:scroll-mt-32 md:scroll-mt-36"
          >
            <motion.div
              ref={(el) => {
                cardRefs.current[0] = el;
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`hiw_card w-full max-w-[40rem] rounded-[2rem] border-[8px] transition-all duration-500 bg-[#FAF9F5] dark:bg-[#121214] p-5 sm:p-6 shadow-xl relative z-20 ${
                activeStepIndex === 0
                  ? 'border-[#F7931A] dark:border-[#F7931A] shadow-2xl shadow-[#F7931A]/10 scale-100 ring-4 ring-[#F7931A]/20'
                  : 'border-[#F7931A]/20 dark:border-zinc-800 opacity-85 hover:opacity-100 scale-[0.99]'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Content */}
                <div className="flex flex-col justify-center items-center text-center p-2 sm:p-3">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                    <ConcentricRays />
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300 shadow-md flex items-center justify-center relative z-10 ${
                        activeStepIndex === 0
                          ? 'border-[#F7931A] bg-white dark:bg-[#1c1c1f] ring-4 ring-[#F7931A]/20'
                          : 'border-[#F7931A]/60 bg-white dark:bg-[#1c1c1f]'
                      }`}
                    >
                      <span className="font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
                        1
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
                    Continuous Settlement
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-[#86868b] leading-relaxed">
                    Balances rebalance automatically every few minutes. No
                    manual action required.
                  </p>
                </div>

                {/* Image */}
                <div className="w-full aspect-square rounded-2xl border-2 border-[#F7931A]/30 dark:border-zinc-700 bg-white dark:bg-black/40 overflow-hidden relative shadow-inner group">
                  <Image
                    src="/images/how-it-works/step-1.jpg"
                    alt="Continuous settlement satoshi balance scale illustration"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 dark:to-black/30 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile connector between 1 and 2 */}
          <MobileVerticalConnector />

          {/* STEP 2 HOLDER (Right Aligned, max-w-[40rem] card) */}
          <div
            id="step-2"
            className="hiw_card-holder is-right relative flex justify-end w-full snap-center scroll-mt-24 sm:scroll-mt-32 md:scroll-mt-36"
          >
            <motion.div
              ref={(el) => {
                cardRefs.current[1] = el;
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`hiw_card w-full max-w-[40rem] rounded-[2rem] border-[8px] transition-all duration-500 bg-[#FAF9F5] dark:bg-[#121214] p-5 sm:p-6 shadow-xl relative z-20 ${
                activeStepIndex === 1
                  ? 'border-[#F7931A] dark:border-[#F7931A] shadow-2xl shadow-[#F7931A]/10 scale-100 ring-4 ring-[#F7931A]/20'
                  : 'border-[#F7931A]/20 dark:border-zinc-800 opacity-85 hover:opacity-100 scale-[0.99]'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Image (Left on desktop) */}
                <div className="w-full aspect-square rounded-2xl border-2 border-[#F7931A]/30 dark:border-zinc-700 bg-white dark:bg-black/40 overflow-hidden relative shadow-inner group order-2 md:order-1">
                  <Image
                    src="/images/how-it-works/step-2.jpg"
                    alt="Instant channel close and on-chain withdrawal illustration"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 dark:to-black/30 pointer-events-none" />
                </div>

                {/* Content (Right on desktop) */}
                <div className="flex flex-col justify-center items-center text-center p-2 sm:p-3 order-1 md:order-2">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                    <ConcentricRays />
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300 shadow-md flex items-center justify-center relative z-10 ${
                        activeStepIndex === 1
                          ? 'border-[#F7931A] bg-white dark:bg-[#1c1c1f] ring-4 ring-[#F7931A]/20'
                          : 'border-[#F7931A]/60 bg-white dark:bg-[#1c1c1f]'
                      }`}
                    >
                      <span className="font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
                        2
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
                    Close Anytime
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-[#86868b] leading-relaxed">
                    All agreements are at-will. Either party can end the
                    agreement and withdraw funds at any time. Continuous
                    settlement minimizes counterparty risk.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile connector between 2 and 3 */}
          <MobileVerticalConnector />

          {/* STEP 3 HOLDER (Left Aligned, max-w-[40rem] card) */}
          <div
            id="step-3"
            className="hiw_card-holder relative flex justify-start w-full snap-center scroll-mt-24 sm:scroll-mt-32 md:scroll-mt-36"
          >
            <motion.div
              ref={(el) => {
                cardRefs.current[2] = el;
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`hiw_card w-full max-w-[40rem] rounded-[2rem] border-[8px] transition-all duration-500 bg-[#FAF9F5] dark:bg-[#121214] p-5 sm:p-6 shadow-xl relative z-20 ${
                activeStepIndex === 2
                  ? 'border-[#F7931A] dark:border-[#F7931A] shadow-2xl shadow-[#F7931A]/10 scale-100 ring-4 ring-[#F7931A]/20'
                  : 'border-[#F7931A]/20 dark:border-zinc-800 opacity-85 hover:opacity-100 scale-[0.99]'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Content */}
                <div className="flex flex-col justify-center items-center text-center p-2 sm:p-3">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                    <ConcentricRays />
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300 shadow-md flex items-center justify-center relative z-10 ${
                        activeStepIndex === 2
                          ? 'border-[#F7931A] bg-white dark:bg-[#1c1c1f] ring-4 ring-[#F7931A]/20'
                          : 'border-[#F7931A]/60 bg-white dark:bg-[#1c1c1f]'
                      }`}
                    >
                      <span className="font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
                        3
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
                    Built for Privacy and Resilience
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-[#86868b] leading-relaxed">
                    Stable Channels is a Bitcoin-native, self-custodial
                    solution. No tokens, no banks, no third-party risk.
                  </p>
                </div>

                {/* Image */}
                <div className="w-full aspect-square rounded-2xl border-2 border-[#F7931A]/30 dark:border-zinc-700 bg-white dark:bg-black/40 overflow-hidden relative shadow-inner group">
                  <Image
                    src="/images/how-it-works/step-3.jpg"
                    alt="Self-custodial Bitcoin shield and fortress privacy illustration"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 dark:to-black/30 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
