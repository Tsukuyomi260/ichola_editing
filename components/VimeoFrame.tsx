'use client';

import { useEffect, useState } from 'react';
import { playerUrl, type Video } from '@/lib/videos';

/**
 * Aperçu vidéo dans une carte.
 *
 * L'affiche Vimeo est TOUJOURS rendue en dessous : c'est elle qu'on voit au
 * premier peint, et c'est elle qui reste si le lecteur ne se charge pas. Le
 * lecteur ne se monte qu'après l'hydratation, et jamais en prefers-reduced-motion.
 *
 * Garde-fou : un iframe d'une autre origine déclenche `onload` même quand il
 * affiche une page d'erreur, donc on ne peut pas s'y fier. On guette plutôt un
 * postMessage venant de player.vimeo.com ; sans signe de vie au bout de
 * quelques secondes (bloqueur de pub, pare-feu, Vimeo en panne), on démonte le
 * lecteur et l'affiche reprend la main — plutôt que de laisser le visiteur
 * devant un message d'erreur Vimeo au milieu du design.
 *
 * Ce découpage compte pour la suite : avec une vingtaine de vidéos, monter
 * autant d'iframes en même temps mettrait la page à genoux. Ici on ne paie que
 * l'affiche, et le lecteur se monte à la demande (`active`).
 */

const DELAI_SIGNE_DE_VIE = 5000;

export default function VimeoFrame({
  video,
  active = true,
  className = '',
}: {
  video: Video;
  active?: boolean;
  className?: string;
}) {
  const [etat, setEtat] = useState<'affiche' | 'lecteur' | 'echec'>('affiche');

  useEffect(() => {
    // `echec` est définitif : inutile de réessayer un lecteur qui ne répond pas.
    if (!active) {
      setEtat((e) => (e === 'echec' ? e : 'affiche'));
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEtat((e) => (e === 'echec' ? e : 'lecteur'));
  }, [active]);

  useEffect(() => {
    if (etat !== 'lecteur') return;
    let vivant = false;
    const onMessage = (e: MessageEvent) => {
      if (e.origin === 'https://player.vimeo.com') vivant = true;
    };
    window.addEventListener('message', onMessage);
    const minuteur = window.setTimeout(() => {
      if (!vivant) setEtat('echec');
    }, DELAI_SIGNE_DE_VIE);
    return () => {
      window.removeEventListener('message', onMessage);
      window.clearTimeout(minuteur);
    };
  }, [etat]);

  return (
    <div className={`vf ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="vf-poster" src={video.poster} alt={`${video.title} · ${video.sub}`} loading="eager" />
      {etat === 'lecteur' && (
        <iframe
          className="vf-player"
          src={playerUrl(video, { background: true })}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
    </div>
  );
}
