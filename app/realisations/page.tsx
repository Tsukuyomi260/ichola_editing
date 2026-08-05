import type { Metadata } from 'next';
import WorksScreen from '@/components/WorksScreen';

const DESCRIPTION =
  'Le catalogue des montages signés Ichola Editing : publicités, capsules podcast, motion design et spots, en vertical comme en horizontal, en français et en anglais.';

export const metadata: Metadata = {
  title: 'Réalisations',
  description: DESCRIPTION,
  alternates: { canonical: '/realisations' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/realisations',
    title: 'Réalisations · ICHOLA EDITING',
    description: DESCRIPTION,
  },
};

export default function RealisationsPage() {
  return <WorksScreen />;
}
