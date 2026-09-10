'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react';
import { Container } from '@/components/ui/Container';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import {
  FoldablePhone,
  PhoneDevice,
  useFoldablePhone,
} from '@/components/ui/iphone-duo';

interface WorkflowStep {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  readonly metric: string;
  readonly targetProgress: number;
}

const STEPS: readonly WorkflowStep[] = [
  {
    id: 'step-channel',
    number: '01',
    title: 'Open Multi-Sig Channel',
    description:
      'Two counterparties deposit native Bitcoin into a standard 2-of-2 Lightning channel. Neither party surrenders custody to banks, custodians, or bridge protocols.',
    tag: 'Self-Custody',
    metric: '2-of-2 Multisig',
    targetProgress: 0.0,
  },
  {
    id: 'step-lock',
    number: '02',
    title: 'Fix Purchasing Power',
    description:
      'You lock in a fixed USD balance in satoshis. Your counterparty assumes inverse Bitcoin exposure, establishing synthetic dollar stability without minting new tokens.',
    tag: 'Dollar Stability',
    metric: 'USD-Pegged Satoshis',
    targetProgress: 0.35,
  },
  {
    id: 'step-balance',
    number: '03',
    title: 'Continuous Balance Adjustment',
    description:
      'As Bitcoin price moves, satoshis rebalance automatically between channel balances. Price appreciation transfers gains to your peer; drops transfer sats to preserve your USD value.',
    tag: 'Autonomous',
    metric: 'Real-Time Flow',
    targetProgress: 0.7,
  },
  {
    id: 'step-settlement',
    number: '04',
    title: 'Instant Lightning Settlement',
    description:
      'Micro-payments settle continuously over the Lightning Network. Either party can unilaterally close the channel and withdraw funds to on-chain Bitcoin at any time.',
    tag: 'Zero Intermediaries',
    metric: 'Instant Finality',
    targetProgress: 1.0,
  },
];

interface StepItemProps {
  readonly step: WorkflowStep;
  readonly isActive: boolean;
  readonly onClick: () => void;
}

const StepItem: React.FC<StepItemProps> = ({ step, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`cursor-pointer touch-manipulation rounded-2xl p-6 sm:p-7 transition-all duration-300 relative border select-none ${
        isActive
          ? 'bg-zinc-900 text-white dark:bg-[#121214] border-zinc-700/80 dark:border-white/20 shadow-2xl shadow-black/20 ring-1 ring-[#F7931A]/40'
          : 'bg-zinc-50/70 dark:bg-zinc-900/30 text-zinc-900 dark:text-zinc-100 border-zinc-200/70 dark:border-white/[0.05] opacity-50 hover:opacity-90'
      }`}
    >
      {/* Active Accent Border Indicator */}
      {isActive && (
        <motion.div
          layoutId="step-indicator"
          className="absolute left-0 top-3 bottom-3 w-1 bg-[#F7931A] rounded-r"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}

      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-xs font-bold tracking-widest px-2.5 py-1 rounded-md transition-colors ${
              isActive
                ? 'bg-[#F7931A] text-black'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {step.number}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
            {step.title}
          </h3>
        </div>

        <span
          className={`text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-colors ${
            isActive
              ? 'border-white/20 text-zinc-300 bg-white/5'
              : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'
          }`}
        >
          {step.tag}
        </span>
      </div>

      <p
        className={`text-sm sm:text-base leading-relaxed pl-1 transition-colors ${
          isActive ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'
        }`}
      >
        {step.description}
      </p>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#F7931A]"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7931A] animate-ping" />
            <span>Protocol State: {step.metric}</span>
          </div>
          <span className="text-[11px] text-zinc-400 font-sans">
            Tap to toggle fold
          </span>
        </motion.div>
      )}
    </div>
  );
};

