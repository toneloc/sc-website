'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface NavSectionItem {
  name: string;
  url: string;
  section: string;
}

export function useScrollSpy(
  items: NavSectionItem[],
  defaultSection = 'Features'
) {
  const [activeTab, setActiveTab] = useState<string>(defaultSection);
  const pathname = usePathname();
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const scrollPosition = window.scrollY;
      const offset = 220;

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const section =
          document.querySelector(`[data-section="${item.section}"]`) ||
          document.getElementById(item.section) ||
          document.querySelector(`#${item.section}`);

        if (section) {
          const rect = (section as HTMLElement).getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;

          if (scrollPosition + offset >= sectionTop) {
            setActiveTab(item.name);
            return;
          }
        }
      }

      if (scrollPosition < 300) {
        setActiveTab(defaultSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, items, defaultSection]);

  const handleTabChange = useCallback(
    (tabName: string) => {
      const item = items.find((i) => i.name === tabName);
      if (!item) return;

      if (pathname !== '/') {
        router.push(`/${item.url}`);
        return;
      }

      const element =
        document.querySelector(`[data-section="${item.section}"]`) ||
        document.getElementById(item.section) ||
        document.querySelector(`#${item.section}`);

      if (element) {
        const offset = 85;
        const rect = (element as HTMLElement).getBoundingClientRect();
        const offsetPosition = rect.top + window.pageYOffset - offset;

        setActiveTab(tabName);
        isNavigatingRef.current = true;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        window.history.pushState(null, '', item.url);

        setTimeout(() => {
          isNavigatingRef.current = false;
          setActiveTab(tabName);
        }, 700);
      }
    },
    [items, pathname, router]
  );

  const scrollToTop = useCallback(() => {
    if (pathname === '/') {
      isNavigatingRef.current = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        isNavigatingRef.current = false;
        setActiveTab(defaultSection);
      }, 700);
    }
  }, [pathname, defaultSection]);

  return {
    activeTab,
    handleTabChange,
    scrollToTop,
  };
}
