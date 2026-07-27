import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="fr" suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  );
}
