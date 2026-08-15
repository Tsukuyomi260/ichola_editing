'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ScreenHeader from './ScreenHeader';
import ScrollProgress from './ScrollProgress';
import SiteFooter from './SiteFooter';
import { PremiereProLogo, AfterEffectsLogo, CapCutLogo } from './ToolLogos';

/**
 * Page À propos — préfixe CSS ap-, header partagé .sh-.
 *
 * Section Parcours : liste à filets, dates en mono à gauche, poste et
 * description à droite. Panneau sombre — le langage « écran » du site.
 *
 * La photo est mise à l'échelle depuis le haut du cadre 9:16 : le coin bas-droit
 * (filigrane du studio) sort du champ sans qu'on recadre le visage.
 */

export default function AboutScreen() {
  const [docked, setDocked] = useState(false);
  const [statsPlayed, setStatsPlayed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  /* Le marqueur vert du titre est désormais minuté en CSS (voir .ap-mk::before) :
     plus d'état React pour le déclencher, donc plus de dérive entre le trait et
     la cascade d'entrée quand l'hydratation tarde. */

  /* Dock du header : fixé en bas quand le hero n'est plus visible */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setDocked(!entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Reveal doux */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll('[data-rv]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  /* Compteurs du panneau chiffres */
  useEffect(() => {
    const sec = statsRef.current;
    if (!sec) return;
    const nums = sec.querySelectorAll<HTMLElement>('[data-count]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nums.forEach((n) => (n.textContent = n.dataset.count ?? ''));
      setStatsPlayed(true);
      return;
    }
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setStatsPlayed(true);
        nums.forEach((n) => {
          const target = parseInt(n.dataset.count ?? '0', 10);
          let t0: number | null = null;
          const step = (ts: number) => {
            if (t0 === null) t0 = ts;
            const p = Math.min(1, (ts - t0) / 1200);
            n.textContent = String(Math.round(ease(p) * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />

      <div className="ap" ref={rootRef}>
        {/* ============ HERO CLAIR ============ */}
        <ScreenHeader active="apropos" docked={docked} light />

        {/* ============ HERO : portrait en grand + identité + bio ============ */}
        <section className="ap-hero" ref={heroRef}>
          <div className="ap-hstack">
            <div className="ap-hcard">
              {/* Le portrait occupe toute la colonne gauche : c'est la pièce
                  maîtresse de la page, plus une vignette posée à côté. */}
              <div className="ap-stage">
                <div className="ap-slab" aria-hidden="true"></div>

                <figure className="ap-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="shot" src="/PHOTO.jpeg" alt="Portrait d'Ichola Ochilet, monteur vidéo, en studio" />
                  <div className="sveil" aria-hidden="true"></div>
                  <span className="stk a" aria-hidden="true"></span><span className="stk b" aria-hidden="true"></span>
                  <span className="stk c" aria-hidden="true"></span><span className="stk d" aria-hidden="true"></span>
                  <figcaption className="cap">
                    <div className="t">Ichola</div>
                    <div className="s">monteur · motion · fr/en</div>
                  </figcaption>
                </figure>

              </div>

              <div className="ap-hero-copy">
                <h1 className="ap-h1">
                  <span className="l">Je suis OCHILET</span>
                  <span className="l"><span className="ap-mk">ichola</span>.</span>
                </h1>

                {/* Deux paragraphes, plus trois : le poste chez MentorShow et le
                    freelance étaient repris mot pour mot par le parcours juste en
                    dessous, et « +999 vidéos » par le panneau chiffres. La bio ne
                    garde que ce qu'aucun panneau ne peut porter — la position et
                    le pourquoi — et la citation devient le point d'arrivée. */}
                <div className="ap-bio-txt">
                  <p>
                    Je suis monteur vidéo et motion designer. Je travaille surtout le format vertical,
                    pour des créateurs, des coachs et des plateformes de formation, en France et à
                    l&apos;international.
                  </p>
                  <p>
                    Avant cela, j&apos;ai créé de zéro un studio de production photo et vidéo : les locaux,
                    le matériel, l&apos;équipe. Je l&apos;ai dirigé pendant deux ans.
                  </p>
                  <div className="ap-pull">
                    <p>
                      Cette double expérience, production et post-production, change la façon dont
                      j&apos;aborde un projet.
                    </p>
                  </div>
                </div>

                <div className="ap-hcta">
                  <Link className="ap-btn-a" href="/#contact">
                    Réserver un appel
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                  <Link className="ap-link" href="/realisations">
                    Voir mes réalisations
                    <span className="ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FICHE TECHNIQUE ============ */}
        <section className="ap-fiche ap-wrap" data-rv>
              <div className="ap-spec">
                <span className="ap-ptk a"></span><span className="ap-ptk b"></span>
                <span className="ap-ptk c"></span><span className="ap-ptk d"></span>

                <div className="ap-spec-head">
                  <span>{'// '}<b>Fiche technique</b></span>
                  <span>Monteur · Motion</span>
                </div>

                <div className="ap-spec-row">
                  <div className="k">Outils</div>
                  <div className="v tools">
                    <span className="ap-tchip"><span className="lg"><PremiereProLogo /></span>Premiere&nbsp;Pro</span>
                    <span className="ap-tchip"><span className="lg"><AfterEffectsLogo /></span>After&nbsp;Effects</span>
                    <span className="ap-tchip"><span className="lg"><CapCutLogo /></span>CapCut</span>
                  </div>
                </div>

                <div className="ap-spec-row">
                  <div className="k">Formats</div>
                  <div className="v">
                    <span className="val">9:16</span><i></i>
                    <span className="val">4:5</span><i></i>
                    <span className="val">16:9</span>
                  </div>
                </div>

                <div className="ap-spec-row">
                  <div className="k">Livrables</div>
                  <div className="v">
                    <span className="val">Ads</span><i></i>
                    <span className="val">VSL</span><i></i>
                    <span className="val">Reels</span><i></i>
                    <span className="val">Capsules podcast</span><i></i>
                    <span className="val">Motion design</span>
                  </div>
                </div>

                <div className="ap-spec-row">
                  <div className="k">Langues</div>
                  <div className="v">
                    <span className="val">Français</span><i></i>
                    <span className="val">English</span>
                  </div>
                </div>
              </div>
        </section>

        {/* ============ PARCOURS ============ */}
        <section className="ap-tl ap-wrap" data-rv>
          <h2 className="ap-title">Mon parcours<em>.</em></h2>

          <div className="ap-path">
            <span className="ap-ptk a"></span><span className="ap-ptk b"></span>
            <span className="ap-ptk c"></span><span className="ap-ptk d"></span>

            <div className="ap-path-head">
              <span>{'// '}<b>Parcours</b></span>
              <span>Monteur · Motion</span>
            </div>

            <ol className="ap-path-list">
              <li className="now" data-rv style={{ '--rvd': '0s' } as React.CSSProperties}>
                <span className="an">2026 <i aria-hidden="true">→</i></span>
                <div className="tx">
                  <h3>Monteur · MentorShow</h3>
                  <p>Publicités bilingues FR/EN, formats verticaux.</p>
                </div>
              </li>
              <li className="now" data-rv style={{ '--rvd': '.1s' } as React.CSSProperties}>
                <span className="an">En parallèle</span>
                <div className="tx">
                  <h3>Freelance · ICHOLA EDITING</h3>
                  <p>Coachs, agents immobiliers, créateurs.</p>
                </div>
              </li>
              <li data-rv style={{ '--rvd': '.2s' } as React.CSSProperties}>
                <span className="an">2023 <i aria-hidden="true">→</i> 2025</span>
                <div className="tx">
                  <h3>Fondateur &amp; directeur de studio</h3>
                  <p>Studio photo/vidéo monté de zéro, équipe de 4 personnes.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ============ CHIFFRES ============ */}
        {/* Plus de panneau bordé : la page en empilait quatre à la suite, et le
            chiffre le plus fort du portfolio — 207 millions de vues — était rendu
            à 58px dans une boîte polie. Les chiffres portent maintenant l'échelle
            eux-mêmes, comme « montage. » et « parlons. » ailleurs sur le site.
            Le troisième chiffre (« 3 logiciels ») a sauté : il répétait à
            l'identique la ligne « Outils » de la fiche technique, et trois nombres
            moyens pèsent moins que deux nombres énormes. */}
        <section className={`ap-stats ap-wrap${statsPlayed ? ' played in' : ''}`} ref={statsRef} data-rv>
          <div className="ap-sgrid">
            <div className="ap-stat">
              <div className="n"><em>+</em><span data-count="999">0</span></div>
              <div className="l">vidéos livrées</div>
              <div className="m">9:16 · 4:5 · 16:9</div>
              {/* Sans unité : la barre est mise à l'échelle (scaleX), pas redimensionnée. */}
              <div className="bar" style={{ '--w': '.86' } as React.CSSProperties}><i></i></div>
            </div>
            <div className="ap-stat">
              <div className="n"><span data-count="207">0</span><em>&nbsp;M</em></div>
              <div className="l">de vues générées avec l&apos;équipe MentorShow</div>
              <div className="m">Cumul S1 2026</div>
              <div className="bar" style={{ '--w': '.72' } as React.CSSProperties}><i></i></div>
            </div>
          </div>
        </section>

        {/* ============ CTA « parlons. » ============ */}
        <div className="ap-cta" data-rv>
          <div className="ap-fr">
            <div className="ap-glow" aria-hidden="true"></div>
            <div className="ap-grain" aria-hidden="true"></div>
            <span className="ap-tick tl" aria-hidden="true"></span>
            <span className="ap-tick tr" aria-hidden="true"></span>
            <span className="ap-tick bl" aria-hidden="true"></span>
            <span className="ap-tick br" aria-hidden="true"></span>
            <span className="ap-eb"><i></i>Prochaine étape</span>
            <h2>parlons<em>.</em></h2>
            <p className="lede">
              Premier échange <b>gratuit et sans engagement</b>. Vous me racontez votre projet, je
              vous dis comment je le monterais.
            </p>
            <div className="btns">
              <Link className="ap-btn-a" href="/#contact">
                Réserver un appel
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link className="ap-pilll" href="/#contact">M&apos;écrire</Link>
            </div>
            <div className="sb" aria-hidden="true">
              <span className="tc">00:00:00</span>
              <span className="ln"><i></i></span>
              <span className="tc">GO</span>
            </div>
          </div>
        </div>

        {/* ============ FOOTER ============ */}
        <SiteFooter />
      </div>
    </>
  );
}
