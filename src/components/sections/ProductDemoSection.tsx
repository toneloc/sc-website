'use client';

import React, { useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Iphone17Pro } from '@/components/ui/iphone-17-pro';

/**
 * The screen cut-out of the phone frame, as a share of its 200x400 viewBox, so
 * the video keeps lining up with the bezel at any width. These are the same
 * numbers the frame's own screen rect uses.
 */
const SCREEN: React.CSSProperties = {
  left: `${(14.08 / 200) * 100}%`,
  top: `${(12.81 / 400) * 100}%`,
  width: `${(171.98 / 200) * 100}%`,
  height: `${(374.37 / 400) * 100}%`,
  borderRadius: `${(24.62 / 171.98) * 100}% / ${(24.62 / 374.37) * 100}%`,
};

export const ProductDemoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  /**
   * Once playback has started the native controls are showing, so clicks that
   * land on the video belong to them. Clicks anywhere else on the phone — the
   * bezel, the frame — still toggle.
   */
  const handleFrameClick = (event: React.MouseEvent) => {
    const video = videoRef.current;
    if (video && video.contains(event.target as Node)) return;
    toggle();
  };

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
          <div
            onClick={handleFrameClick}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] cursor-pointer"
          >
            {/*
             * The video is an ordinary absolutely-positioned element so the
             * browser hit-tests it correctly, and the frame is stacked over it
             * with a transparent screen and no pointer events, which keeps the
             * bezel, Dynamic Island and camera lens drawing on top.
             */}
            <video
              ref={videoRef}
              className="absolute object-cover bg-black"
              style={SCREEN}
              controls={started}
              playsInline
              preload="metadata"
              poster="/demo-poster.jpg"
              onPlay={() => setStarted(true)}
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>

            <Iphone17Pro
              width="100%"
              height="100%"
              screenFill="none"
              className="relative w-full h-auto drop-shadow-2xl pointer-events-none"
            />

            {/*
             * Until it is playing, the whole phone is one button. That way the
             * demo starts wherever you click — screen, bezel or frame — rather
             * than only on a small control. Once it is running this unmounts
             * and the native controls take over.
             */}
            {!started && (
              <button
                type="button"
                onClick={(event) => {
                  // Without this the click also reaches the wrapper below,
                  // which toggles a second time and pauses immediately.
                  event.stopPropagation();
                  toggle();
                }}
                aria-label="Play the product demo"
                className="absolute inset-0 z-10 flex items-center justify-center rounded-[12%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm transition-transform duration-200 hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-7 w-7 translate-x-[2px] fill-white"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};
