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
      'Every few minutes. The app queries several independent exchange price feeds and uses the median, so one bad or stale feed cannot move your balance.',
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

/** Practical answers a visitor needs before downloading: funding, fees, limits, exit. */
export const practicalFaqsData: FaqItem[] = [
  {
    id: 'faq-funding',
    question: 'What do I need to fund it?',
    answer:
      'Bitcoin, and nothing else. Your first Lightning payment opens a channel and activates the account, up to $100 to start. You can also deposit on-chain and move those funds into the channel afterwards.',
  },
  {
    id: 'faq-cost',
    question: 'What does it cost?',
    answer:
      'Converting between bitcoin and a dollar target costs 1%, shown on the confirmation screen before you accept. Lightning routing fees and on-chain fees when you deposit or withdraw are the usual network costs, and the settlement payments that keep your target are not charged separately.',
  },
  {
    id: 'faq-counterparty',
    question: 'Who is my counterparty?',
    answer:
      'Today it is the Stable Channels node, which takes the opposite Bitcoin exposure and runs the settlements. The protocol is open, so anyone can run the other side.',
  },
  {
    id: 'faq-offline',
    question: 'What happens if my phone is offline?',
    answer:
      'Settlement pauses while your wallet is unreachable and resumes when it comes back, so your dollar target can drift in the meantime. The app only settles against a recent view of the chain, and push notifications wake it in the background.',
  },
  {
    id: 'faq-sharp-move',
    question: 'What happens in a sharp price move?',
    answer:
      'Adjustments keep running every few minutes. If Bitcoin falls far enough, the channel can run out of room to hold the target, and keeping it would need more funds added. Your stabilized balance can only be as large as the channel can cover.',
  },
  {
    id: 'faq-exit',
    question: 'How do I get out?',
    answer:
      'Convert your dollar target back to bitcoin at any time, then spend over Lightning or withdraw on-chain. You can also close the channel from settings, which returns your funds on-chain without anyone else\u2019s cooperation.',
  },
];
