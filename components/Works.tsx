'use client';

import { useRef, useEffect, useState } from 'react';
import WorkGrid from './WorkGrid';

export default function Works() {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-21" id="realisations">
      <div className="wrap">
        <div
          ref={ref}
          className={`flex items-end justify-between gap-6 mb-10 flex-wrap transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          <div>
            <span className="eyebrow">Sélection</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mt-2">
              Mes dernières <span className="kw">réalisations</span>
            </h2>
            <p className="text-muted text-base mt-3">
              Un aperçu. Tout le reste est sur la page Réalisations.
            </p>
          </div>
          <a href="#" className="btn btn-ghost">
            Voir toutes mes réalisations
          </a>
        </div>

        <div
          className={`transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          <WorkGrid />
        </div>

        <div
          className={`mt-9 text-center transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          <a href="#" className="btn btn-primary">
            Voir toutes mes réalisations
          </a>
        </div>
      </div>
    </section>
  );
}
