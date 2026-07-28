'use client';

import React from 'react';

export type HeroCard = {
  title: string;
  sub: string;
  tag: string;
  c1: string;
  c2: string;
};

export const HERO_CARDS: HeroCard[] = [
  { title: 'Ad – coach business', sub: 'Ads · vertical', tag: '9:16', c1: '#0f6b3f', c2: '#2FCB72' },
  { title: 'Capsule podcast', sub: 'Podcast · vertical', tag: '9:16', c1: '#134e37', c2: '#3fb6a0' },
  { title: 'Reel immobilier', sub: 'Immobilier · vertical', tag: '9:16', c1: '#1a5e2e', c2: '#7bd94f' },
  { title: 'Short – English', sub: 'Reel · vertical', tag: '9:16', c1: '#0d5c46', c2: '#34d19a' },
  { title: 'Ad – MentorShow', sub: 'Ads · vertical', tag: '9:16', c1: '#155e3a', c2: '#57e39a' },
  { title: 'Reel produit', sub: 'Ad · vertical', tag: '9:16', c1: '#0e6b52', c2: '#2fcbb0' },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const MuteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
  </svg>
);

function CardLayers({ card }: { card: HeroCard }) {
  return (
    <>
      <div className="film" />
      <div className="grain" />
      <div className="veil" />
      <span className="tag">{card.tag}</span>
      <span className="mute"><MuteIcon /></span>
      <div className="meta">
        <div className="t">{card.title}</div>
        <div className="s">{card.sub}</div>
      </div>
      <div className="bar"><i /></div>
      <div className="play"><span><PlayIcon /></span></div>
    </>
  );
}

export default function Hero({ cards = HERO_CARDS, onCardClick }: { cards?: HeroCard[]; onCardClick?: (index: number) => void }) {
  return (
    <header id="accueil">
      <section className="hero">
        <div className="wrap">
          <div className="hero-head reveal in">
            <span className="eyebrow">Monteur vidéo · Motion designer</span>
            <h1>Je monte des vidéos <span className="accent">verticales</span> qui retiennent l&apos;attention</h1>
            <p className="lede">Publicités, reels et capsules courtes en 9:16 et 4:5. Le vertical, c&apos;est mon terrain principal.</p>
            <div className="hero-roles">
              <span className="chip">9:16 · reels</span>
              <span className="chip">4:5 · fil d&apos;actu</span>
              <span className="chip">Ads &amp; VSL</span>
              <span className="chip">FR / EN</span>
            </div>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">Réserver un appel</a>
              <button type="button" className="btn btn-ghost js-showreel" onClick={() => onCardClick?.(0)}>
                <PlayIcon /> Voir le showreel
              </button>
            </div>
          </div>

          <div className="wall-head reveal">
            <div>
              <h2>Le format que je maîtrise <span className="kw">le mieux</span></h2>
              <p>Une sélection de mes verticales récentes. Cliquez pour le son.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-stage" id="hero-stage">
        <div className="hero-stage-pin">
          <div className="hero-stage-content">
            <div className="rail" id="hero-rail">
              {cards.map((card, i) => (
                <article
                  key={i}
                  className="vcard"
                  role="button"
                  tabIndex={0}
                  onClick={() => onCardClick?.(i)}
                  style={{ ['--c1' as string]: card.c1, ['--c2' as string]: card.c2 } as React.CSSProperties}
                >
                  <CardLayers card={card} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
