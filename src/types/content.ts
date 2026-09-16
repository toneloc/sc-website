export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface AppDownloadLink {
  label: string;
  href: string;
  iconName: 'apple' | 'android' | 'desktop';
  subtitle?: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

export interface FeatureBullet {
  text: string;
}

export interface FeatureSection {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  description?: string;
  bullets?: FeatureBullet[];
  imageSrc: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  isDark?: boolean;
}

export interface StepGuideItem {
  stepNumber: number;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

export interface ResourceLinkItem {
  id: string;
  title: string;
  linkText: string;
  href: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}
