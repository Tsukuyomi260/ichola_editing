'use client';

import { useEffect, useRef } from 'react';
import { playerUrl, RATIO_CSS, type Video } from '@/lib/videos';

/**
 * Lecteur agrandi — préfixe CSS vm-.
 *
 * S'ouvre par-dessus la page : on ne quitte jamais le site. Le cadre est
 * dimensionné par son ratio, donc une verticale reste verticale et pleine —
 * jamais de recadrage ni de bandes noires.
 *
 * Accessibilité : Échap ferme, le clic sur le fond ferme, le focus est piégé
 * dans la fenêtre puis rendu à l'élément qui l'a ouverte, et le défilement de
 * la page est bloqué pendant l'ouverture.
 */
export default function VideoModal({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const ouvreurRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!video) return;

    ouvreurRef.current = document.activeElement as HTMLElement | null;
    const overflowInitial = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      // Piège à focus : on boucle sur les éléments focusables de la fenêtre.
      const cibles = boxRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (!cibles || cibles.length === 0) return;
      const premier = cibles[0];
      const dernier = cibles[cibles.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowInitial;
      ouvreurRef.current?.focus();
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="vm open"
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} — ${video.sub}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="vm-inner" ref={boxRef}>
        <div
          className="vm-stage"
          style={{ '--ar': RATIO_CSS[video.ratio] } as React.CSSProperties}
        >
          {/* Affiche en dessous : si le lecteur ne charge pas, on voit l'image
              plutôt qu'un rectangle noir. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="vm-poster" src={video.poster} alt="" aria-hidden="true" />
          <iframe
            src={playerUrl(video, { autoplay: true })}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
          />
        </div>

        <div className="vm-bar">
          <div className="vm-meta">
            <div className="t">{video.title}</div>
            <div className="s">{video.sub}</div>
          </div>
          <button className="vm-close" type="button" onClick={onClose} ref={closeRef} aria-label="Fermer le lecteur">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
