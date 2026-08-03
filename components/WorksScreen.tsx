'use client';

import { useEffect, useMemo, useState } from 'react';
import ScreenHeader from './ScreenHeader';
import ScrollProgress from './ScrollProgress';
import SiteFooter from './SiteFooter';
import VideoModal from './VideoModal';
import WorkCard from './WorkCard';
import { CATALOGUE, orientation, type Video } from '@/lib/videos';

/**
 * Page Réalisations — préfixe CSS rz-.
 *
 * Filtres cumulables sur deux axes : orientation et genre. À l'intérieur
 * d'un axe les choix s'additionnent (ou logique), entre axes ils se croisent
 * (et logique) — c'est le comportement attendu d'un filtre de catalogue.
 *
 * Les compteurs affichés tiennent compte des AUTRES axes déjà actifs : un
 * chiffre annonce donc exactement ce qu'on obtiendra en cliquant. Et une option
 * qui ne ramènerait rien n'est pas affichée du tout — cliquer pour tomber sur
 * une grille vide est le pire scénario sur un portfolio.
 *
 * L'état est reflété dans l'URL (?orientation=…&genre=…&q=…) via
 * history.replaceState : la page est partageable et le bouton retour marche.
 */

/**
 * Axes de filtrage. La langue en a été retirée : un seul montage du catalogue
 * est en anglais, un filtre à une entrée ne rend aucun service. Le champ
 * `langue` reste renseigné dans les données — il suffira de rajouter l'axe ici
 * le jour où il y aura de quoi le nourrir.
 */
type Axe = 'orientation' | 'genre';
const AXES: Axe[] = ['orientation', 'genre'];

function valeursDe(v: Video, axe: Axe): string[] {
  return axe === 'orientation' ? [orientation(v)] : v.tags ?? [];
}

export default function WorksScreen() {
  const [docked, setDocked] = useState(false);
  const [lecture, setLecture] = useState<Video | null>(null);
  const [q, setQ] = useState('');
  const [choix, setChoix] = useState<Record<Axe, string[]>>({ orientation: [], genre: [] });

  /* Le header se docke dès qu'on quitte le haut de page. */
  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lecture de l'état depuis l'URL au premier rendu. */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setQ(p.get('q') ?? '');
    setChoix({ orientation: p.getAll('orientation'), genre: p.getAll('genre') });
  }, []);

  /* Écriture de l'état dans l'URL, sans recharger ni empiler l'historique. */
  useEffect(() => {
    const p = new URLSearchParams();
    AXES.forEach((a) => choix[a].forEach((val) => p.append(a, val)));
    if (q.trim()) p.set('q', q.trim());
    const url = p.toString() ? `?${p.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [choix, q]);

  /* Apparition au défilement. Relancé après chaque filtrage : les cartes qui
     entrent dans la grille doivent être observées à leur tour. Celles déjà
     visibles au moment de l'observation reçoivent `.in` immédiatement. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cibles = document.querySelectorAll('.rz [data-rv]:not(.in)');
    if (!cibles.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    cibles.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  const bascule = (axe: Axe, val: string) =>
    setChoix((c) => ({
      ...c,
      [axe]: c[axe].includes(val) ? c[axe].filter((x) => x !== val) : [...c[axe], val],
    }));

  const actifs = AXES.reduce((n, a) => n + choix[a].length, 0);
  const toutEffacer = () => {
    setChoix({ orientation: [], genre: [] });
    setQ('');
  };

  /** Un axe est satisfait s'il est vide, ou si la vidéo porte l'une des valeurs choisies. */
  const satisfait = (v: Video, axe: Axe) =>
    choix[axe].length === 0 || valeursDe(v, axe).some((x) => choix[axe].includes(x));

  const correspondQ = (v: Video) =>
    !q.trim() || `${v.title} ${v.sub}`.toLowerCase().includes(q.trim().toLowerCase());

  const resultats = useMemo(
    () =>
      CATALOGUE.filter(
        (v) => correspondQ(v) && AXES.every((a) => satisfait(v, a))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [choix, q]
  );

  /** Compte ce que donnerait l'ajout de `val` sur `axe`, les autres axes restant en place. */
  const compter = (axe: Axe, val: string) =>
    CATALOGUE.filter(
      (v) =>
        correspondQ(v) &&
        valeursDe(v, axe).includes(val) &&
        AXES.filter((a) => a !== axe).every((a) => satisfait(v, a))
    ).length;

  /** Options d'un axe, triées par abondance, celles qui ne ramènent rien exclues. */
  const optionsDe = (axe: Axe) => {
    const toutes = new Set<string>();
    CATALOGUE.forEach((v) => valeursDe(v, axe).forEach((x) => toutes.add(x)));
    return [...toutes]
      .map((val) => ({ val, n: compter(axe, val) }))
      .filter((o) => o.n > 0 || choix[axe].includes(o.val))
      .sort((a, b) => b.n - a.n);
  };

  const Groupe = ({ axe, titre }: { axe: Axe; titre: string }) => {
    const options = optionsDe(axe);
    if (options.length < 2) return null; // un seul choix possible = filtre inutile
    return (
      <div className="rz-groupe">
        <span className="rz-glbl">{titre}</span>
        <div className="rz-pills">
          {options.map(({ val, n }) => {
            const on = choix[axe].includes(val);
            return (
              <button
                key={val}
                type="button"
                className={`rz-pill${on ? ' on' : ''}`}
                aria-pressed={on}
                onClick={() => bascule(axe, val)}
              >
                {val}
                <span className="n">{n}</span>
                {on && <span className="x" aria-hidden="true">×</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <ScrollProgress />

      <div className="rz">
        <ScreenHeader active="realisations" docked={docked} light />

        <section className="rz-head rz-wrap">
          <h1 className="rz-title">Réalisations<em>.</em></h1>
          <p className="rz-count">
            {resultats.length === CATALOGUE.length
              ? `${CATALOGUE.length} réalisations disponibles`
              : `${resultats.length} sur ${CATALOGUE.length} réalisations`}
          </p>

          <div className="rz-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher une réalisation…"
              aria-label="Rechercher une réalisation"
            />
            {q && (
              <button type="button" className="rz-xq" onClick={() => setQ('')} aria-label="Effacer la recherche">
                ×
              </button>
            )}
          </div>
        </section>

        <div className="rz-filtres rz-wrap">
          <Groupe axe="orientation" titre="Orientation" />
          <Groupe axe="genre" titre="Genre" />
          {actifs > 0 && (
            <button type="button" className="rz-clear" onClick={toutEffacer}>
              Tout effacer
            </button>
          )}
        </div>

        <section className="rz-grille rz-wrap">
          {resultats.length > 0 ? (
            resultats.map((v, i) => <WorkCard key={v.id} v={v} i={i} onOpen={setLecture} />)
          ) : (
            <p className="rz-vide">
              Aucune réalisation ne correspond à cette combinaison.{' '}
              <button type="button" onClick={toutEffacer}>Tout effacer</button>
            </p>
          )}
        </section>

        <SiteFooter />
      </div>

      <VideoModal video={lecture} onClose={() => setLecture(null)} />
    </>
  );
}
