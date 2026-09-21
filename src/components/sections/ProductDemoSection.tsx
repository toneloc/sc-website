'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Iphone17Pro } from '@/components/ui/iphone-17-pro';

export const ProductDemoSection: React.FC = () => {
  return (
    <section
      id="demo"
      data-section="demo"
      className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300"
    >
      <Container>
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-5">
            Watch one balance hold its value.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] leading-relaxed">
            A $100 target is set, Bitcoin&apos;s price drops five percent, a
            Lightning payment arrives, and the dollar value stays put.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mx-auto w-full max-w-[280px] sm:max-w-[320px]">
            <Iphone17Pro
              videoSrc="/demo.mp4"
              poster="/demo-poster.jpg"
              width="100%"
              height="100%"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};
