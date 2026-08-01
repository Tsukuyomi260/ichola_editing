'use client';

import { useEffect, useRef, useState } from 'react';
import { CAL_URL } from '@/lib/site';

/**
 * Agenda Cal.com intégré à la carte contact.
 *
 * L'iframe ne se monte qu'à l'approche de la section (200 px avant) : c'est un
 * tiers lourd, inutile de le charger pour quelqu'un qui ne descendra jamais
 * jusqu'au contact. Le bouton sous la carte reste un lien direct vers Cal.com,
 * donc la prise de rendez-vous marche même si l'intégration échoue.
 */
export default function CalEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMonte(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="lp-embed" ref={ref}>
      {monte ? (
        <iframe
          src={`${CAL_URL}?embed=true&theme=dark&layout=month_view`}
          title="Réserver un créneau avec Ichola"
          loading="lazy"
        />
      ) : (
        <span className="lp-embed-att">{'// '}agenda</span>
      )}
    </div>
  );
}
