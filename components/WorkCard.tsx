'use client';

import { useEffect, useRef, useState } from 'react';
import VimeoFrame from './VimeoFrame';
import { RATIO_CLASS, type Video } from '@/lib/videos';

/**
 * Carte de réalisation — partagée par l'accueil et /realisations.
 *
 * La vidéo tourne d'elle-même, en boucle muette, mais UNIQUEMENT quand la carte
 * est à l'écran : le lecteur se monte à l'entrée dans le viewport et se démonte
 * à la sortie. Avec un catalogue qui grossira, c'est ce qui évite de charger
 * autant de lecteurs Vimeo que de cartes. Le son arrive au clic, en grand.
 */
export default function WorkCard({
  v,
  onOpen,
  i = 0,
}: {
  v: Video;
  onOpen: (v: Video) => void;
  i?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`lp-wk ${RATIO_CLASS[v.ratio]}`}
      data-rv
      style={{ '--rvd': `${i * 0.08}s` } as React.CSSProperties}
      onClick={() => onOpen(v)}
      aria-label={`Agrandir avec le son : ${v.title} · ${v.sub}`}
    >
      <VimeoFrame video={v} active={visible} />
      <div className="veilw" aria-hidden="true"></div>
      <span className="tag">{v.ratio}</span>
      {v.duration && <span className="dur">{v.duration}</span>}
      <div className="playw" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </div>
      <div className="metaw">
        <div className="t">{v.title}</div>
      </div>
    </button>
  );
}
