import Link from 'next/link';

/**
 * Pied de page des pages intérieures (/a-propos, /realisations).
 *
 * Conserve le préfixe CSS `ap-` : ce balisage a été écrit pour la page À propos
 * puis partagé tel quel. Les règles ne sont pas imbriquées sous `.ap`, elles
 * fonctionnent donc dans n'importe quel conteneur qui définit les mêmes
 * variables de thème (`.ap`, `.rz`…).
 *
 * L'accueil garde son propre pied de page dans SectionsV4 — il est plus large
 * et fait partie du bloc de bas de page v4 validé.
 */
export default function SiteFooter() {
  return (
    <footer className="ap-footer ap-wrap" data-rv>
      <div className="ap-fgrid">
        <div className="ap-fbrand">
          <div className="wm">
            ICHOLA<span>.</span>EDITING
          </div>
          <p>Monteur vidéo &amp; motion designer. Publicités, capsules courtes et contenus de marque.</p>
        </div>
        <div className="ap-fcol">
          <div className="ap-flbl">Navigation</div>
          <Link href="/">Accueil</Link>
          <Link href="/realisations">Réalisations</Link>
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
        <span className="cp">
          © 2026 <b>ICHOLA EDITING</b>. Tous droits réservés.
        </span>
        <span className="st">
          <i></i>Disponible pour de nouveaux projets · FR / EN
        </span>
      </div>
    </footer>
  );
}
