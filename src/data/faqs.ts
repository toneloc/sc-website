import { FaqItem } from '@/types/content';
import { siteConfig } from './siteConfig';

export const faqsData: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What are Stable Channels?',
    answer:
      'Stable Channels is an open-source project that brings Bitcoin-backed dollar balances to the Lightning Network, matching users who want USD stability with users who want additional BTC exposure.',
  },
  {
    id: 'faq-2',
    question: 'How does Stable Channels work?',
    answer:
      'Stable Channels pairs users who want dollar stability with users who want more Bitcoin exposure in a Lightning channel. The system settles frequently based on the BTC/USD price - if the price goes up, the stable side pays the other side, and vice versa. This maintains a constant dollar value on one side.',
  },
  {
    id: 'faq-3',
    question: 'What problem does it solve?',
    answer:
      'Bitcoin price volatility. Stable Channels provides a decentralized, self-custodial alternative to custodial stablecoins - no banks, no token issuers, no asset freezes.',
  },
  {
    id: 'faq-4',
    question: 'What are the key components of Stable Channels?',
    answer:
      'Stable Channels involves two types of users: Stable Receivers, who want less BTC price exposure, and Stable Providers, who want more BTC price exposure.',
  },
  {
    id: 'faq-5',
    question: 'Is Stable Channels a stablecoin?',
    answer:
      'No. Stable Channels does not issue any tokens. It uses native Bitcoin in Lightning channels to create synthetic dollar exposure. There are no new assets - only Bitcoin.',
  },
  {
    id: 'faq-6',
    question: 'How often does the system settle?',
    answer:
      'Every few minutes. The system queries five independent price feeds and uses the median price to ensure accuracy.',
  },
  {
    id: 'faq-7',
    question: 'What happens if the BTC price goes down?',
    answer:
      'The Stable Provider compensates the Stable Receiver. If the price drops significantly (more than 50%), additional collateral may be needed via a splice-in to maintain the agreement.',
  },
  {
    id: 'faq-8',
    question: 'What are the risks of using Stable Channels?',
    answer:
      'Risks include extreme Bitcoin price volatility, node outages, and the possibility of non-cooperative channel partners. Proper risk management, using reputable channel partners, and frequent settlement can help mitigate these risks.',
  },
  {
    id: 'faq-9',
    question: 'What happens if the price of Bitcoin drops significantly?',
    answer:
      'If the BTC price drops more than 50%, the channel may not have enough capacity to maintain stability. Cooperative actors may need to splice in additional funds to continue the agreement.',
  },
  {
    id: 'faq-10',
    question: 'Where can I find more information about Stable Channels?',
    answer:
      'You can find more information on the Stable Channels GitHub and join the discussion on the Stable Channels Telegram.',
    linkText: 'Stable Channels GitHub',
    linkHref: siteConfig.githubUrl,
  },
];
