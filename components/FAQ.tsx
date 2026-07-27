'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Quels formats de vidéos montez-vous ?',
    a: 'Je suis spécialisé dans les formats verticaux : 9:16 pour les reels, shorts et TikTok, 4:5 pour les fils d\'actualité. Je monte aussi en 16:9 quand le projet le demande, mais le vertical reste mon terrain principal.',
  },
  {
    q: 'Quels types de projets prenez-vous ?',
    a: 'Publicités, reels, capsules podcast, VSL, contenus de formation et motion design. Je travaille avec des créateurs, des coachs, des agents immobiliers et des plateformes, en français comme en anglais.',
  },
  {
    q: 'Comment se passe la collaboration ?',
    a: 'On commence par un appel pour cadrer le besoin. Vous m\'envoyez les rushes via un lien, je monte, et on affine ensemble avec des retours cadrés. Suivi clair du début à la livraison.',
  },
  {
    q: 'Quels sont vos délais ?',
    a: 'Ça dépend du volume et du format, mais un reel vertical part généralement sous quelques jours. On fixe les délais ensemble à l\'appel, et je m\'y tiens.',
  },
  {
    q: 'Quels sont vos tarifs ?',
    a: 'Au projet ou au forfait mensuel selon vos besoins. Réservez un appel et je vous fais une proposition claire adaptée à votre volume.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-21" id="apropos">
      <div className="wrap max-w-2xl">
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
          Tout ce qu'on me demande <span className="kw">souvent</span>
        </h2>
        <p className="text-muted">
          Si votre question n'y est pas, écrivez-moi, je réponds vite.
        </p>

        <div className="mt-10 border-t border-line">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === openIndex}
              className="border-b border-line"
              onToggle={() => setOpenIndex(idx)}
            >
              <summary className="cursor-pointer py-5 flex items-center justify-between gap-5 font-semibold text-lg hover:text-green transition-colors">
                {faq.q}
                <span className="flex-none w-6 h-6 border border-line rounded-full grid place-items-center text-green transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="pb-6 text-muted text-base max-w-2xl">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
