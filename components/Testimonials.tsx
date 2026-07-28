'use client';

import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    quote:
      'Des montages qui accrochent dès la première seconde. Nos reels ont explosé en rétention, et les délais ont toujours été tenus.',
    name: 'Nom Prénom',
    role: 'Responsable contenu · MentorShow',
  },
  {
    quote:
      'Il comprend le format vertical mieux que personne. Un vrai partenaire créatif, pas juste un exécutant.',
    name: 'Nom Prénom',
    role: 'Coach business',
  },
  {
    quote:
      'Réactif, précis, et un sens du rythme rare. Mes annonces immobilières n\'ont jamais été aussi regardées.',
    name: 'Nom Prénom',
    role: 'Agent immobilier',
  },
];

export default function Testimonials() {
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
    <section className="py-21 bg-bg-2">
      <div className="wrap">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          <span className="eyebrow">Retours clients</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mt-2">
            Ce qu'ils <span className="kw">en disent</span>
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-4.5 mt-10 transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          {testimonials.map((testimonial, idx) => (
            <figure
              key={idx}
              className="bg-surface border border-line rounded-2xl p-6.5 flex flex-col gap-4"
            >
              <div className="flex gap-0.5 text-green">
                ★★★★★
              </div>
              <blockquote className="text-base leading-relaxed text-ink-soft">
                « {testimonial.quote} »
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-auto">
                <span
                  className="w-10 h-10 rounded-full flex-none"
                  style={{
                    background: `linear-gradient(135deg, #12B76A, #35D07E)`,
                  }}
                />
                <span>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted">{testimonial.role}</div>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
