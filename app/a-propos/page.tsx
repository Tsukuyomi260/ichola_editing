import type { Metadata } from 'next';
import AboutScreen from '@/components/AboutScreen';

const DESCRIPTION =
  "Ichola Ochilet, monteur vidéo et motion designer. Plus de 250 vidéos livrées, en majorité au format vertical, pour des créateurs, des coachs et des plateformes de formation, en France et à l'international.";

export const metadata: Metadata = {
  title: 'À propos',
  description: DESCRIPTION,
  alternates: { canonical: '/a-propos' },
  openGraph: {
    type: 'profile',
    locale: 'fr_FR',
    url: '/a-propos',
    title: 'À propos — ICHOLA EDITING',
    description: DESCRIPTION,
  },
};

export default function AProposPage() {
  return <AboutScreen />;
}
