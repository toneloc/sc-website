import {
  Sparkles,
  Layers,
  ArrowRightCircle,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { siteConfig } from './siteConfig';

export interface MainNavItem {
  name: string;
  url: string;
  section: string;
  icon: LucideIcon;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  iconName: 'zap' | 'fileText' | 'lock';
  links: FooterLinkItem[];
}

export const mainNavItems: MainNavItem[] = [
  { name: 'Features', url: '#features', section: 'features', icon: Sparkles },
  {
    name: 'How It Works',
    url: '#how-it-works',
    section: 'how-it-works',
    icon: Layers,
  },
  {
    name: 'Get Started',
    url: '#get-started',
    section: 'get-started',
    icon: ArrowRightCircle,
  },
  { name: 'FAQ', url: '#faqs-2', section: 'faqs-2', icon: HelpCircle },
];

export const footerSections: FooterSection[] = [
  {
    title: 'Product',
    iconName: 'zap',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Continuous Settlement', href: '#how-it-works' },
      { label: 'Get Started', href: '#get-started' },
    ],
  },
  {
    title: 'Resources',
    iconName: 'fileText',
    links: [
      { label: 'All Links & Resources', href: '/link-resources' },
      {
        label: 'Delving Bitcoin Deep Dive',
        href: 'https://delvingbitcoin.org/t/stable-channels-peer-to-peer-dollar-balances-on-lightning/875',
        isExternal: true,
      },
      {
        label: 'Stephan Livera Podcast',
        href: 'https://stephanlivera.com/episode/591/',
        isExternal: true,
      },
      {
        label: 'Bitcoin Atlantis Presentation',
        href: 'https://www.youtube.com/watch?v=yZel3OGUyhg',
        isExternal: true,
      },
      {
        label: 'GitHub Repository',
        href: siteConfig.githubUrl,
        isExternal: true,
      },
      {
        label: 'Telegram Community',
        href: siteConfig.telegramUrl,
        isExternal: true,
      },
      { label: 'FAQ', href: '#faqs-2' },
    ],
  },
  {
    title: 'Legal',
    iconName: 'lock',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/privacy' },
      { label: 'GPLv3 License', href: siteConfig.licenseUrl, isExternal: true },
    ],
  },
];
