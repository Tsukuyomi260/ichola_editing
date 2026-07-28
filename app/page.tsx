'use client';

import { useEffect, useRef } from 'react';

export default function Page() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const mTitleRef = useRef<HTMLDivElement>(null);
  const mSubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const mm = mobileMenuRef.current;
    const rail = railRef.current;
    const modal = modalRef.current;
    const player = playerRef.current;
    const mTitle = mTitleRef.current;
    const mSub = mSubRef.current;

    /* Nav shadow on scroll */
    const handleScroll = () => {
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 8);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* Mobile menu */
    const burger = document.getElementById('burger');
    const burgerClose = document.getElementById('burgerClose');
    const closeMenuLinks = mm?.querySelectorAll('[data-close]');

    burger?.addEventListener('click', () => mm?.classList.add('open'));
    burgerClose?.addEventListener('click', () => mm?.classList.remove('open'));
    closeMenuLinks?.forEach((a) =>
      a.addEventListener('click', () => mm?.classList.remove('open'))
    );

    /* Rail scroll */
    const railNext = document.getElementById('railNext');
    const railPrev = document.getElementById('railPrev');

    const step = () => Math.min(rail ? rail.clientWidth * 0.8 : 0, 260);

    railNext?.addEventListener('click', () =>
      rail?.scrollBy({ left: step(), behavior: 'smooth' })
    );
    railPrev?.addEventListener('click', () =>
      rail?.scrollBy({ left: -step(), behavior: 'smooth' })
    );

    /* Modal player */
    const mClose = document.getElementById('mClose');
    const mNext = document.getElementById('mNext');
    const mPrev = document.getElementById('mPrev');
    const openShowreel = document.getElementById('openShowreel');

    const cards = document.querySelectorAll('.vcard,.work');
    let idx = 0;

    function openCard(i: number) {
      if (!modal || !player || !mTitle || !mSub) return;
      idx = (i + cards.length) % cards.length;
      const c = cards[idx] as HTMLElement;
      const t = c.dataset.title || c.querySelector('.t')?.textContent || 'Réalisation';
      const s = c.dataset.sub || c.querySelector('.s')?.textContent || 'Vertical';
      const c1 = getComputedStyle(c).getPropertyValue('--c1') || '#1f6f47';
      const c2 = getComputedStyle(c).getPropertyValue('--c2') || '#2FCB72';
      mTitle.textContent = t;
      mSub.textContent = s;
      player.style.background = `linear-gradient(135deg,${c1},${c2})`;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal?.classList.remove('open');
      document.body.style.overflow = '';
    }

    cards.forEach((c, i) =>
      c.addEventListener('click', () => openCard(i))
    );

    mClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    mNext?.addEventListener('click', () => openCard(idx + 1));
    mPrev?.addEventListener('click', () => openCard(idx - 1));
    openShowreel?.addEventListener('click', () => openCard(0));

    window.addEventListener('keydown', (e) => {
      if (!modal?.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') openCard(idx + 1);
      if (e.key === 'ArrowLeft') openCard(idx - 1);
    });

    /* Reveal on scroll */
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      burger?.removeEventListener('click', () => mm?.classList.add('open'));
      burgerClose?.removeEventListener('click', () => mm?.classList.remove('open'));
      closeMenuLinks?.forEach((a) =>
        a.removeEventListener('click', () => mm?.classList.remove('open'))
      );
      railNext?.removeEventListener('click', () =>
        rail?.scrollBy({ left: step(), behavior: 'smooth' })
      );
      railPrev?.removeEventListener('click', () =>
        rail?.scrollBy({ left: -step(), behavior: 'smooth' })
      );
      cards.forEach((c) =>
        c.removeEventListener('click', () => openCard(0))
      );
      mClose?.removeEventListener('click', closeModal);
      modal?.removeEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      mNext?.removeEventListener('click', () => openCard(idx + 1));
      mPrev?.removeEventListener('click', () => openCard(idx - 1));
      openShowreel?.removeEventListener('click', () => openCard(0));
      window.removeEventListener('keydown', (e) => {
        if (!modal?.classList.contains('open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') openCard(idx + 1);
        if (e.key === 'ArrowLeft') openCard(idx - 1);
      });
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* ================= NAV ================= */}
      <header className="nav" id="nav" ref={navRef}>
        <div className="wrap nav-inner">
          <a href="#" className="brand">
            ICHOLA<span className="dot">.</span>EDITING
          </a>
          <nav className="nav-links">
            <a href="#accueil">Accueil</a>
            <a href="#realisations">Réalisations</a>
            <a href="#apropos">À propos</a>
          </nav>
          <div className="nav-right">
            <span className="status">
              <span className="live"></span>Disponible
            </span>
            <a href="#contact" className="btn btn-primary">
              Réserver un appel
            </a>
            <button className="burger" id="burger" aria-label="Ouvrir le menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div className="mobile-menu" id="mobileMenu" ref={mobileMenuRef}>
        <div className="mm-top">
          <a href="#" className="brand">
            ICHOLA<span className="dot">.</span>EDITING
          </a>
          <button className="burger" id="burgerClose" aria-label="Fermer le menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="mm-links">
          <a href="#accueil" data-close>
            Accueil
          </a>
          <a href="#realisations" data-close>
            Réalisations
          </a>
          <a href="#apropos" data-close>
            À propos
          </a>
        </nav>
        <div className="mm-cta">
          <a href="#contact" className="btn btn-primary" data-close>
            Réserver un appel
          </a>
        </div>
      </div>

      {/* ================= HERO (1b) ================= */}
      <main id="accueil">
        <section className="hero">
          <div className="wrap">
            <div className="hero-head reveal">
              <span className="eyebrow">Monteur vidéo · Motion designer</span>
              <h1>
                Je monte des vidéos <span className="accent">verticales</span> qui retiennent
                l'attention
              </h1>
              <p className="lede">
                Publicités, reels et capsules courtes en 9:16 et 4:5. Le vertical, c'est mon
                terrain principal.
              </p>
              <div className="hero-roles">
                <span className="chip">9:16 · reels</span>
                <span className="chip">4:5 · fil d'actu</span>
                <span className="chip">Ads &amp; VSL</span>
                <span className="chip">FR / EN</span>
              </div>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  Réserver un appel
                </a>
                <button className="btn btn-ghost" id="openShowreel">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Voir le showreel
                </button>
              </div>
            </div>

            {/* Le mur vertical EST le hero */}
            <div className="wall-head reveal">
              <div>
                <h2>
                  Le format que je maîtrise <span className="kw">le mieux</span>
                </h2>
                <p>Une sélection de mes verticales récentes. Cliquez pour le son.</p>
              </div>
              <div className="wall-nav">
                <button id="railPrev" aria-label="Précédent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button id="railNext" aria-label="Suivant">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="rail" id="rail" ref={railRef}>
            {/* cartes générées + statiques */}
            <article
              className="vcard"
              style={
                { '--c1': '#0f6b3f', '--c2': '#2FCB72' } as React.CSSProperties
              }
              data-title="Ad — coach business"
              data-sub="Ads · 9:16 · FR"
            >
              <div className="film"></div>
              <div className="grain"></div>
              <div className="veil"></div>
              <span className="tag">9:16</span>
              <span className="mute">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
                </svg>
              </span>
              <div className="meta">
                <div className="t">Ad — coach business</div>
                <div className="s">Ads · vertical</div>
              </div>
              <div className="bar">
                <i></i>
              </div>
              <div className="play">
                <span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </article>
            <article
              className="vcard"
              style={
                { '--c1': '#134e37', '--c2': '#3fb6a0' } as React.CSSProperties
              }
              data-title="Capsule podcast"
              data-sub="Podcast · 9:16"
            >
              <div className="film"></div>
              <div className="grain"></div>
              <div className="veil"></div>
              <span className="tag">9:16</span>
              <span className="mute">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
                </svg>
              </span>
              <div className="meta">
                <div className="t">Capsule podcast</div>
                <div className="s">Podcast · vertical</div>
              </div>
              <div className="bar">
                <i style={{ animationDelay: '-2s' }}></i>
              </div>
              <div className="play">
                <span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </article>
            <article
              className="vcard"
              style={
                { '--c1': '#1a5e2e', '--c2': '#7bd94f' } as React.CSSProperties
              }
              data-title="Reel immobilier"
              data-sub="Immobilier · 9:16"
            >
              <div className="film"></div>
              <div className="grain"></div>
              <div className="veil"></div>
              <span className="tag">9:16</span>
              <span className="mute">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
                </svg>
              </span>
              <div className="meta">
                <div className="t">Reel immobilier</div>
                <div className="s">Immobilier · vertical</div>
              </div>
              <div className="bar">
                <i style={{ animationDelay: '-3.5s' }}></i>
              </div>
              <div className="play">
                <span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </article>
            <article
              className="vcard"
              style={
                { '--c1': '#0d5c46', '--c2': '#34d19a' } as React.CSSProperties
              }
              data-title="Short — English"
              data-sub="Short · 9:16 · EN"
            >
              <div className="film"></div>
              <div className="grain"></div>
              <div className="veil"></div>
              <span className="tag">9:16</span>
              <span className="mute">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
                </svg>
              </span>
              <div className="meta">
                <div className="t">Short — English</div>
                <div className="s">Reel · vertical</div>
              </div>
              <div className="bar">
                <i style={{ animationDelay: '-1s' }}></i>
              </div>
              <div className="play">
                <span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </article>
            <article
              className="vcard"
              style={
                { '--c1': '#155e3a', '--c2': '#57e39a' } as React.CSSProperties
              }
              data-title="Ad — MentorShow"
              data-sub="Ads · 9:16 · FR/EN"
            >
              <div className="film"></div>
              <div className="grain"></div>
              <div className="veil"></div>
              <span className="tag">9:16</span>
              <span className="mute">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
                </svg>
              </span>
              <div className="meta">
                <div className="t">Ad — MentorShow</div>
                <div className="s">Ads · vertical</div>
              </div>
              <div className="bar">
                <i style={{ animationDelay: '-4s' }}></i>
              </div>
              <div className="play">
                <span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </article>
            <article
              className="vcard"
              style={
                { '--c1': '#0e6b52', '--c2': '#2fcbb0' } as React.CSSProperties
              }
              data-title="Reel produit"
              data-sub="Produit · 9:16"
            >
              <div className="film"></div>
              <div className="grain"></div>
              <div className="veil"></div>
              <span className="tag">9:16</span>
              <span className="mute">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
                </svg>
              </span>
              <div className="meta">
                <div className="t">Reel produit</div>
                <div className="s">Ad · vertical</div>
              </div>
              <div className="bar">
                <i style={{ animationDelay: '-2.5s' }}></i>
              </div>
              <div className="play">
                <span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </article>
          </div>
          <p className="rail-note wrap">
            // 5 à 8 vidéos · glissez à la souris, au doigt ou au clavier · clic = lecteur avec son
          </p>
        </section>

        {/* ================= CHIFFRES ================= */}
        <section className="stats reveal">
          <div className="wrap stats-grid">
            <div className="stat">
              <div className="n">
                <b>+500</b>
              </div>
              <div className="l">vidéos livrées, en majorité en vertical</div>
            </div>
            <div className="stat">
              <div className="n">
                <b>207 M</b>
              </div>
              <div className="l">de vues générées par l'équipe MentorShow au S1 2026</div>
            </div>
            <div className="stat">
              <div className="n">
                <b>4</b>
              </div>
              <div className="l">personnes encadrées en studio</div>
            </div>
          </div>
        </section>

        {/* ================= RÉALISATIONS ================= */}
        <section className="section" id="realisations">
          <div className="wrap">
            <div className="sec-top reveal">
              <div className="sec-head" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Sélection</span>
                <h2>
                  Mes dernières <span className="kw">réalisations</span>
                </h2>
                <p>Un aperçu. Tout le reste est sur la page Réalisations.</p>
              </div>
              <a href="#" className="btn btn-ghost">
                Voir toutes mes réalisations
              </a>
            </div>

            <div className="work-grid reveal" style={{ marginTop: '40px' }}>
              <article
                className="work v"
                style={
                  { '--c1': '#0f6b3f', '--c2': '#2FCB72' } as React.CSSProperties
                }
              >
                <div className="film"></div>
                <div className="veil"></div>
                <span className="tag">9:16</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="meta">
                  <div className="t">Ad — coach business</div>
                  <div className="s">Ads · Français</div>
                </div>
              </article>
              <article
                className="work p"
                style={
                  { '--c1': '#134e37', '--c2': '#3fb6a0' } as React.CSSProperties
                }
              >
                <div className="film"></div>
                <div className="veil"></div>
                <span className="tag">4:5</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="meta">
                  <div className="t">Capsule podcast</div>
                  <div className="s">Podcast · Vertical</div>
                </div>
              </article>
              <article
                className="work h"
                style={
                  { '--c1': '#155e3a', '--c2': '#57e39a' } as React.CSSProperties
                }
              >
                <div className="film"></div>
                <div className="veil"></div>
                <span className="tag">16:9</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="meta">
                  <div className="t">VSL formation</div>
                  <div className="s">VSL · Horizontal · occupe 2 colonnes</div>
                </div>
              </article>
              <article
                className="work v"
                style={
                  { '--c1': '#1a5e2e', '--c2': '#7bd94f' } as React.CSSProperties
                }
              >
                <div className="film"></div>
                <div className="veil"></div>
                <span className="tag">9:16</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="meta">
                  <div className="t">Reel immobilier</div>
                  <div className="s">Immobilier · Vertical</div>
                </div>
              </article>
              <article
                className="work v"
                style={
                  { '--c1': '#0d5c46', '--c2': '#34d19a' } as React.CSSProperties
                }
              >
                <div className="film"></div>
                <div className="veil"></div>
                <span className="tag">9:16</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="meta">
                  <div className="t">Motion flyer</div>
                  <div className="s">Motion · Vertical</div>
                </div>
              </article>
              <article
                className="work v"
                style={
                  { '--c1': '#0e6b52', '--c2': '#2fcbb0' } as React.CSSProperties
                }
              >
                <div className="film"></div>
                <div className="veil"></div>
                <span className="tag">9:16</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="meta">
                  <div className="t">Short — English</div>
                  <div className="s">Reel · English</div>
                </div>
              </article>
              <article
                className="work v"
                style={
                  { '--c1': '#155e3a', '--c2': '#57e39a' } as React.CSSProperties
                }
              >
                <div className="film"></div>
                <div className="veil"></div>
                <span className="tag">9:16</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="meta">
                  <div className="t">Ad — MentorShow</div>
                  <div className="s">Ads · FR/EN</div>
                </div>
              </article>
            </div>
            <div className="work-foot reveal">
              <a href="#" className="btn btn-primary">
                Voir toutes mes réalisations
              </a>
            </div>
          </div>
        </section>

        {/* ================= CLIENTS ================= */}
        <section className="clients reveal">
          <div className="wrap">
            <p className="lbl">Ils m'ont fait confiance</p>
            <div className="logos">
              <span className="logo">MentorShow</span>
              <span className="logo">Studio 4</span>
              <span className="logo">Immo·Prod</span>
              <span className="logo">CoachLab</span>
              <span className="logo">Verticale</span>
            </div>
          </div>
        </section>

        {/* ================= TÉMOIGNAGES ================= */}
        <section className="section alt">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Retours clients</span>
              <h2>
                Ce qu'ils <span className="kw">en disent</span>
              </h2>
            </div>
            <div className="quotes reveal">
              <figure className="quote">
                <div className="stars">★★★★★</div>
                <blockquote className="q">
                  « Des montages qui accrochent dès la première seconde. Nos reels ont explosé en
                  rétention, et les délais ont toujours été tenus. »
                </blockquote>
                <figcaption className="who">
                  <span className="av"></span>
                  <span>
                    <span className="nm">Nom Prénom</span>
                    <br />
                    <span className="rl">Responsable contenu · MentorShow</span>
                  </span>
                </figcaption>
              </figure>
              <figure className="quote">
                <div className="stars">★★★★★</div>
                <blockquote className="q">
                  « Il comprend le format vertical mieux que personne. Un vrai partenaire créatif,
                  pas juste un exécutant. »
                </blockquote>
                <figcaption className="who">
                  <span className="av"></span>
                  <span>
                    <span className="nm">Nom Prénom</span>
                    <br />
                    <span className="rl">Coach business</span>
                  </span>
                </figcaption>
              </figure>
              <figure className="quote">
                <div className="stars">★★★★★</div>
                <blockquote className="q">
                  « Réactif, précis, et un sens du rythme rare. Mes annonces immobilières n'ont
                  jamais été aussi regardées. »
                </blockquote>
                <figcaption className="who">
                  <span className="av"></span>
                  <span>
                    <span className="nm">Nom Prénom</span>
                    <br />
                    <span className="rl">Agent immobilier</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="section" id="apropos">
          <div className="wrap faq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Questions fréquentes</span>
              <h2>
                Tout ce qu'on me demande <span className="kw">souvent</span>
              </h2>
              <p>Si votre question n'y est pas, écrivez-moi, je réponds vite.</p>
            </div>
            <div className="faq reveal">
              <details open>
                <summary>
                  Quels formats de vidéos montez-vous ?
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="a">
                  Je suis spécialisé dans les formats verticaux : 9:16 pour les reels, shorts et
                  TikTok, 4:5 pour les fils d'actualité. Je monte aussi en 16:9 quand le projet le
                  demande, mais le vertical reste mon terrain principal.
                </div>
              </details>
              <details>
                <summary>
                  Quels types de projets prenez-vous ?
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="a">
                  Publicités, reels, capsules podcast, VSL, contenus de formation et motion design.
                  Je travaille avec des créateurs, des coachs, des agents immobiliers et des
                  plateformes, en français comme en anglais.
                </div>
              </details>
              <details>
                <summary>
                  Comment se passe la collaboration ?
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="a">
                  On commence par un appel pour cadrer le besoin. Vous m'envoyez les rushes via un
                  lien, je monte, et on affine ensemble avec des retours cadrés. Suivi clair du
                  début à la livraison.
                </div>
              </details>
              <details>
                <summary>
                  Quels sont vos délais ?
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="a">
                  Ça dépend du volume et du format, mais un reel vertical part généralement sous
                  quelques jours. On fixe les délais ensemble à l'appel, et je m'y tiens.
                </div>
              </details>
              <details>
                <summary>
                  Quels sont vos tarifs ?
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="a">
                  Au projet ou au forfait mensuel selon vos besoins. Réservez un appel et je vous
                  fais une proposition claire adaptée à votre volume.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section className="section alt" id="contact">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Contact</span>
              <h2>
                Parlons de <span className="kw">votre projet</span>
              </h2>
            </div>
            <div className="contact-grid reveal">
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="row2">
                  <div className="field">
                    <label>Prénom</label>
                    <input type="text" placeholder="Prénom" />
                  </div>
                  <div className="field">
                    <label>Nom</label>
                    <input type="text" placeholder="Nom" />
                  </div>
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="vous@exemple.com" />
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea rows={5} placeholder="Décrivez votre projet en quelques mots…"></textarea>
                </div>
                <button className="btn btn-primary">Envoyer le message</button>
              </form>
              <aside className="cal">
                <div>
                  <h3>Vous préférez en parler de vive voix ?</h3>
                  <p>Réservez un créneau, c'est plus rapide. Planifiez une réunion en un clic avec Cal.com.</p>
                </div>
                <div className="embed">[{' '}]EMBED CAL.COM [{' '}]</div>
                <a href="#" className="btn">
                  Réserver un appel
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* ================= BANDEAU CTA ================= */}
      <section className="cta-band reveal">
        <div className="cta-inner">
          <h2>
            Votre projet mérite d'être vu.
            <br />
            Parlons-en.
          </h2>
          <p>Premier échange gratuit et sans engagement. On transforme votre idée en vertical qui accroche.</p>
          <div className="cta-actions">
            <a href="#contact" className="btn btn-dark">
              Démarrer mon projet
            </a>
            <a href="#contact" className="btn btn-out">
              Réserver un appel
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <a href="#" className="brand">
                ICHOLA<span className="dot">.</span>EDITING
              </a>
              <p>Monteur vidéo &amp; motion designer. Publicités, reels et capsules courtes en vertical.</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h4>Navigation</h4>
                <a href="#accueil">Accueil</a>
                <a href="#realisations">Réalisations</a>
                <a href="#apropos">À propos</a>
                <a href="#contact">Réserver un appel</a>
              </div>
              <div className="foot-col">
                <h4>Réseaux</h4>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
                <a href="#">X / Twitter</a>
                <a href="#">Email</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 ICHOLA EDITING. Tous droits réservés.</span>
            <span>Disponible pour de nouveaux projets · FR / EN</span>
          </div>
        </div>
      </footer>

      {/* ================= MODAL LECTEUR (1d) ================= */}
      <div className="modal" id="modal" ref={modalRef}>
        <button className="modal-nav prev" id="mPrev" aria-label="Précédent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="player" id="player" ref={playerRef}>
          <div className="veil"></div>
          <div className="meta">
            <div className="t" id="mTitle" ref={mTitleRef}>
              Ad — coach business
            </div>
            <div className="s" id="mSub" ref={mSubRef}>
              Ads · Vertical 9:16 · Français
            </div>
          </div>
          <div className="bar">
            <i></i>
          </div>
        </div>
        <button className="modal-nav next" id="mNext" aria-label="Suivant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <button className="modal-close" id="mClose" aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </>
  );
}
