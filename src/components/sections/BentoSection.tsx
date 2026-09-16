'use client';

import React from 'react';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const BentoSection: React.FC = () => {
  return (
    <section
      id="features"
      data-section="features"
      className="bg-white dark:bg-black py-16 md:py-28 relative transition-colors duration-300"
    >
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-zinc-950 dark:text-white relative z-30">
              Why Choose
              <br />
              <span className="text-[#F7931A]">Stable Channels?</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] max-w-2xl mx-auto px-4 leading-relaxed">
              Discover the advantages of instant, continuous USD stability
              powered by Bitcoin Lightning.
            </p>
          </div>
        </AnimatedSection>

        <BentoGrid />
      </div>
    </section>
  );
};
