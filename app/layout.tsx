import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const DESCRIPTION =
  'Monteur vidéo et motion designer spécialisé dans le format vertical. Publicités, reels et capsules courtes en 9:16 et 4:5, montées pour retenir l\'attention. FR / EN.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // `default` sert l'accueil ; `template` habille automatiquement les autres
    // pages, qui n'ont donc qu'à déclarer leur propre titre court.
    default: 'ICHOLA EDITING — Monteur vidéo & motion designer vertical',
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Ichola Ochilet' }],
  creator: 'Ichola Ochilet',
  keywords: [
    'monteur vidéo',
    'motion designer',
    'vidéo verticale',
    '9:16',
    'reels',
    'publicité vidéo',
    'montage vidéo freelance',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'ICHOLA EDITING — Monteur vidéo & motion designer vertical',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICHOLA EDITING — Monteur vidéo & motion designer vertical',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={jetbrains.variable}
    >
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
