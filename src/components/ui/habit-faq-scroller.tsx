'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, ExternalLink, HelpCircle } from 'lucide-react';

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
  linkText?: string;
  linkHref?: string;
}

export interface FaqRowData {
  id: string;
  speed?: string;
  direction?: 'left' | 'right';
  faqItems: FaqItemData[];
}

export interface FaqSectionData {
  mainTitle?: string;
  mainSubtitle?: string;
  badge?: string;
  rows: FaqRowData[];
}

interface FaqCardProps {
  item: FaqItemData;
  index: number;
  onSelect: (item: FaqItemData) => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ item, index, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className="w-[320px] sm:w-[380px] lg:w-[420px] flex-shrink-0 p-5 sm:p-6 rounded-2xl cursor-pointer select-none transition-all duration-300 group flex flex-col justify-between text-left bg-zinc-50 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/[0.08] hover:border-[#F7931A]/60 dark:hover:border-[#F7931A]/60 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-[0_0_24px_rgba(247,147,26,0.12)] hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F7931A]/10 text-[#C6720D] dark:text-[#F7931A] tracking-wider">
            {item.category ?? `FAQ ${(index % 10) + 1}`}
          </span>
          <span className="text-zinc-400 group-hover:text-[#F7931A] transition-colors text-xs font-mono">
            View Details
          </span>
        </div>

        <h4 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-white mb-2.5 line-clamp-2 group-hover:text-zinc-950 dark:group-hover:text-white">
          {item.question}
        </h4>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
          {item.answer}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
        <span className="font-medium group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
          Click to expand
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-[#F7931A] transition-colors" />
      </div>
    </div>
  );
};

interface FaqRowProps {
  row: FaqRowData;
  rowIndex: number;
  onSelectItem: (item: FaqItemData) => void;
}

const FaqRow: React.FC<FaqRowProps> = ({ row, rowIndex, onSelectItem }) => {
  const directionClass =
    row.direction === 'right'
      ? 'animate-faq-scroll-right'
      : 'animate-faq-scroll-left';
  const duration = row.speed ?? (rowIndex % 2 === 0 ? '55s' : '45s');

  // Duplicate the items twice to ensure a seamless infinite marquee
  const duplicatedItems = [...row.faqItems, ...row.faqItems, ...row.faqItems];

  return (
    <div className="relative w-full overflow-hidden py-2 group/track">
      <div
        className={`flex items-stretch gap-4 sm:gap-5 w-max ${directionClass} group-hover/track:[animation-play-state:paused]`}
        style={{ animationDuration: duration }}
      >
        {duplicatedItems.map((item, index) => (
          <FaqCard
            key={`${row.id}-${item.id}-${index}`}
            item={item}
            index={index}
            onSelect={onSelectItem}
          />
        ))}
      </div>
    </div>
  );
};

export interface HabitFaqScrollerProps {
  data: FaqSectionData;
  className?: string;
}

export default function HabitFaqScroller({
  data,
  className = '',
}: HabitFaqScrollerProps) {
  const [selectedItem, setSelectedItem] = useState<FaqItemData | null>(null);

  return (
    <div className={`w-full relative ${className}`}>
      {/* Header if provided */}
      {data.mainTitle && (
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-zinc-950 dark:text-white relative z-30">
            {data.mainTitle}
          </h2>
          {data.mainSubtitle && (
            <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] max-w-2xl mx-auto px-4 leading-relaxed">
              {data.mainSubtitle}
            </p>
          )}
        </div>
      )}

      {/* Horizontal Scroller Container with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="space-y-4 sm:space-y-6">
          {data.rows.map((row, index) => (
            <FaqRow
              key={row.id}
              row={row}
              rowIndex={index}
              onSelectItem={setSelectedItem}
            />
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white dark:bg-[#151518] rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-white/[0.12] z-10"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#F7931A]/10 text-[#C6720D] dark:text-[#F7931A] tracking-wider">
                  {selectedItem.category ?? 'FAQ'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-4">
                {selectedItem.question}
              </h3>

              <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-3">
                <p>{selectedItem.answer}</p>
              </div>

              {selectedItem.linkHref && (
                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">
                    Reference
                  </span>
                  <Link
                    href={selectedItem.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F7931A] hover:underline"
                  >
                    <span>{selectedItem.linkText ?? 'Learn More'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes faq-scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        @keyframes faq-scroll-right {
          0% {
            transform: translateX(-33.333333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-faq-scroll-left {
          animation: faq-scroll-left linear infinite;
        }
        .animate-faq-scroll-right {
          animation: faq-scroll-right linear infinite;
        }
      `}</style>
    </div>
  );
}
