'use client';

import { useEffect, useRef, useState } from 'react';
import ScreenHeader from './ScreenHeader';
import VimeoFrame from './VimeoFrame';
import VideoModal from './VideoModal';
import { SHOWREEL, MUR_HERO, affiche, type Video } from '@/lib/videos';

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
  const [lecture, setLecture] = useState<Video | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const phRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  /** Temps écoulé de la boucle, conservé quand on met en pause hors écran. */
  const ecouleRef = useRef(0);

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

  /* Timecode réel + tête de lecture synchronisée (boucle 24 s, 25 i/s).
     Trois points de vigilance :
     - la tête bouge en `transform`, pas en `left` : `left` refaisait passer la
       barre par layout + paint 60 fois par seconde, pour un déplacement qui
       tient sur le compositeur ;
     - le timecode ne s'écrit que quand l'image change (25/s), pas à chaque
       rendu (60/s) : deux écritures sur trois ne changeaient rien ;
     - la boucle s'arrête quand le hero sort de l'écran — elle tournait
       jusqu'ici pendant tout le défilement de la page — et reprend où elle en
       était grâce à `ecouleRef`. */
  useEffect(() => {
    if (docked) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ph = phRef.current;
    const tc = tcRef.current;
    const line = lineRef.current;
    if (!ph || !tc || !line) return;

    const DUR = 24000;
    const FPS = 25;
    let raf = 0;
    let derniereImage = -1;
    let largeur = line.clientWidth;
    const ro = new ResizeObserver(() => { largeur = line.clientWidth; });
    ro.observe(line);

    const t0 = performance.now() - ecouleRef.current;
    const tick = (now: number) => {
      const ecoule = now - t0;
      ecouleRef.current = ecoule;
      const p = (ecoule % DUR) / DUR;
      // 2 %..98 % : la pastille ne déborde pas des extrémités de la piste.
      ph.style.transform = `translate(-50%,-50%) translateX(${(0.02 + p * 0.96) * largeur}px)`;
      const images = Math.floor(p * (DUR / 1000) * FPS);
      if (images !== derniereImage) {
        derniereImage = images;
        const s = Math.floor(images / FPS);
        const mm = String(Math.floor(s / 60)).padStart(2, '0');
        const ss = String(s % 60).padStart(2, '0');
        const ff = String(images % FPS).padStart(2, '0');
        tc.textContent = `${mm}:${ss}:${ff}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [docked]);

  /* Parallaxe du mur de verticales.
     Le fond suit le pointeur à contresens, avec du retard : lié directement à
     la position de la souris il paraîtrait mécanique, c'est le ressort qui lui
     donne de l'inertie. Ressort critique (amortissement = 1, réponse 0,45 s) :
     il rejoint sa cible sans rebondir — un rebond ne se justifie que quand le
     geste lui-même portait de l'élan, ce qui n'est pas le cas ici.

     Purement décoratif, donc : pointeur fin seulement, coupé si l'utilisateur
     demande moins d'animation, et arrêté dès que le hero sort de l'écran ou que
     le ressort est au repos. */
  useEffect(() => {
    const el = mosaicRef.current;
    if (!el || docked) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const AMP_X = 16;
    const AMP_Y = 10;
    const W = (2 * Math.PI) / 0.45; // pulsation pour une réponse de 0,45 s
    const K = W * W;                // raideur
    const C = 2 * W;                // amortissement critique

    let x = 0, y = 0, vx = 0, vy = 0, cx = 0, cy = 0;
    let raf = 0;
    let precedent = 0;

    const pas = (now: number) => {
      // Pas de temps borné : après un onglet en arrière-plan, un dt énorme
      // ferait exploser l'intégration.
      const dt = Math.min((now - precedent) / 1000, 1 / 30);
      precedent = now;
      vx += (K * (cx - x) - C * vx) * dt; x += vx * dt;
      vy += (K * (cy - y) - C * vy) * dt; y += vy * dt;
      // La rotation de repos est réécrite : l'inline remplace le transform CSS.
      el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(-5deg)`;
      if (Math.abs(cx - x) < 0.05 && Math.abs(cy - y) < 0.05 &&
          Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) {
        raf = 0; // au repos : on rend la main au navigateur
        return;
      }
      raf = requestAnimationFrame(pas);
    };
    const reveiller = () => {
      if (raf) return;
      precedent = performance.now();
      raf = requestAnimationFrame(pas);
    };
    const surDeplacement = (e: PointerEvent) => {
      cx = -((e.clientX / window.innerWidth) - 0.5) * 2 * AMP_X;
      cy = -((e.clientY / window.innerHeight) - 0.5) * 2 * AMP_Y;
      reveiller();
    };
    const surSortie = () => { cx = 0; cy = 0; reveiller(); };

    window.addEventListener('pointermove', surDeplacement, { passive: true });
    document.addEventListener('pointerleave', surSortie);
    return () => {
      window.removeEventListener('pointermove', surDeplacement);
      document.removeEventListener('pointerleave', surSortie);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [docked]);

  return (
    <div id="accueil" className="hs">
      <div className="frame-wrap">
        <div className="frame" ref={frameRef}>
          {/* fond : mur de verticales + voile + grain */}
          {/* Le mur : les vraies affiches du catalogue, pas des dégradés. Le
              dégradé de chaque carte reste dessous, en secours si une affiche
              ne charge pas. `--i` sert au décalage de la cascade. */}
          <div className="mosaic" ref={mosaicRef} aria-hidden="true">
            {MUR_HERO.map((v, i) => (
              <i
                key={v.id}
                style={{ '--p': `url("${affiche(v, '360x640')}")`, '--i': i } as React.CSSProperties}
              />
            ))}
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
              <button
                type="button"
                className="reel"
                onClick={() => setLecture(SHOWREEL)}
                aria-label={`Agrandir avec le son : ${SHOWREEL.title} — ${SHOWREEL.sub}`}
              >
                <VimeoFrame video={SHOWREEL} />
                <div className="rveil" aria-hidden="true"></div>
                <span className="tag">{SHOWREEL.ratio}</span>
                <span className="muted" aria-hidden="true">muet</span>
                <div className="expand" aria-hidden="true">
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5" /></svg>
                    Voir avec le son
                  </span>
                </div>
                <div className="cap">
                  <div className="t">{SHOWREEL.title}</div>
                  <div className="s">{SHOWREEL.sub}</div>
                </div>
              </button>
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
            <span className="line" ref={lineRef}><span className="ph" ref={phRef}></span></span>
            <span className="tc">00:24</span>
          </div>
        </div>
      </div>

      <VideoModal video={lecture} onClose={() => setLecture(null)} />
    </div>
  );
}
