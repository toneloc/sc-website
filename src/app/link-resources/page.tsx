import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Mic,
  Video,
  Code,
  Send,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Footer } from '@/components/layout/Footer';
import { resourcesData } from '@/data/resources';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Links & Resources - Stable Channels',
  description:
    'Explore technical deep dives, podcast interviews, conference presentations, and demos for Stable Channels.',
};

const getResourceIcon = (id: string) => {
  if (id.includes('demo') || id.includes('conf'))
    return <Video className="w-5 h-5 text-[#F7931A]" />;
  if (id.includes('podcast') || id.includes('livera'))
    return <Mic className="w-5 h-5 text-[#F7931A]" />;
  if (id.includes('twitter'))
    return <MessageCircle className="w-5 h-5 text-[#F7931A]" />;
  if (id.includes('github')) return <Code className="w-5 h-5 text-[#F7931A]" />;
  if (id.includes('telegram'))
    return <Send className="w-5 h-5 text-[#F7931A]" />;
  return <FileText className="w-5 h-5 text-[#F7931A]" />;
};

export default function LinkResourcesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-[#F7931A]/20 selection:text-[#F7931A] transition-colors duration-300">
      <main className="py-16 md:py-24">
        <Container className="max-w-5xl">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C6720D] dark:text-[#F7931A] hover:underline mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Stable Channels</span>
          </Link>

          {/* Header */}
          <div className="mb-16">
            <div className="mb-4">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#C6720D] dark:text-[#F7931A]">
                Resources &amp; Demos
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
              Links and Resources
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-[#86868b] max-w-2xl leading-relaxed">
              Explore technical specifications, podcast deep dives, conference
              talks, and interactive video demos demonstrating native Bitcoin
              dollar stability.
            </p>
          </div>

          {/* Resources List / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {resourcesData.map((res) => (
              <a
                key={res.id}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 hover:border-[#F7931A]/40 dark:hover:border-[#F7931A]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getResourceIcon(res.id)}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {res.title}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-[#C6720D] dark:group-hover:text-[#F7931A] transition-colors flex items-center gap-2">
                    <span>{res.linkText}</span>
                  </h2>

                  <p className="text-sm text-zinc-600 dark:text-[#86868b] leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center gap-1.5 text-xs font-semibold text-[#C6720D] dark:text-[#F7931A]">
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
