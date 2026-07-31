'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ScreenHeader from './ScreenHeader';
import { PremiereProLogo, AfterEffectsLogo, CapCutLogo } from './ToolLogos';

/**
 * Page À propos — préfixe CSS ap-, header partagé .sh-.
 *
 * Section signature : le parcours en « timeline de montage » sur DEUX pistes.
 * La bio dit que MentorShow et le freelance sont menés en parallèle : dans une
 * vraie timeline, parallèle veut dire deux pistes vidéo. V1 porte le studio puis
 * MentorShow, V2 porte le freelance.
 *
 * La photo est mise à l'échelle depuis le haut du cadre 9:16 : le coin bas-droit
 * (filigrane du studio) sort du champ sans qu'on recadre le visage.
 */

const CLIP_WAVE_A = [40, 70, 35, 90, 55, 75, 30, 60, 85, 45, 65, 38];
const CLIP_WAVE_B = [60, 95, 50, 80, 100, 45, 70, 88, 55, 92, 40, 75, 62, 85];
const CLIP_WAVE_C = [50, 78, 42, 66, 90, 48, 72, 58, 84, 44];

function Wave({ bars }: { bars: number[] }) {
  return (
    <div className="wave" aria-hidden="true">
      {bars.map((h, i) => (
        <i key={i} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export default function AboutScreen() {
  const [docked, setDocked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [statsPlayed, setStatsPlayed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  /* Barre de progression du scroll */
  useEffect(() => {
    const el = document.getElementById('scroll-progress');
    const onScroll = () => {
      if (!el) return;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      el.style.width = (doc > 0 ? (window.scrollY / doc) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Marqueur vert du titre : animé au chargement, sauf reduced-motion */
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAnimate(true);
  }, []);

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
      <div id="scroll-progress" className="scroll-progress"></div>

      <div className={`ap${animate ? ' ap-animate' : ''}`} ref={rootRef}>
        {/* ============ HERO CLAIR ============ */}
        <ScreenHeader active="apropos" docked={docked} light />

        <section className="ap-hero" ref={heroRef}>
          <div className="ap-hstack">
          <div className="ap-hcard">
          <div className="ap-hero-copy">
            <h1 className="ap-h1">
              <span className="l">Je suis OCHILET</span>
              <span className="l"><span className="ap-mk">ichola</span>.</span>
            </h1>

            <div className="ap-hcta">
              <Link className="ap-btn-a" href="/#contact">
                Réserver un appel
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link className="ap-link" href="/#realisations">
                Voir mes réalisations
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            </div>

            <div className="ap-trust">
              <span><span className="n">+250</span> vidéos livrées</span>
              <span className="sep" aria-hidden="true"></span>
              <span>Studio dirigé <span className="n">2 ans</span></span>
            </div>
          </div>

          <div className="ap-stage">
            <div className="ap-slab">
              <span className="rec">REC ● 9:16 · 4:5</span>
            </div>

            <figure className="ap-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="shot" src="/PHOTO.jpeg" alt="Portrait d'Ichola Ochilet, monteur vidéo, en studio" />
              <div className="sveil" aria-hidden="true"></div>
              <span className="stk a" aria-hidden="true"></span><span className="stk b" aria-hidden="true"></span>
              <span className="stk c" aria-hidden="true"></span><span className="stk d" aria-hidden="true"></span>
              <span className="tag">9:16</span>
              <figcaption className="cap">
                <div className="t">Ichola</div>
                <div className="s">monteur · motion · fr/en</div>
              </figcaption>
            </figure>

            <div className="ap-hchip">
                <span className="k" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                </span>
              <span>
                <span className="v">207M</span>
                <span className="l">vues · S1 2026</span>
              </span>
            </div>
          </div>
          </div>
          </div>
        </section>

        {/* ============ BIO ============ */}
        <section className="ap-bio ap-wrap" data-rv>
          <h2 className="ap-title">Qui monte vos vidéos<em>.</em></h2>
          <div className="ap-bio-grid">
            <div className="ap-bio-txt">
              <p>
                Je suis monteur vidéo et motion designer. J&apos;ai livré <b>plus de 250 vidéos</b>, en
                grande majorité au format vertical, pour des créateurs, des coachs et des plateformes
                de formation en France et à l&apos;international.
              </p>
              <p>
                Aujourd&apos;hui, je monte les publicités de <b>MentorShow</b> au sein d&apos;une équipe
                de monteurs, plateforme française de masterclass, en français et en anglais. En
                parallèle, je travaille en freelance pour des coachs, des agents immobiliers et des
                créateurs de contenu.
              </p>
              <p>
                Avant cela, j&apos;ai créé de zéro un studio de production photo et vidéo : les locaux,
                le matériel, l&apos;équipe. Je l&apos;ai dirigé pendant deux ans.
              </p>
              <div className="ap-pull">
                <p>
                  Cette double expérience — production et post-production — change la façon dont
                  j&apos;aborde un projet.
                </p>
              </div>
            </div>
            <div>
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
            </div>
          </div>
        </section>

        {/* ============ TIMELINE DE MONTAGE ============ */}
        <section className="ap-tl ap-wrap" data-rv>
          <span className="ap-eb"><i></i>Parcours</span>
          <h2 className="ap-title">Le montage de ma carrière<em>.</em></h2>

          <div className="ap-tlbox">
            <span className="ap-ptk a"></span><span className="ap-ptk b"></span>
            <span className="ap-ptk c"></span><span className="ap-ptk d"></span>

            <div className="ap-tlhead">
              <span>{'// '}<b>Séquence</b> — parcours</span>
              <span>2 pistes · V1 / V2</span>
            </div>

            <div className="ap-ruler" aria-hidden="true">
              <i className="maj" style={{ left: '0%' }}></i><b style={{ left: '0%' }}>DÉBUT</b>
              <i style={{ left: '12.5%' }}></i><i style={{ left: '25%' }}></i>
              <i className="maj" style={{ left: '37.5%' }}></i>
              <i style={{ left: '50%' }}></i><i style={{ left: '62.5%' }}></i>
              <i className="maj" style={{ left: '75%' }}></i>
              <i style={{ left: '87.5%' }}></i>
              <i className="maj" style={{ left: '100%' }}></i><b style={{ left: '100%' }}>NOW</b>
            </div>

            <div className="ap-tracks">
              <div className="ap-play" aria-hidden="true"></div>

              <div className="ap-track">
                <span className="ap-vlbl">V1</span>
                <span className="ap-lane" aria-hidden="true"></span>
                <article className="ap-clip ap-c-studio">
                  <div className="tc">2 ans · direction</div>
                  <h3>Studio de production</h3>
                  <p>Créé de zéro : les locaux, le matériel, l&apos;équipe. Photo et vidéo.</p>
                  <Wave bars={CLIP_WAVE_A} />
                </article>
                <article className="ap-clip ap-c-mentor">
                  <div className="tc">Aujourd&apos;hui</div>
                  <h3>MentorShow</h3>
                  <p>
                    Je monte les publicités de la plateforme française de masterclass, en français et
                    en anglais, au sein d&apos;une équipe de monteurs.
                  </p>
                  <Wave bars={CLIP_WAVE_B} />
                </article>
              </div>

              <div className="ap-track">
                <span className="ap-vlbl">V2</span>
                <span className="ap-lane" aria-hidden="true"></span>
                <article className="ap-clip ap-c-free">
                  <div className="tc">En parallèle</div>
                  <h3>Freelance</h3>
                  <p>Coachs, agents immobiliers et créateurs de contenu.</p>
                  <Wave bars={CLIP_WAVE_C} />
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CHIFFRES ============ */}
        <section className={`ap-stats ap-wrap${statsPlayed ? ' played in' : ''}`} ref={statsRef} data-rv>
          <div className="ap-panel">
            <span className="ap-ptk a"></span><span className="ap-ptk b"></span>
            <span className="ap-ptk c"></span><span className="ap-ptk d"></span>
            <div className="ap-phead">
              <span>{'// '}<b>Dérushage</b> — les chiffres</span>
              <span>S1 2026</span>
            </div>
            <div className="ap-sgrid">
              <div className="ap-stat">
                <div className="n"><em>+</em><span data-count="250">0</span></div>
                <div className="l">vidéos livrées, en majorité en vertical</div>
                <div className="m">9:16 · 4:5 · 16:9</div>
                <div className="bar" style={{ '--w': '86%' } as React.CSSProperties}><i></i></div>
              </div>
              <div className="ap-stat">
                <div className="n"><span data-count="207">0</span><em>&nbsp;M</em></div>
                <div className="l">de vues générées avec l&apos;équipe MentorShow</div>
                <div className="m">Cumul S1 2026</div>
                <div className="bar" style={{ '--w': '72%' } as React.CSSProperties}><i></i></div>
              </div>
              <div className="ap-stat">
                <div className="n"><span data-count="4">0</span></div>
                <div className="l">personnes encadrées en studio</div>
                <div className="m">Direction montage</div>
                <div className="bar" style={{ '--w': '40%' } as React.CSSProperties}><i></i></div>
              </div>
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
              Premier échange <b>gratuit et sans engagement</b>. On transforme votre idée en vertical
              qui accroche.
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
        <footer className="ap-footer ap-wrap">
          <div className="ap-fgrid">
            <div className="ap-fbrand">
              <div className="wm">ICHOLA<span>.</span>EDITING</div>
              <p>
                Monteur vidéo &amp; motion designer. Publicités, reels et capsules courtes en vertical.
              </p>
            </div>
            <div className="ap-fcol">
              <div className="ap-flbl">Navigation</div>
              <Link href="/">Accueil</Link>
              <Link href="/#realisations">Réalisations</Link>
              <Link href="/a-propos">À propos</Link>
              <Link href="/#contact">Réserver un appel</Link>
            </div>
            <div className="ap-fcol">
              <div className="ap-flbl">Réseaux</div>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">X / Twitter</a>
              <a href="#">Email</a>
            </div>
          </div>
          <div className="ap-fbot">
            <span className="cp">© 2026 <b>ICHOLA EDITING</b>. Tous droits réservés.</span>
            <span className="st"><i></i>Disponible pour de nouveaux projets · FR / EN</span>
          </div>
        </footer>
      </div>
    </>
  );
}
