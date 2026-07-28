'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Video {
  title: string;
  sub: string;
  c1: string;
  c2: string;
}

interface ModalContextType {
  isOpen: boolean;
  currentIndex: number;
  videos: Video[];
  openModal: (index: number, videoList: Video[]) => void;
  closeModal: () => void;
  nextVideo: () => void;
  prevVideo: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);

  const openModal = (index: number, videoList: Video[]) => {
    setCurrentIndex(index);
    setVideos(videoList);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextVideo();
      if (e.key === 'ArrowLeft') prevVideo();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, videos.length, nextVideo, prevVideo, closeModal]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        currentIndex,
        videos,
        openModal,
        closeModal,
        nextVideo,
        prevVideo,
      }}
    >
      {children}
      <ModalPlayer />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
}

function ModalPlayer() {
  const { isOpen, currentIndex, videos, closeModal, nextVideo, prevVideo } =
    useModal();

  if (!isOpen || videos.length === 0) return null;

  const video = videos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-6 bg-black/72 backdrop-blur"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      {/* Nav prev - desktop only */}
      <button
        onClick={prevVideo}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 bg-black/50 text-white grid place-items-center hover:border-white hover:bg-black/70 transition-all hidden md:grid"
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

      {/* Player */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{ width: 'min(400px, 90vw)', aspectRatio: '9/16' }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${video.c1}, ${video.c2})`,
          }}
        />

        {/* Veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Meta */}
        <div className="absolute bottom-6 left-5 right-5 text-white">
          <div className="font-semibold text-lg">{video.title}</div>
          <div className="font-mono text-xs text-[#bfe9cf] mt-1">{video.sub}</div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/25">
          <div className="h-full bg-green-pop" style={{ width: '40%' }} />
        </div>
      </div>

      {/* Nav next - desktop only */}
      <button
        onClick={nextVideo}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 bg-black/50 text-white grid place-items-center hover:border-white hover:bg-black/70 transition-all hidden md:grid"
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

      {/* Close button */}
      <button
        onClick={closeModal}
        className="absolute top-5.5 right-5.5 w-11 h-11 rounded-full border border-white/25 bg-black/50 text-white grid place-items-center hover:border-white hover:bg-black/70 transition-all"
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
