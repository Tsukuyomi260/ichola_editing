'use client';

import { useEffect, useRef, useState } from 'react';
import ScreenHeader from './ScreenHeader';

/** Forme d'onde du bloc audio (hauteurs figées : pas de aléatoire, pas de mismatch SSR). */
const WAVE = [22, 48, 34, 72, 56, 88, 42, 64, 96, 50, 30, 68, 84, 44, 26, 58, 92, 38, 70, 54, 80, 36, 62, 46, 74, 28, 52, 40];

/**
 * Hero v3.1 « écran immersif » — design validé.
 * - Header "dock" : en haut dans l'écran ; quand le hero sort du viewport,
 *   il se fixe en bas en verre translucide (liquid glass), même taille,
 *   et revient à sa place initiale dès qu'on remonte vers le hero.
 * - Timecode réel : compteur mm:ss:ff (25 i/s) synchronisé avec la tête
 *   de lecture, boucle sur 00:24.
 * - Placeholders : .mosaic et .reel seront remplacés par les vraies vidéos.
 * - TODO (plus tard) : menu du burger mobile, câbler .reel au showreel.
 */
export default function HeroScreen() {
  const [docked, setDocked] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const phRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);

  // Dock du header : fixé en bas quand le hero n'est plus visible
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setDocked(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Timecode réel + tête de lecture synchronisée (boucle 24 s, 25 i/s)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const DUR = 24000;
    const FPS = 25;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = ((now - t0) % DUR) / DUR;
      if (phRef.current) phRef.current.style.left = `${2 + p * 96}%`;
      if (tcRef.current) {
        const frames = Math.floor(p * (DUR / 1000) * FPS);
        const s = Math.floor(frames / FPS);
        const mm = String(Math.floor(s / 60)).padStart(2, '0');
        const ss = String(s % 60).padStart(2, '0');
        const ff = String(frames % FPS).padStart(2, '0');
        tcRef.current.textContent = `${mm}:${ss}:${ff}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id="accueil" className="hs">
      <div className="frame-wrap">
        <div className="frame" ref={frameRef}>
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

          {/* HEADER pilules partagé — se docke en bas au scroll */}
          <ScreenHeader active="accueil" docked={docked} home />

          {/* CENTRE : mot géant + carte reel */}
          <div className="center">
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
              Des vidéos qui parlent à votre audience&nbsp;: <b>dans ses codes, à son rythme</b>. Ads,
              reels et formats longs, pensés pour vendre. FR&nbsp;/&nbsp;EN.
            </p>
          </div>

          {/* coins bas : piste audio (remplace l'ancienne carte de chiffres) */}
          <aside className="hs-wave" aria-hidden="true">
            <span className="lbl">A1 · audio</span>
            <span className="bars">
              {WAVE.map((h, i) => (
                <i key={i} style={{ '--h': `${h}%`, '--i': i } as React.CSSProperties} />
              ))}
            </span>
            <span className="meta">48 kHz · stéréo</span>
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

          {/* scrub bar — timecode réel */}
          <div className="scrub" aria-hidden="true">
            <span className="tc" ref={tcRef}>00:07:05</span>
            <span className="line"><span className="ph" ref={phRef}></span></span>
            <span className="tc">00:24</span>
          </div>
        </div>
      </div>
    </div>
  );
}
