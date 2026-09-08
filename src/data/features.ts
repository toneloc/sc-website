import { FeatureSection } from '@/types/content';

export const howItWorksFeature: FeatureSection = {
  id: 'content-1',
  badge: 'How It Works',
  title: '100% Bitcoin-Native',
  subtitle: 'Peer-to-peer agreements using Lightning channels.',
  bullets: [
    { text: 'Keep a fixed dollar value in your Lightning wallet.' },
    {
      text: 'Your counterparty takes the other side — taking on additional Bitcoin exposure.',
    },
    {
      text: 'Price goes up? You pay them. Price goes down? They pay you.',
    },
    { text: 'Everything settles instantly over Lightning.' },
  ],
  imageSrc: '/images/app-balance-img.png',
  imageAlt:
    'Stable Channels app — balance bar with USD stability and BTC exposure',
  imagePosition: 'right',
};

export const continuousSettlementFeature = {
  id: 'content-6',
  imageSrc: '/images/app-history-img.png',
  imageAlt: 'Stable Channels app — settlement history',
  blocks: [
    {
      title: 'Continuous Settlement',
      description:
        'Balances rebalance automatically every few minutes. No manual action required.',
    },
    {
      title: 'Close Anytime',
      description:
        'All agreements are at-will. Either party can end the agreement and withdraw funds at any time. Continuous settlement minimizes counterparty risk.',
    },
    {
      title: 'Built for Privacy and Resilience',
      description:
        'Stable Channels is a Bitcoin-native, self-custodial solution. No tokens, no banks, no third-party risk.',
    },
  ],
};

export const theOpportunityFeature: FeatureSection = {
  id: 'content-2',
  badge: 'The Opportunity',
  title: 'Why this matters.',
  description:
    "Stablecoins require trust in banks and token issuers. Stable Channels doesn't. It uses Bitcoin in Lightning channels to create dollar stability — no tokens, no custodians, no points of failure.\n\nStable Channels reimagines dollar stability using Bitcoin's Lightning Network — instant settlement, peer-to-peer, no intermediaries.",
  imageSrc: '/images/app-promo-img.png',
  imageAlt: 'Stable Channels app with five-star review',
  imagePosition: 'left',
  isDark: true,
};
