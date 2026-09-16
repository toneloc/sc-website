'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { TextFlippingBoard } from '@/components/ui/text-flipping-board';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const SETTLEMENT_MESSAGES: string[] = [
  'BTC VOLATILITY: HIGH\nUSD BALANCE: $100.00\nSETTLED CONTINUOUSLY',
  'PEER TO PEER MONEY\nZERO COUNTERPARTY\n100% LIGHTNING NATIVE',
  'NO SYNTHETIC TOKENS\nNO CENTRAL BANK\nSELF CUSTODIAL DOLLAR',
  'INSTANT REBALANCING\nMICRO TRANSACTIONS\nSATOSHI BACKED VALUE',
];

export const LiveTickerSection: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  const nextMessage = useCallback(() => {
    setMsgIdx((prev) => (prev + 1) % SETTLEMENT_MESSAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextMessage, 5500);
    return () => clearInterval(timer);
  }, [nextMessage]);

  return (
    <section
      id="live-ticker"
      data-section="live-ticker"
      className="py-24 bg-white dark:bg-black text-zinc-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none dark:block hidden" />

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto space-y-10 text-center">
          <AnimatedSection>
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Continuous Settlement in Motion
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Unlike traditional stablecoins or margin exchanges that rely on
                periodic audits and centralized liquidation cascades, Stable
                Channels continuously updates channel state across the Lightning
                Network.
              </p>
            </div>
          </AnimatedSection>

          {/* Split-Flap Ticker Board */}
          <motion.div
            className="relative pt-2"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <TextFlippingBoard
              text={SETTLEMENT_MESSAGES[msgIdx]}
              duration={1.1}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
