'use client';

import React, { useEffect, useRef, useState, useId, useCallback } from 'react';
import paths from './balance-scale-paths.json';

interface BalanceScaleHeroProps {
  size?: number;
  className?: string;
  baseColor?: string;
  initialDelay?: number;
}

export const BalanceScaleHero: React.FC<BalanceScaleHeroProps> = ({
  size = 72,
  className = '',
  baseColor = '#F7931A',
  initialDelay = 0.0, // Fires immediately on mount with zero delay
}) => {
  const gradientId = useId();
  const maskId = useId();

  // Kinematics parameters (matching iOS BalanceScaleKinematics.swift)
  const FULCRUM_X = 511.5;
  const FULCRUM_Y = 361.0;
  const LEFT_PIVOT_X = 273.0;
  const LEFT_PIVOT_Y = 361.0;
  const LEFT_ARM_DX = LEFT_PIVOT_X - FULCRUM_X; // -238.5

  const SHIMMER_DURATION = 0.85; // 0.85s radiant sweep
  const NUM_CYCLES = 2.0; // 2 full harmonic oscillations
  const CYCLE_PERIOD = 1.1; // 1.1s per full oscillation wave (up & down)
  const SETTLE_DURATION = 1.2; // 1.2s exponential settling wave
  const MAX_ANGLE_DEGREES = 5.0; // Peak tilt angle in degrees

  const shimmerEnd = initialDelay + SHIMMER_DURATION;
  const oscillationEnd = shimmerEnd + NUM_CYCLES * CYCLE_PERIOD;
  const totalDuration = oscillationEnd + SETTLE_DURATION;

  const [angle, setAngle] = useState(0);
  const [shimmerPos, setShimmerPos] = useState(-0.15);
  const [isShimmering, setIsShimmering] = useState(true);

  const startTimeRef = useRef<number | null>(null);
  const [playCount, setPlayCount] = useState(0);

  // Allow clicking / tapping the logo to replay the sequence anytime
  const handleInteraction = useCallback(() => {
    startTimeRef.current = performance.now();
    setPlayCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let animId: number;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      // 1. Radiant Shimmer Sweep (starts immediately on frame 1)
      if (elapsed >= initialDelay && elapsed < shimmerEnd) {
        setIsShimmering(true);
        const p = (elapsed - initialDelay) / SHIMMER_DURATION;
        // Starts directly at the top-left edge (-0.15) so light is visible immediately
        const sweep = p * 1.4 - 0.15;
        setShimmerPos(sweep);
      } else {
        setIsShimmering(false);
      }

      // 2. Harmonic Balance Oscillation (2-3 times then still)
      if (elapsed < shimmerEnd) {
        setAngle(0);
      } else if (elapsed < oscillationEnd) {
        // Cycle 1 and Cycle 2: full sinusoidal oscillation
        const oscElapsed = elapsed - shimmerEnd;
        const cycle = (oscElapsed / CYCLE_PERIOD) % 1.0;
        const currentAngle =
          MAX_ANGLE_DEGREES * Math.sin(cycle * 2.0 * Math.PI);
        setAngle(currentAngle);
      } else if (elapsed < totalDuration) {
        // 3rd oscillation: exponentially damped settling directly into 0.0°
        const p = (elapsed - oscillationEnd) / SETTLE_DURATION;
        const envelope = Math.exp(-3.2 * p) * (1.0 - p);
        const oscillation = Math.cos(1.5 * 2.0 * Math.PI * p);
        const currentAngle = MAX_ANGLE_DEGREES * envelope * oscillation;
        setAngle(currentAngle);
      } else {
        // Stilled logo: locked at 0.0° in perfect horizontal equilibrium
        setAngle(0);
        setIsShimmering(false);
        return; // Stop animation loop to preserve CPU/GPU
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [initialDelay, shimmerEnd, oscillationEnd, totalDuration, playCount]);

  // Compute hanging left pan shift maintaining vertical gravity
  const rad = (angle * Math.PI) / 180.0;
  const leftPivotNewX = FULCRUM_X + LEFT_ARM_DX * Math.cos(rad);
  const leftPivotNewY = FULCRUM_Y + LEFT_ARM_DX * Math.sin(rad);
  const panShiftX = leftPivotNewX - LEFT_PIVOT_X;
  const panShiftY = leftPivotNewY - LEFT_PIVOT_Y;

  // ViewBox dimensions from iOS bounding box with swing headroom
  const minX = 171.9;
  const minY = 210.0;
  const width = 696.4;
  const height = 568.0;
  const viewBox = `${minX} ${minY} ${width} ${height}`;

  // Accurate shimmer gradient coordinates in SVG user space
  const bandWidth = 0.28;
  const startX = minX + (shimmerPos - bandWidth) * width;
  const startY = minY + (shimmerPos - bandWidth) * height;
  const endX = minX + (shimmerPos + bandWidth) * width;
  const endY = minY + (shimmerPos + bandWidth) * height;

  return (
    <div
      onClick={handleInteraction}
      title="Stable Channels (click to replay)"
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ width: size, height: size * (height / width) }}
    >
      <svg
        viewBox={viewBox}
        className="w-full h-full overflow-visible drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Luminous diagonal shimmer gradient */}
          <linearGradient
            id={gradientId}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Mask matching exact geometry of the balance scale */}
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x={minX}
            y={minY}
            width={width}
            height={height}
          >
            <path
              d={paths.BalanceScaleStandShape}
              fill="#FFFFFF"
              fillRule="evenodd"
            />
            <g transform={`rotate(${angle}, ${FULCRUM_X}, ${FULCRUM_Y})`}>
              <path
                d={paths.BalanceScaleBeamShape}
                fill="#FFFFFF"
                fillRule="evenodd"
              />
              <path
                d={paths.BalanceScaleCoinShape}
                fill="#FFFFFF"
                fillRule="evenodd"
              />
              <path
                d={paths.BalanceScaleBtcShape}
                fill="#FFFFFF"
                fillRule="evenodd"
              />
            </g>
            <g transform={`translate(${panShiftX}, ${panShiftY})`}>
              <path
                d={paths.BalanceScalePanShape}
                fill="#FFFFFF"
                fillRule="evenodd"
              />
            </g>
          </mask>
        </defs>

        {/* 1. Grounded Stand (stationary vertical column & base) */}
        <path
          d={paths.BalanceScaleStandShape}
          fill={baseColor}
          fillRule="evenodd"
        />

        {/* 2. Crossbeam and Right Coin Assembly (rotates around fulcrum) */}
        <g transform={`rotate(${angle}, ${FULCRUM_X}, ${FULCRUM_Y})`}>
          <path
            d={paths.BalanceScaleBeamShape}
            fill={baseColor}
            fillRule="evenodd"
          />
          <path
            d={paths.BalanceScaleCoinShape}
            fill={baseColor}
            fillRule="evenodd"
          />
          <path
            d={paths.BalanceScaleBtcShape}
            fill={baseColor}
            fillRule="evenodd"
          />
        </g>

        {/* 3. Hanging Left Pan (translates with pivot, maintains vertical gravity) */}
        <g transform={`translate(${panShiftX}, ${panShiftY})`}>
          <path
            d={paths.BalanceScalePanShape}
            fill={baseColor}
            fillRule="evenodd"
          />
        </g>

        {/* 4. Radiant Shimmer Sweep (illuminates the logo with pure white light) */}
        {isShimmering && (
          <rect
            x={minX}
            y={minY}
            width={width}
            height={height}
            fill={`url(#${gradientId})`}
            mask={`url(#${maskId})`}
            className="pointer-events-none"
          />
        )}
      </svg>
    </div>
  );
};
