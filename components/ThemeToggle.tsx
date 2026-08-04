'use client';

import { useEffect, useState } from 'react';

/**
 * Bascule clair / sombre — préfixe CSS `th-`.
 *
 * Le thème est un attribut `data-theme` posé sur <html> ; tout le reste n'est
 * que redéfinition de variables CSS. Rien à passer en props, aucun contexte.
 *
 * Le choix est mémorisé dans localStorage. Sans choix explicite, on suit la
 * préférence système, et on continue de la suivre si elle change en cours de
 * route — quelqu'un dont le téléphone bascule en sombre le soir voit le site
 * basculer aussi.
 *
 * L'application au tout premier rendu se fait dans un script bloquant du
 * <head> (voir app/layout.tsx) : sans lui, la page s'afficherait en clair une
 * fraction de seconde avant de virer au sombre.
 */

export type Theme = 'light' | 'dark';

export const THEME_KEY = 'ichola-theme';

function appliquer(t: Theme) {
  document.documentElement.dataset.theme = t;
  document.documentElement.style.colorScheme = t;
}

export default function ThemeToggle() {
  // On part de `null` : tant que le composant n'est pas monté côté client, on
  // ignore le thème réel. Rendre l'icône avant l'hydratation provoquerait une
  // différence entre le HTML du serveur et celui du navigateur.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const enregistre = localStorage.getItem(THEME_KEY) as Theme | null;
    const systeme = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(enregistre ?? (systeme.matches ? 'dark' : 'light'));

    // On ne suit le système que tant que l'utilisateur n'a rien choisi.
    const onSysteme = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return;
      const t: Theme = e.matches ? 'dark' : 'light';
      appliquer(t);
      setTheme(t);
    };
    systeme.addEventListener('change', onSysteme);
    return () => systeme.removeEventListener('change', onSysteme);
  }, []);

  const basculer = () => {
    const suivant: Theme = theme === 'dark' ? 'light' : 'dark';
    appliquer(suivant);
    localStorage.setItem(THEME_KEY, suivant);
    setTheme(suivant);
  };

  const sombre = theme === 'dark';

  return (
    <button
      type="button"
      className="th-toggle"
      onClick={basculer}
      aria-label={sombre ? 'Passer en thème clair' : 'Passer en thème sombre'}
      title={sombre ? 'Thème clair' : 'Thème sombre'}
    >
      {/* Les deux icônes sont toujours présentes et se croisent en rotation ;
          n'en monter qu'une ferait sauter le bouton à chaque bascule. */}
      <span className="th-ic" aria-hidden="true">
        <svg className="th-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
        </svg>
        <svg className="th-moon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.7 14.6A8.6 8.6 0 0 1 9.4 3.3a1 1 0 0 0-1.3-1.2 10.6 10.6 0 1 0 13.8 13.8 1 1 0 0 0-1.2-1.3z" />
        </svg>
      </span>
    </button>
  );
}
