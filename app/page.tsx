'use client';

import { useEffect, useRef } from 'react';
import HeroScreen from '@/components/HeroScreen';
import SectionsV4 from '@/components/SectionsV4';

export default function Page() {
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const mTitleRef = useRef<HTMLDivElement>(null);
  const mSubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    const player = playerRef.current;
    const mTitle = mTitleRef.current;
    const mSub = mSubRef.current;
    const scrollProgress = document.getElementById('scroll-progress');

    /* Scroll progress bar */
    const handleScroll = () => {
      if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrolled + '%';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* Modal player */
    const mClose = document.getElementById('mClose');
    const mNext = document.getElementById('mNext');
    const mPrev = document.getElementById('mPrev');
    const openShowreel = document.getElementById('openShowreel');

    const cards = document.querySelectorAll('.vcard,.work');
    let idx = 0;

    function openCard(i: number) {
      if (!modal || !player || !mTitle || !mSub) return;
      idx = (i + cards.length) % cards.length;
      const c = cards[idx] as HTMLElement;
      const t = c.dataset.title || c.querySelector('.t')?.textContent || 'Réalisation';
      const s = c.dataset.sub || c.querySelector('.s')?.textContent || 'Vertical';
      const c1 = getComputedStyle(c).getPropertyValue('--c1') || '#1f6f47';
      const c2 = getComputedStyle(c).getPropertyValue('--c2') || '#2FCB72';
      mTitle.textContent = t;
      mSub.textContent = s;
      player.style.background = `linear-gradient(135deg,${c1},${c2})`;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal?.classList.remove('open');
      document.body.style.overflow = '';
    }

    cards.forEach((c, i) =>
      c.addEventListener('click', () => openCard(i))
    );

    mClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    mNext?.addEventListener('click', () => openCard(idx + 1));
    mPrev?.addEventListener('click', () => openCard(idx - 1));
    openShowreel?.addEventListener('click', () => openCard(0));

    window.addEventListener('keydown', (e) => {
      if (!modal?.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') openCard(idx + 1);
      if (e.key === 'ArrowLeft') openCard(idx - 1);
    });

    /* Reveal on scroll */
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cards.forEach((c) =>
        c.removeEventListener('click', () => openCard(0))
      );
      mClose?.removeEventListener('click', closeModal);
      modal?.removeEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      mNext?.removeEventListener('click', () => openCard(idx + 1));
      mPrev?.removeEventListener('click', () => openCard(idx - 1));
      window.removeEventListener('keydown', (e) => {
        if (!modal?.classList.contains('open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') openCard(idx + 1);
        if (e.key === 'ArrowLeft') openCard(idx - 1);
      });
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div id="scroll-progress" className="scroll-progress"></div>

      {/* ================= HERO V3 ================= */}
      <main>
        <HeroScreen />

        <SectionsV4 />
      </main>

      {/* ================= MODAL LECTEUR (1d) ================= */}
      <div className="modal" id="modal" ref={modalRef}>
        <button className="modal-nav prev" id="mPrev" aria-label="Précédent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="player" id="player" ref={playerRef}>
          <div className="veil"></div>
          <div className="meta">
            <div className="t" id="mTitle" ref={mTitleRef}>
              Ad — coach business
            </div>
            <div className="s" id="mSub" ref={mSubRef}>
              Ads · Vertical 9:16 · Français
            </div>
          </div>
          <div className="bar">
            <i></i>
          </div>
        </div>
        <button className="modal-nav next" id="mNext" aria-label="Suivant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <button className="modal-close" id="mClose" aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </>
  );
}
