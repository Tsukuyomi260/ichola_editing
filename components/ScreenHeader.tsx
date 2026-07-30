'use client';

import Link from 'next/link';

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
 *
 * TODO : brancher le menu du burger mobile (bouton présent, inerte).
 */

export type ScreenNav = 'accueil' | 'realisations' | 'apropos' | 'contact';

export default function ScreenHeader({
  active,
  docked,
  home = false,
}: {
  active: ScreenNav;
  docked: boolean;
  home?: boolean;
}) {
  const anchor = (hash: string) => (home ? `#${hash}` : `/#${hash}`);
  const accueilHref = home ? '#accueil' : '/';
  const cls = (k: ScreenNav) => `sh-pill${active === k ? ' active' : ''}`;
  const cur = (k: ScreenNav) => (active === k ? ('page' as const) : undefined);

  return (
    <div className="sh-slot">
      <header className={`sh-topbar${docked ? ' sh-docked' : ''}`}>
        <Link className="sh-logo" href={accueilHref}>
          <span className="mk">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <b>ICHOLA.EDITING</b>
        </Link>

        <nav className="sh-pills" aria-label="Navigation principale">
          <Link className={cls('accueil')} aria-current={cur('accueil')} href={accueilHref}>Accueil</Link>
          <Link className={cls('realisations')} aria-current={cur('realisations')} href={anchor('realisations')}>Réalisations</Link>
          <Link className={cls('apropos')} aria-current={cur('apropos')} href="/a-propos">À propos</Link>
          <Link className={cls('contact')} aria-current={cur('contact')} href={anchor('contact')}>Contact</Link>
        </nav>

        <div className="sh-right">
          <Link className="sh-btn-cta" href={anchor('contact')}>
            Réserver un appel
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <button className="sh-burger" type="button" aria-label="Menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </header>
    </div>
  );
}
