import type { Metadata } from 'next';
import AboutScreen from '@/components/AboutScreen';

export const metadata: Metadata = {
  title: 'À propos — ICHOLA EDITING',
  description:
    "Monteur vidéo et motion designer. Plus de 250 vidéos livrées, en majorité au format vertical, pour des créateurs, des coachs et des plateformes de formation, en France et à l'international.",
};

export default function AProposPage() {
  return <AboutScreen />;
}
