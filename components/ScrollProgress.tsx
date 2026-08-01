'use client';

import { useEffect, useRef } from 'react';

/**
 * Barre de progression du défilement, en haut de page.
 * Extraite ici parce que l'accueil et /a-propos en avaient chacun leur copie.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      el.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
