import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/Modal';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const instrument = Instrument_Sans({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'ICHOLA EDITING — Monteur vidéo vertical',
  description:
    'Je monte des vidéos verticales qui retiennent l\'attention. Publicités, reels et capsules courtes en 9:16 et 4:5.',
  metadataBase: new URL('https://ichola-editing.com'),
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
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head />
      <body>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
