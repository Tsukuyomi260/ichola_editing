'use client';

import { useEffect, useState } from 'react';

/**
 * Hero v3 « écran immersif » — design validé.
 * - La page reste claire ; le sombre est DANS l'écran (le cadre).
 * - Le mur de verticales (.mosaic) et la carte .reel sont des placeholders :
 *   ils seront remplacés par les vraies vidéos d'Ichola (Bunny/Vimeo) plus tard.
 * - TODO (étape ultérieure) : brancher le menu mobile sur .burger,
 *   câbler .reel sur le lecteur/showreel.
 */
export default function HeroScreen() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimate(true);
    }
  }, []);

  return (
    <div id="accueil" className={`hs ${animate ? 'hs-animate' : ''}`}>
      <div className="frame-wrap">
        <div className="frame">
          {/* fond : mur de verticales + voile + grain */}
          <div className="mosaic" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
          <div className="veil" aria-hidden="true"></div>
          <div className="grain" aria-hidden="true"></div>

          {/* coins viseur */}
          <span className="tick tl" aria-hidden="true"></span>
          <span className="tick tr" aria-hidden="true"></span>
          <span className="tick bl" aria-hidden="true"></span>
          <span className="tick br" aria-hidden="true"></span>

          {/* HEADER pilules */}
          <header className="topbar">
            <a className="logo" href="#accueil">
              <span className="mk">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <b>ICHOLA.EDITING</b>
            </a>
            <nav className="pills" aria-label="Navigation principale">
              <a className="pill active" href="#accueil">Accueil</a>
              <a className="pill" href="#realisations">Réalisations</a>
              <a className="pill" href="#apropos">À propos</a>
              <a className="pill" href="#contact">Contact</a>
            </nav>
            <div className="top-right">
              <span className="status"><span className="dot"></span>DISPONIBLE</span>
              <a className="btn-cta" href="#contact">
                Réserver un appel
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <button className="burger" type="button" aria-label="Menu" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              </button>
            </div>
          </header>

          {/* CENTRE : mot géant + carte reel */}
          <div className="center">
            <span className="eyebrow"><i></i>Ichola Editing — monteur vidéo</span>
            <div className="giant-wrap">
              <h1 className="giant">montage<span className="dot">.</span></h1>
              <article className="reel" tabIndex={0} aria-label="Aperçu d'un montage vertical 9:16">
                <div className="film"></div>
                <div className="rgrain"></div>
                <div className="rveil"></div>
                <span className="tag">9:16</span>
                <div className="play">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div className="cap">
                  <div className="t">Ad — coach</div>
                  <div className="s">reel · vertical · FR</div>
                </div>
              </article>
            </div>
            <p className="sub">
              Ads, reels et capsules courtes en <b>9:16 et 4:5</b> — montées pour accrocher dès la
              première seconde et <b>retenir jusqu&apos;à la dernière</b>. Zéro recadrage, jamais.
            </p>
          </div>

          {/* coins bas */}
          <aside className="glass">
            <span className="thumb" aria-hidden="true"></span>
            <span>
              <span className="v">+207M</span>
              <span className="l">vues · MentorShow · S1 2026</span>
            </span>
          </aside>
          <div className="br-actions">
            <a className="scrolldown" href="#realisations" aria-label="Voir la suite">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m0 0l-6-6m6 6l6-6" /></svg>
            </a>
            <a className="pill-white" href="#realisations">
              Voir mes réalisations
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>

          {/* scrub bar */}
          <div className="scrub" aria-hidden="true">
            <span className="tc">00:04:12</span>
            <span className="line"><span className="ph"></span></span>
            <span className="tc">00:24</span>
          </div>
        </div>
      </div>
    </div>
  );
}
