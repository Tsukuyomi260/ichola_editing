import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
};

/**
 * 404 dans le langage « écran » : la page manquante devient un plan coupé
 * au montage. Composant serveur — aucune interactivité nécessaire.
 */
export default function NotFound() {
  return (
    <div className="nf">
      <div className="nf-wrap">
        <div className="nf-frame">
          <div className="nf-glow" aria-hidden="true"></div>
          <div className="nf-grain" aria-hidden="true"></div>
          <span className="nf-tick tl" aria-hidden="true"></span>
          <span className="nf-tick tr" aria-hidden="true"></span>
          <span className="nf-tick bl" aria-hidden="true"></span>
          <span className="nf-tick br" aria-hidden="true"></span>

          <div className="nf-center">
            <span className="nf-eb"><i></i>Erreur 404</span>
            <h1 className="nf-giant">coupé<em>.</em></h1>
            <p className="nf-sub">
              Ce plan a été <b>coupé au montage</b>. La page que vous cherchez n&apos;existe pas,
              ou n&apos;existe plus.
            </p>
            <div className="nf-cta">
              <Link className="nf-btn" href="/">
                Retour à l&apos;accueil
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link className="nf-pill" href="/#realisations">Voir mes réalisations</Link>
            </div>
          </div>

          <div className="nf-scrub" aria-hidden="true">
            <span className="tc">00:00:00</span>
            <span className="line"></span>
            <span className="tc">signal perdu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