const ScrollDuoSynchronizer: React.FC<{
  readonly activeIndex: number;
  readonly onStepClick: (index: number) => void;
  readonly smoothProgress: MotionValue<number>;
  readonly isManualRef: React.MutableRefObject<boolean>;
}> = ({ activeIndex, onStepClick, smoothProgress, isManualRef }) => {
  const { progress } = useFoldablePhone();

  // Pipe smoothed scroll progress directly into the 3D phone fold when not in manual click mode
  useMotionValueEvent(smoothProgress, 'change', (latest: number) => {
    if (!isManualRef.current) {
      progress.set(Math.max(0, Math.min(1, latest)));
    }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      {/* Narrative Steps Column */}
      <div className="lg:col-span-6 space-y-5 sm:space-y-7 pt-2 pb-12 lg:pb-32 order-2 lg:order-1">
        {STEPS.map((step, index) => (
          <div key={step.id} id={`narrative-${step.id}`}>
            <StepItem
              step={step}
              isActive={activeIndex === index}
              onClick={() => onStepClick(index)}
            />
          </div>
        ))}
      </div>

      {/* Sticky 3D Phone Showcase Stage */}
      <div className="lg:col-span-6 sticky top-20 sm:top-24 lg:top-28 lg:h-[calc(100vh-8rem)] flex flex-col items-center justify-center w-full z-20 order-1 lg:order-2">
        {/* Soft Ambient Apple Studio Spotlight */}
        <div
          aria-hidden="true"
          className="absolute -inset-10 sm:-inset-16 bg-radial from-[#F7931A]/18 via-[#F7931A]/4 to-transparent rounded-full blur-3xl pointer-events-none"
        />

        {/* Scaled-Up Phone Container */}
        <div className="w-full max-w-[460px] sm:max-w-[580px] lg:max-w-[700px] xl:max-w-[780px] relative pointer-events-auto">
          <PhoneDevice
            modelSrc="/models/iphone-duo.glb"
            screenSrc="/wallpapers/sc-wallpaper.svg"
            coverSrc="/wallpapers/sc-wallpaper.svg"
            screenOverlaySrc="/wallpapers/api-apps.svg"
            coverOverlaySrc="/wallpapers/api-cover.svg"
            revealSrc="/wallpapers/home-photo.svg"
            blur={48}
            parallax={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isManualRef = useRef<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Track scroll position through the section container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.55', 'end 0.9'],
  });

  // Map scroll progress to fold range (0.0 = closed, 1.0 = fully open)
  const rawProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  // Smooth with Apple-style spring physics
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  // Re-enable scroll-driven animation when page is scrolled
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastScroll) > 12) {
        isManualRef.current = false;
        lastScroll = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active step based on scroll progress
  useMotionValueEvent(smoothProgress, 'change', (latest: number) => {
    if (!isManualRef.current) {
      let index = 0;
      if (latest >= 0.75) {
        index = 3;
      } else if (latest >= 0.48) {
        index = 2;
      } else if (latest >= 0.2) {
        index = 1;
      } else {
        index = 0;
      }
      setActiveStepIndex(index);
    }
  });

  return (
    <section
      ref={sectionRef}
      id="content-1"
      data-section="content-1"
      className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-300 relative overflow-visible"
    >
      <Container>
        {/* Header styled identically to BentoSection ("Why Choose Stable Channels?") */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-zinc-950 dark:text-white relative z-30">
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

        {/* Scrollytelling Showcase */}
        <FoldablePhone duration={1.2} className="w-full">
          <SectionContent
            activeStepIndex={activeStepIndex}
            setActiveStepIndex={setActiveStepIndex}
            smoothProgress={smoothProgress}
            isManualRef={isManualRef}
          />
        </FoldablePhone>
      </Container>
    </section>
  );
};

const SectionContent: React.FC<{
  activeStepIndex: number;
  setActiveStepIndex: (index: number) => void;
  smoothProgress: MotionValue<number>;
  isManualRef: React.MutableRefObject<boolean>;
}> = ({ activeStepIndex, setActiveStepIndex, smoothProgress, isManualRef }) => {
  const { animateTo, progress } = useFoldablePhone();

  // Tapping blocks unfolds or folds the phone smoothly
  const handleStepClick = useCallback(
    (index: number) => {
      isManualRef.current = true;
      const targetStep = STEPS[index];
      const currentProgress = progress.get();

      if (activeStepIndex === index) {
        // Toggle: if currently open, fold closed (0.0); if closed, open to target
        const nextTarget =
          currentProgress > 0.15 ? 0.0 : targetStep.targetProgress || 1.0;
        animateTo(nextTarget, 0.7);
      } else {
        setActiveStepIndex(index);
        animateTo(targetStep.targetProgress, 0.7);
      }
    },
    [activeStepIndex, animateTo, progress, setActiveStepIndex, isManualRef]
  );

  return (
    <ScrollDuoSynchronizer
      activeIndex={activeStepIndex}
      onStepClick={handleStepClick}
      smoothProgress={smoothProgress}
      isManualRef={isManualRef}
    />
  );
};
