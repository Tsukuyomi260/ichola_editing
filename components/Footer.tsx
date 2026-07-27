'use client';

export default function Footer() {
  return (
    <footer className="mt-22 pt-14 border-t border-line bg-bg-2">
      <div className="wrap">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-10 mb-11">
          <div className="flex-1">
            <a href="#" className="font-display font-black text-xl mb-2.5">
              ICHOLA<span className="text-green">.</span>EDITING
            </a>
            <p className="text-muted text-sm max-w-xs">
              Monteur vidéo &amp; motion designer. Publicités, reels et capsules
              courtes en vertical.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-3.5">
                Navigation
              </h4>
              <nav className="flex flex-col gap-1">
                <a
                  href="#accueil"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  Accueil
                </a>
                <a
                  href="#realisations"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  Réalisations
                </a>
                <a
                  href="#apropos"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  À propos
                </a>
                <a
                  href="#contact"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  Réserver un appel
                </a>
              </nav>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-3.5">
                Réseaux
              </h4>
              <nav className="flex flex-col gap-1">
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  X / Twitter
                </a>
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-green transition-colors"
                >
                  Email
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 pt-5.5 border-t border-line text-xs text-muted">
          <span>© 2026 ICHOLA EDITING. Tous droits réservés.</span>
          <span>Disponible pour de nouveaux projets · FR / EN</span>
        </div>
      </div>
    </footer>
  );
}
