'use client';

import React, { useMemo } from 'react';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { faqsData, practicalFaqsData } from '@/data/faqs';
import { Container } from '@/components/ui/Container';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const FaqSection: React.FC = () => {
  // One question, once. The marquee used to render three copies of every card.
  // The mechanism question leads, with its two paragraphs kept apart. The
  // accordion wraps answers in a <p>, so these are blocks, not nested <p>s.
  const items = useMemo(
    () => [
      {
        id: 'faq-mechanism',
        question: "How can it stay steady if it's still bitcoin?",
        answer: (
          <>
            <span className="block">
              Another participant takes the opposite Bitcoin exposure. When
              Bitcoin rises, you send them bitcoin. When it falls, they send
              bitcoin to you. These payments adjust the amount of bitcoin you
              hold toward your chosen dollar target.
            </span>
            <span className="block mt-3.5">
              The trade-off is symmetric: the stabilized part of your balance
              gives up Bitcoin&apos;s upside as well as its downside. The part
              you leave in bitcoin keeps both.
            </span>
          </>
        ),
      },
      ...practicalFaqsData.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })),
      ...faqsData.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })),
    ],
    []
  );

  return (
    <section
      id="faqs-2"
      data-section="faqs-2"
      className="py-24 sm:py-28 lg:py-32 bg-white dark:bg-black transition-colors duration-300 relative"
    >
      <Container>
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-zinc-950 dark:text-white relative z-30">
              Frequently Asked
              <br />
              <span className="text-[#F7931A]">Questions.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] max-w-2xl mx-auto px-4 leading-relaxed">
              Funding, fees, limits, and how to leave. The practical answers, in
            one place.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <FaqAccordion items={items} defaultOpenIndex={null} />
        </AnimatedSection>
      </Container>
    </section>
  );
};
