'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

/**
 * Header « écran » partagé — préfixe CSS .sh-
 *
 * Vit à l'intérieur du cadre sombre d'un hero (accueil ou page intérieure).
 * Le dock (position fixe en bas quand le hero sort du viewport) est piloté
 * par la page hôte, qui observe son propre cadre et passe `docked`.
 *
 * - `active` : quelle pilule est en blanc.
 * - `home`   : sur l'accueil les liens sont des ancres ; ailleurs ils
 *              repartent vers la page d'accueil (/#realisations…).
 * - `light`  : variante pour les pages à hero clair. Une fois docké, le header
 *              redevient verre sombre — le dock est identique partout.
 *
 * Menu mobile : panneau plein écran en verre sombre, ouverture par glissement
 * avec apparition décalée des entrées. Le header reste au-dessus du panneau
 * pour que le bouton de fermeture soit toujours atteignable.
 */

export type ScreenNav = 'accueil' | 'realisations' | 'apropos' | 'contact';

const ENTREES: { cle: ScreenNav; libelle: string }[] = [
  { cle: 'accueil', libelle: 'Accueil' },
  { cle: 'realisations', libelle: 'Réalisations' },
  { cle: 'apropos', libelle: 'À propos' },
  { cle: 'contact', libelle: 'Contact' },
];

export default function ScreenHeader({
  active,
  docked,
  home = false,
  light = false,
}: {
  active: ScreenNav;
  docked: boolean;
  home?: boolean;
  light?: boolean;
}) {
  const [ouvert, setOuvert] = useState(false);

  /* Dock en deux temps. `sh-docked` pose la barre en position fixe (état de
     repos = sortie, en bas hors écran), `sh-dock-in` la fait monter une image
     plus tard. On garde `sh-docked` le temps de la sortie pour que la barre
     redescende par où elle est arrivée au lieu de disparaître d'un coup.
     Le créneau reste réservé par .sh-slot (88 px) : la mise en page ne bouge
     pas pendant ces 460 ms. */
  const [dockPose, setDockPose] = useState(docked);
  const [dockEntre, setDockEntre] = useState(docked);

  useEffect(() => {
    if (docked) {
      setDockPose(true);
      let id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => setDockEntre(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setDockEntre(false);
    // Sans animation demandée, la barre disparaît tout de suite : la garder
    // 460 ms de plus la laisserait visible par-dessus le hero revenu à l'écran.
    const sansMouvement = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setDockPose(false), sansMouvement ? 0 : 460);
    return () => clearTimeout(t);
  }, [docked]);

  const anchor = (hash: string) => (home ? `#${hash}` : `/#${hash}`);
  const accueilHref = home ? '#accueil' : '/';
  const lien = (k: ScreenNav) =>
    k === 'accueil' ? accueilHref
    : k === 'apropos' ? '/a-propos'
    : k === 'realisations' ? '/realisations'
    : anchor(k);
  const cur = (k: ScreenNav) => (active === k ? ('page' as const) : undefined);

  /* Menu ouvert : défilement bloqué, Échap ferme, et on referme si l'écran
     repasse au-dessus du seuil mobile (rotation de tablette, par exemple). */
  useEffect(() => {
    if (!ouvert) return;
    const overflowInitial = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuvert(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1020) setOuvert(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = overflowInitial;
    };
  }, [ouvert]);

  return (
    <div className="sh-slot">
      <header
        className={`sh-topbar${light ? ' sh-light' : ''}${dockPose ? ' sh-docked' : ''}${dockPose && dockEntre ? ' sh-dock-in' : ''}${ouvert ? ' sh-menu-open' : ''}`}
      >
        <Link className="sh-logo" href={accueilHref} onClick={() => setOuvert(false)}>
          <span className="mk">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <b>ICHOLA.EDITING</b>
        </Link>

        <nav className="sh-pills" aria-label="Navigation principale">
          {ENTREES.map(({ cle, libelle }) => (
            <Link
              key={cle}
              className={`sh-pill${active === cle ? ' active' : ''}`}
              aria-current={cur(cle)}
              href={lien(cle)}
            >
              {libelle}
            </Link>
          ))}
        </nav>

        <div className="sh-right">
          <ThemeToggle />
          <Link className="sh-btn-cta" href={anchor('contact')} onClick={() => setOuvert(false)}>
            <span className="lbl">Réserver un appel</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <button
            className={`sh-burger${ouvert ? ' is-open' : ''}`}
            type="button"
            aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={ouvert}
            aria-controls="sh-menu"
            onClick={() => setOuvert((v) => !v)}
          >
            <span className="bl b1" aria-hidden="true"></span>
            <span className="bl b2" aria-hidden="true"></span>
          </button>
        </div>
      </header>

      <div id="sh-menu" className={`sh-menu${ouvert ? ' open' : ''}`} hidden={!ouvert}>
        <nav aria-label="Navigation mobile">
          <ul>
            {ENTREES.map(({ cle, libelle }, i) => (
              <li key={cle} style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={lien(cle)}
                  aria-current={cur(cle)}
                  className={active === cle ? 'on' : undefined}
                  onClick={() => setOuvert(false)}
                >
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  {libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sh-menu-foot" style={{ '--i': ENTREES.length } as React.CSSProperties}>
          <Link className="sh-menu-cta" href={anchor('contact')} onClick={() => setOuvert(false)}>
            Réserver un appel
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <span className="sh-menu-note">Disponible pour de nouveaux projets · FR / EN</span>
        </div>
      </div>
    </div>
  );
}
