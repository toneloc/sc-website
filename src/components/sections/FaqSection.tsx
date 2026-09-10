'use client';

import React, { useMemo } from 'react';
import HabitFaqScroller, {
  type FaqSectionData,
  type FaqItemData,
} from '@/components/ui/habit-faq-scroller';
import { faqsData } from '@/data/faqs';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const FaqSection: React.FC = () => {
  const faqData: FaqSectionData = useMemo(() => {
    const row1Items: FaqItemData[] = [
      { ...faqsData[0], category: 'Protocol' },
      { ...faqsData[1], category: 'Mechanism' },
      { ...faqsData[4], category: 'Architecture' },
      { ...faqsData[2], category: 'Volatility' },
      { ...faqsData[3], category: 'Channels' },
    ];

    const row2Items: FaqItemData[] = [
      { ...faqsData[5], category: 'Settlement' },
      { ...faqsData[6], category: 'Collateral' },
      { ...faqsData[7], category: 'Risk Mitigation' },
      { ...faqsData[8], category: 'Solvency' },
      { ...faqsData[9], category: 'Open Source' },
    ];

    return {
      rows: [
        {
          id: 'row-1',
          direction: 'left',
          speed: '50s',
          faqItems: row1Items,
        },
        {
          id: 'row-2',
          direction: 'right',
          speed: '45s',
          faqItems: row2Items,
        },
      ],
    };
  }, []);

  return (
    <section
      id="faqs-2"
      data-section="faqs-2"
      className="py-24 sm:py-28 lg:py-32 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedSection>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-zinc-950 dark:text-white relative z-30">
            Frequently Asked
            <br />
            <span className="text-[#F7931A]">Questions.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] max-w-2xl mx-auto px-4 leading-relaxed">
            Everything you need to know about Bitcoin USD stability, risk
            management, and the Lightning Network.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <HabitFaqScroller data={faqData} />
      </AnimatedSection>
    </section>
  );
};
