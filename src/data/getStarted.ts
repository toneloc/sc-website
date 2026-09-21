import { StepGuideItem } from '@/types/content';
import { siteConfig } from './siteConfig';

export const getStartedSteps: StepGuideItem[] = [
  {
    stepNumber: 1,
    title: 'Download',
    description: `Android: install straight from Google Play. Desktop: macOS and Linux builds are on the releases page. iPhone: iOS is not released yet.`,
    linkText: 'releases page',
    linkHref: siteConfig.releasesUrl,
  },
  {
    stepNumber: 2,
    title: 'Fund',
    description:
      'Send Bitcoin to your wallet. On-chain funds can be moved into a Lightning channel to manage your volatility exposure.',
  },
  {
    stepNumber: 3,
    title: 'Manage',
    description:
      'Slide the balance bar to adjust your mix of USD stability and BTC exposure. Settlements happen instantly over Lightning.',
  },
];
