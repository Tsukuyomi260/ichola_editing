'use client';

import React, { useRef, useState } from 'react';

const videos = [
  { title: 'Ad — coach business', sub: 'Ads · vertical', tag: '9:16', c1: '#0f6b3f', c2: '#2FCB72', delay: '0s' },
  { title: 'Capsule podcast', sub: 'Podcast · vertical', tag: '9:16', c1: '#134e37', c2: '#3fb6a0', delay: '-2s' },
  { title: 'Reel immobilier', sub: 'Immobilier · vertical', tag: '9:16', c1: '#1a5e2e', c2: '#7bd94f', delay: '-3.5s' },
  { title: 'Short — English', sub: 'Reel · vertical', tag: '9:16', c1: '#0d5c46', c2: '#34d19a', delay: '-1s' },
  { title: 'Ad — MentorShow', sub: 'Ads · vertical', tag: '9:16', c1: '#155e3a', c2: '#57e39a', delay: '-4s' },
  { title: 'Reel produit', sub: 'Ad · vertical', tag: '9:16', c1: '#0e6b52', c2: '#2fcbb0', delay: '-2.5s' },
];

export default function VerticalWall() {
  const railRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

  const scroll = (direction: 'prev' | 'next') => {
    if (!railRef.current) return;
    const step = Math.min(railRef.current.clientWidth * 0.8, 260);
    railRef.current.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={ref} className={`transition-all duration-700 ${isRevealed ? 'reveal in' : 'reveal'}`}>
      <div className="flex items-end justify-between gap-5 mb-4.5">
        <div>
          <h2 className="font-display font-bold text-xl md:text-3xl tracking-tight">
            Le format que je maîtrise <span className="text-green">le mieux</span>
          </h2>
          <p className="text-muted text-sm mt-1">Une sélection de mes verticales récentes. Cliquez pour le son.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll('prev')} className="w-11 h-11 rounded-full border border-line bg-surface text-ink flex items-center justify-center hover:border-ink hover:-translate-y-0.5 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4.5 h-4.5"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button onClick={() => scroll('next')} className="w-11 h-11 rounded-full border border-line bg-surface text-ink flex items-center justify-center hover:border-ink hover:-translate-y-0.5 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4.5 h-4.5"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <div ref={railRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-6.5 -mx-6" style={{ scrollBehavior: 'smooth' }}>
        {videos.map((video, i) => (
          <article
            key={i}
            style={{
              '--c1': video.c1,
              '--c2': video.c2,
              flex: '0 0 auto',
              width: '230px',
              aspectRatio: '9/16',
              scrollSnapAlign: 'start',
            } as React.CSSProperties}
            className="rounded-2xl relative overflow-hidden cursor-pointer bg-black shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-350"
          >
            <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, var(--c1), var(--c2))`, backgroundSize: '200% 200%', animation: 'drift 9s cubic-bezier(.22,.61,.36,1) infinite' }} />
            <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{ background: 'radial-gradient(120px 120px at 30% 20%,rgba(255,255,255,.5),transparent 60%), radial-gradient(160px 160px at 80% 80%,rgba(0,0,0,.35),transparent 60%)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
            <span className="absolute top-3 left-3 font-mono text-xs text-[#eafff2] bg-black/55 border border-white/15 px-2 py-0.5 rounded backdrop-blur">{video.tag}</span>
            <span className="absolute top-3 right-3 w-7.5 h-7.5 rounded-full bg-black/55 border border-white/20 flex items-center justify-center backdrop-blur"><svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#eafff2]"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" /></svg></span>
            <div className="absolute left-3.5 right-3.5 bottom-4 text-white"><div className="font-semibold text-sm leading-tight">{video.title}</div><div className="font-mono text-xs text-[#bfe9cf] mt-1">{video.sub}</div></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-white/20"><div className="h-full bg-green-pop" style={{ animation: `play 6s linear infinite`, animationDelay: video.delay }} /></div>
          </article>
        ))}
      </div>

      <p className="font-mono text-xs text-muted text-center mt-0.5">{'// 5 à 8 vidéos · glissez à la souris, au doigt ou au clavier · clic = lecteur avec son'}</p>

      <style>{`
        @keyframes drift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes play { 0% { width: 6%; } 100% { width: 100%; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
