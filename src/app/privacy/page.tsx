import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms - Stable Channels',
  description:
    'Privacy Policy and Terms of Service for Stable Channels - Self-custodial Bitcoin Lightning wallet.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between selection:bg-[#F7931A]/20 selection:text-[#F7931A]">
      <main className="py-16 md:py-24">
        <Container className="max-w-3xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F7931A] hover:text-[#F7931A] hover:underline mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stable Channels</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Privacy Policy &amp; Terms of Service
          </h1>
          <p className="text-sm text-zinc-400 mb-10">Last updated: July 2026</p>

          <div className="bg-[#F7931A]/10 border-l-4 border-[#F7931A] p-5 rounded-r-xl mb-12">
            <p className="text-sm text-[#F7931A] leading-relaxed font-medium">
              <strong>Important Notice:</strong> Stable Channels is a
              self-custodial Bitcoin wallet. You retain full control of your
              private keys and funds. If you do not understand the risks of
              self-custody and Lightning Network usage, do not use this app.
            </p>
          </div>

          <div className="max-w-none space-y-8 text-base text-zinc-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Introduction
              </h2>
              <p>
                Stable Channels is a self-custodial Bitcoin Lightning wallet
                designed to enable programmable payment flows. We do not have
                custody of your funds at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Not a Cryptocurrency Exchange
              </h2>
              <p className="mb-3">
                Stable Channels is not a cryptocurrency exchange, brokerage,
                custodian, or money services business. We do not buy, sell, or
                exchange cryptocurrency or fiat currency on anyone&apos;s
                behalf, do not operate an order book or matching engine, and do
                not offer fiat on- or off-ramps. The app is self-custodial
                software that lets peers manage Bitcoin volatility and exposure
                directly with one another over the Lightning Network.
              </p>
              <p>
                Everything in Stable Channels is self-custody: at no point do
                we, or any third party, hold, control, or take possession of
                your funds.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Data Collection
              </h2>
              <p className="mb-4">
                We collect a limited set of data necessary to operate the
                app&apos;s core functionality.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">
                Types of Data Collected
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Financial Information (Other Financial Info)</strong>{' '}
                  - Payment-related data (e.g., routed payments, channel
                  activity) processed and stored to enable Lightning
                  functionality.
                </li>
                <li>
                  <strong>Identifiers (User ID)</strong> - Pseudonymous
                  identifiers (such as node identifiers or session-related
                  identifiers) used to associate activity with a specific wallet
                  instance.
                </li>
                <li>
                  <strong>Usage Data (Other Usage Data)</strong> - Operational
                  and diagnostic data related to app performance and payment
                  execution.
                </li>
                <li>
                  <strong>Push Notification Tokens</strong> - Device tokens are
                  stored to deliver payment and channel-related notifications.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-2">
                How Data Is Used
              </h3>
              <p className="mb-2">Data is used strictly for:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Enabling Lightning payments and channel management</li>
                <li>Associating payments with a wallet/session</li>
                <li>Maintaining service reliability and performance</li>
                <li>Delivering push notifications</li>
              </ul>
              <p>
                We do not use data for advertising, marketing, or profiling
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Data Linkage
              </h2>
              <p className="mb-3">
                Collected data may be linked to a user&apos;s wallet or device
                identifier to ensure correct operation of payment and channel
                functionality.
              </p>
              <p>
                We do not attempt to associate this data with real-world
                identity (such as name, email, or physical identity).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">No Tracking</h2>
              <p className="mb-2">We do not:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Track users across apps or websites</li>
                <li>Share data with advertising networks or data brokers</li>
                <li>Use third-party data for profiling</li>
              </ul>
              <p>
                All data use is strictly first-party and limited to app
                functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Third-Party Services
              </h2>
              <p className="mb-2">The app interacts with:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>
                  Liquidity Service Providers (LSPs) for channel operations
                </li>
                <li>
                  Public price APIs (Kraken, Bitstamp, Coinbase, CoinGecko,
                  Blockchain.com)
                </li>
              </ul>
              <p>
                These services are required for core functionality. We do not
                use third-party advertising or tracking SDKs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Self-Custody
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Private keys are generated and stored on your device</li>
                <li>We cannot access, recover, or control your funds</li>
                <li>
                  You are solely responsible for securing your seed phrase
                </li>
                <li>
                  All funds remain under your exclusive control at all times -
                  there are no custodial accounts or balances held by us or
                  anyone else
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Operational Requirements
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Your device must be periodically reachable for payment
                  coordination
                </li>
                <li>Push notifications may be used to wake the app</li>
                <li>Extended offline periods may impact channel stability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Channel Duration
              </h2>
              <p>
                Channels are not guaranteed to remain open. While we target a
                minimum duration, channels may close due to protocol conditions
                or counterparty actions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                No Guarantees
              </h2>
              <p className="mb-2">
                Stable Channels is experimental software provided &quot;as
                is&quot;:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>No guarantees of uptime, stability, or performance</li>
                <li>Transactions are irreversible</li>
                <li>You assume all risk, including potential loss of funds</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Open Source</h2>
              <p>
                Source code:{' '}
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {siteConfig.githubUrl}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Changes</h2>
              <p>We may update this policy. Updates will be posted here.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
              <p>
                <a
                  href="mailto:tony@stablechannels.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  tony@stablechannels.com
                </a>
              </p>
            </section>
          </div>
        </Container>
      </main>

      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <Container className="max-w-3xl text-center text-xs text-gray-400">
          <p>
            © {siteConfig.year} {siteConfig.name}. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
