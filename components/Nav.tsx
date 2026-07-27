'use client';

import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-line bg-white/92 backdrop-blur-sm'
            : 'border-b border-transparent bg-white/82 backdrop-blur-sm'
        }`}
      >
        <div className="wrap flex items-center justify-between h-[70px] gap-6">
          <a href="#" className="font-display font-black text-lg tracking-tight">
            ICHOLA<span className="text-green">.</span>EDITING
          </a>

          <nav className="hidden md:flex gap-1">
            <a
              href="#accueil"
              className="text-sm font-medium text-ink-soft px-3 py-2 rounded-lg hover:text-ink hover:bg-line-soft transition-all"
            >
              Accueil
            </a>
            <a
              href="#realisations"
              className="text-sm font-medium text-ink-soft px-3 py-2 rounded-lg hover:text-ink hover:bg-line-soft transition-all"
            >
              Réalisations
            </a>
            <a
              href="#apropos"
              className="text-sm font-medium text-ink-soft px-3 py-2 rounded-lg hover:text-ink hover:bg-line-soft transition-all"
            >
              À propos
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3 ml-auto">
            <span className="flex items-center gap-2 text-xs font-medium text-ink-soft">
              <span className="w-2 h-2 rounded-full bg-green-pop animate-pulse"></span>
              Disponible
            </span>
            <a href="#contact" className="btn btn-primary">
              Réserver un appel
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 border border-line bg-surface rounded-xl flex items-center justify-center text-ink hover:border-ink transition-all"
            aria-label="Menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-bg flex flex-col p-6 pt-24">
          <nav className="flex flex-col gap-1">
            <a
              href="#accueil"
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-3xl py-3 border-b border-line"
            >
              Accueil
            </a>
            <a
              href="#realisations"
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-3xl py-3 border-b border-line"
            >
              Réalisations
            </a>
            <a
              href="#apropos"
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-3xl py-3 border-b border-line"
            >
              À propos
            </a>
          </nav>
          <div className="mt-auto">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary w-full justify-center"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      )}
    </>
  );
}
