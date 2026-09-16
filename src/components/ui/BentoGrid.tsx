'use client';

import React from 'react';
import { CardContent } from '@/components/ui/card';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { ShieldCheck, BarChart3, Globe, Layers } from 'lucide-react';

export function BentoGrid() {
  return (
    <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6">
      <ul className="relative z-10 grid grid-cols-6 gap-4">
        {/* Card 1: Instant Continuous Settlement - Large Top Left */}
        <li className="col-span-full list-none lg:col-span-2">
          <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3 bg-zinc-50/50 dark:bg-zinc-950/40">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 shadow-xs dark:shadow-sm transition-colors duration-300">
              <CardContent className="relative m-auto size-fit pt-6 text-center">
                <div className="relative flex h-24 w-56 items-center justify-center mx-auto">
                  <svg
                    className="text-zinc-200 dark:text-zinc-800 absolute inset-0 size-full"
                    viewBox="0 0 254 104"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="mx-auto block w-fit text-5xl font-semibold text-zinc-900 dark:text-white">
                    Instant
                  </span>
                </div>
                <h3 className="mt-6 text-center text-2xl font-semibold text-zinc-900 dark:text-white">
                  Continuous Settlement
                </h3>
              </CardContent>
            </div>
          </div>
        </li>

        {/* Card 2: LDK Node Lifecycle - Top Center */}
        <li className="col-span-full list-none sm:col-span-3 lg:col-span-2">
          <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3 bg-zinc-50/50 dark:bg-zinc-950/40">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 shadow-xs dark:shadow-sm transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-zinc-200 dark:border-zinc-800 before:absolute before:-inset-2 before:rounded-full before:border before:border-zinc-200/60 dark:before:border-zinc-800/50">
                  <Layers
                    className="m-auto size-12 text-[#F7931A]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="relative z-10 mt-6 space-y-2 text-center">
                  <h3 className="text-lg font-medium transition text-zinc-900 dark:text-white">
                    Lightning Dev Kit (LDK)
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Embedded node lifecycle management with background state
                    synchronization and rapid channel recovery.
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </li>

        {/* Card 3: Transparent On-Chain - Top Right */}
        <li className="col-span-full list-none sm:col-span-3 lg:col-span-2">
          <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3 bg-zinc-50/50 dark:bg-zinc-950/40">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 shadow-xs dark:shadow-sm transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-zinc-200 dark:border-zinc-800 before:absolute before:-inset-2 before:rounded-full before:border before:border-zinc-200/60 dark:before:border-zinc-800/50">
                  <BarChart3
                    className="m-auto size-12 text-[#F7931A]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="relative z-10 mt-6 space-y-2 text-center">
                  <h3 className="text-lg font-medium transition text-zinc-900 dark:text-white">
                    Transparent On-Chain
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    All state channels and settlement adjustments execute on
                    native Bitcoin Lightning rails with full auditable
                    transparency.
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </li>

        {/* Card 4: Self-Custodial Ownership - Bottom Left (Wide 3-col) */}
        <li className="col-span-full list-none lg:col-span-3">
          <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3 bg-zinc-50/50 dark:bg-zinc-950/40">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 shadow-xs dark:shadow-sm transition-colors duration-300">
              <CardContent className="grid pt-6 sm:grid-cols-2 gap-4 items-center">
                <div className="relative z-10 flex flex-col justify-between space-y-4">
                  <div className="relative flex aspect-square size-12 rounded-full border border-zinc-200 dark:border-zinc-800 before:absolute before:-inset-2 before:rounded-full before:border before:border-zinc-200/60 dark:before:border-zinc-800/50">
                    <ShieldCheck
                      className="m-auto size-6 text-[#F7931A]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium transition text-zinc-900 dark:text-white">
                      100% Self-Custodial
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      Your keys, your Bitcoin. Funds are held in 2-of-2 multisig
                      Lightning channels with zero counterparty lockups.
                    </p>
                  </div>
                </div>

                <div className="rounded-tl-2xl relative h-fit border-l border-t border-zinc-200 dark:border-zinc-800 p-4 sm:ml-4 bg-zinc-100/80 dark:bg-zinc-950/60 transition-colors">
                  <div className="flex gap-1 mb-3">
                    <span className="block size-2 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                    <span className="block size-2 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                    <span className="block size-2 rounded-full bg-[#F7931A]/60" />
                  </div>
                  <div className="space-y-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                    <div className="text-[#F7931A]">
                      &gt; channel_balance: $100.00
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-500">
                      &gt; state: 2-of-2 multisig
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-500">
                      &gt; counterparty_risk: 0%
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </li>

        {/* Card 5: Global Lightning Coverage - Bottom Right (Wide 3-col) */}
        <li className="col-span-full list-none lg:col-span-3">
          <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3 bg-zinc-50/50 dark:bg-zinc-950/40">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 shadow-xs dark:shadow-sm transition-colors duration-300">
              <CardContent className="grid h-full pt-6 sm:grid-cols-2 gap-4 items-center">
                <div className="relative z-10 flex flex-col justify-between space-y-4">
                  <div className="relative flex aspect-square size-12 rounded-full border border-zinc-200 dark:border-zinc-800 before:absolute before:-inset-2 before:rounded-full before:border before:border-zinc-200/60 dark:before:border-zinc-800/50">
                    <Globe
                      className="m-auto size-6 text-[#F7931A]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium transition text-zinc-900 dark:text-white">
                      Global Lightning Coverage
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      Maintain USD purchasing power anywhere in the world over
                      the Bitcoin Lightning Network.
                    </p>
                  </div>
                </div>

                <div className="relative before:absolute before:inset-0 before:mx-auto before:w-px before:bg-zinc-200 dark:before:bg-zinc-800">
                  <div className="relative flex h-full flex-col justify-center space-y-4 py-2">
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border px-2 py-0.5 text-xs text-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                        24/7
                      </span>
                      <div className="size-6 ring-4 ring-white dark:ring-black rounded-full bg-[#F7931A]" />
                    </div>

                    <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                      <div className="size-7 ring-4 ring-white dark:ring-black rounded-full bg-[#E08213]" />
                      <span className="block h-fit rounded border px-2 py-0.5 text-xs text-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                        Worldwide
                      </span>
                    </div>

                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border px-2 py-0.5 text-xs text-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                        Instant
                      </span>
                      <div className="size-6 ring-4 ring-white dark:ring-black rounded-full bg-[#C6720D]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default BentoGrid;
