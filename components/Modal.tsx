'use client';

import { useState, useEffect } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % 6);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + 6) % 6);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-6 bg-black/70 backdrop-blur"
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
    >
      <button
        onClick={() => handlePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 bg-black/50 text-white grid place-items-center hover:border-white transition-all md:inline-grid hidden"
        aria-label="Précédent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="w-5 h-5"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ width: 'min(400px, 90vw)', aspectRatio: '9/16' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1f6f47, #2FCB72)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-5 right-5 text-white">
          <div className="font-semibold text-lg">
            Ad — coach business
          </div>
          <div className="font-mono text-xs text-green-deep mt-1">
            Ads · Vertical 9:16
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/25">
          <div
            className="h-full bg-green-pop"
            style={{ width: '40%' }}
          />
        </div>
      </div>

      <button
        onClick={() => handleNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 bg-black/50 text-white grid place-items-center hover:border-white transition-all md:inline-grid hidden"
        aria-label="Suivant"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="w-5 h-5"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-5.5 right-5.5 w-11 h-11 rounded-full border border-white/25 bg-black/50 text-white grid place-items-center hover:border-white transition-all"
        aria-label="Fermer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
