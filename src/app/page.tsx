import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { BentoSection } from '@/components/sections/BentoSection';
import { ContinuousSettlementSection } from '@/components/sections/ContinuousSettlementSection';
import { LiveTickerSection } from '@/components/sections/LiveTickerSection';
import { GetStartedSection } from '@/components/sections/GetStartedSection';
import { FaqSection } from '@/components/sections/FaqSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-[#F7931A]/20 selection:text-[#F7931A] transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <BentoSection />
        <ContinuousSettlementSection />
        <LiveTickerSection />
        <GetStartedSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
