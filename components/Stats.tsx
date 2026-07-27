'use client';

import { useRef, useEffect, useState } from 'react';

export default function Stats() {
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
    <section
      ref={ref}
      className={`border-t border-b border-line mt-5 transition-all duration-700 ${
        isRevealed ? 'reveal in' : 'reveal'
      }`}
    >
      <div className="wrap grid grid-cols-1 md:grid-cols-3">
        {/* Stat 1 */}
        <div className="py-9 md:py-9 text-center border-r border-line last:border-r-0 md:last:border-r-0">
          <div className="font-display font-black text-3xl md:text-4xl tracking-tight">
            <span className="text-green">+500</span>
          </div>
          <div className="text-muted text-sm mt-1.5 max-w-xs mx-auto">
            vidéos livrées, en majorité en vertical
          </div>
        </div>

        {/* Stat 2 */}
        <div className="py-9 md:py-9 text-center border-r border-line last:border-r-0 md:last:border-r-0">
          <div className="font-display font-black text-3xl md:text-4xl tracking-tight">
            <span className="text-green">207 M</span>
          </div>
          <div className="text-muted text-sm mt-1.5 max-w-xs mx-auto">
            de vues générées par l'équipe MentorShow au S1 2026
          </div>
        </div>

        {/* Stat 3 */}
        <div className="py-9 md:py-9 text-center border-r border-line last:border-r-0">
          <div className="font-display font-black text-3xl md:text-4xl tracking-tight">
            <span className="text-green">4</span>
          </div>
          <div className="text-muted text-sm mt-1.5 max-w-xs mx-auto">
            personnes encadrées en studio
          </div>
        </div>
      </div>
    </section>
  );
}
