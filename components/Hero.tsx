'use client';

import { useRef, useEffect, useState } from 'react';

export default function Hero() {
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
    <section className="hero pt-14 md:pt-16 pb-5 relative z-0">
      <div
        className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[min(1200px,130%)] h-96 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(58% 62% at 50% 38%, rgba(18,183,106,.20), rgba(18,183,106,.06) 55%, transparent 72%)',
        }}
      />

      <div className="wrap">
        {/* Hero head */}
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          <span className="eyebrow">Monteur vidéo · Motion designer</span>
          <h1 className="font-display font-black text-4xl md:text-6xl leading-tight tracking-tight mt-5">
            Je monte des vidéos{' '}
            <span className="text-green relative whitespace-nowrap">
              verticales
              <span className="absolute left-0 right-0 bottom-1 h-0.5 bg-green-pop opacity-30 rounded" />
            </span>{' '}
            qui retiennent l'attention
          </h1>
          <p className="text-lg md:text-xl text-muted mt-5 max-w-2xl">
            Publicités, reels et capsules courtes en 9:16 et 4:5. Le vertical,
            c'est mon terrain principal.
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="chip">9:16 · reels</span>
            <span className="chip">4:5 · fil d'actu</span>
            <span className="chip">Ads &amp; VSL</span>
            <span className="chip">FR / EN</span>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mt-7">
            <a href="#contact" className="btn btn-primary">
              Réserver un appel
            </a>
            <button className="btn btn-ghost" onClick={() => {}}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Voir le showreel
            </button>
          </div>
        </div>

        {/* Vertical wall (to be filled with VerticalWall component) */}
        <div className="mt-14 md:mt-16">
          {/* VerticalWall component will go here */}
          <div className="text-center text-muted py-12">
            [VerticalWall component]
          </div>
        </div>
      </div>
    </section>
  );
}
