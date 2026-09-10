'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  FileText,
  Mic,
  MessageCircle,
  Code,
  Send,
  Video,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { resourcesData } from '@/data/resources';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

const getIcon = (id: string) => {
  if (id.includes('demo') || id.includes('conf'))
    return <Video className="w-5 h-5 sm:w-6 sm:h-6" />;
  if (id.includes('podcast') || id.includes('livera'))
    return <Mic className="w-5 h-5 sm:w-6 sm:h-6" />;
  if (id.includes('twitter'))
    return <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />;
  if (id.includes('github')) return <Code className="w-5 h-5 sm:w-6 sm:h-6" />;
  if (id.includes('telegram'))
    return <Send className="w-5 h-5 sm:w-6 sm:h-6" />;
  return <FileText className="w-5 h-5 sm:w-6 sm:h-6" />;
};

const getSpanClass = (index: number) => {
  switch (index) {
    case 0:
      return 'md:col-span-2 lg:col-span-2'; // Tech Deep Dive
    case 1:
      return 'col-span-1 md:col-span-1'; // Podcast
    case 2:
      return 'col-span-1 md:col-span-1'; // Twitter
    case 3:
      return 'col-span-1 md:col-span-1'; // Demo eCash
    case 4:
      return 'col-span-1 md:col-span-1'; // Demo Frontend
    case 5:
      return 'md:col-span-2 lg:col-span-2'; // Atlantis Conf
    case 6:
      return 'md:col-span-2 lg:col-span-2'; // GitHub
    case 7:
      return 'md:col-span-2 lg:col-span-2'; // Telegram
    default:
      return 'col-span-1';
  }
};

export const ResourcesSection: React.FC = () => {
  return (
    <section
      id="reviews-2"
      data-section="reviews-2"
      className="py-24 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
    >
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none dark:block hidden" />

      <Container className="relative z-10">
        <AnimatedSection>
          <SectionHeader
            title="Links and Resources"
            subtitle="Explore demos, deep dives, and technical specifications to understand how Stable Channels achieves native Bitcoin stability."
            className="mb-16"
          />
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {resourcesData.map((res, index) => (
            <motion.a
              key={res.id}
              custom={index}
              variants={cardVariants}
              href={res.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-zinc-50/70 dark:bg-[#121214] border border-zinc-200 dark:border-white/[0.08] hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 ${getSpanClass(index)}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-white/[0.1] flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-[#F7931A] group-hover:scale-105 transition-all duration-300">
                    {getIcon(res.id)}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200">
                    <ExternalLink className="w-4 h-4 text-[#F7931A]" />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xs font-bold tracking-wider text-[#F7931A] uppercase mb-2">
                    {res.title}
                  </h3>
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-[#F7931A] transition-colors duration-200">
                    {res.linkText}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-[#86868b] leading-relaxed line-clamp-3">
                    {res.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
