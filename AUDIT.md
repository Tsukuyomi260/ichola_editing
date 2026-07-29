# AUDIT — ICHOLA EDITING (lecture seule)

> État du projet au 2026-07-29. Aucune modification effectuée.

---

## 1) Arborescence

```
app/
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── CTABand.tsx
├── Clients.tsx
├── Contact.tsx
├── FAQ.tsx
├── FAQAccordion.tsx
├── Footer.tsx
├── Hero.tsx
├── Modal.tsx
├── Nav.tsx
├── Stats.tsx
├── TestimonialCard.tsx
├── Testimonials.tsx
├── TestimonialsSection.tsx
├── VerticalWall.tsx
├── WorkGrid.tsx
└── Works.tsx
```

> ⚠️ Le projet n'utilise **pas** de dossier `src/`.

---

## 2) Layout (`app/layout.tsx`)

```tsx
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
```

---

## 3) Globals (`app/globals.css` — structure des ~120 premières lignes)

**Ligne 1 — import Google Fonts en CSS :**

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:...&family=Instrument+Sans:...&family=JetBrains+Mono:...&display=swap');
```

**Tokens design (`:root`) :**

```css
:root{
  --bg:        #FCFCFA;   /* base quasi blanche */
  --bg-2:      #F1F6EF;   /* sections alternées, vert très pâle */
  --surface:   #FFFFFF;   /* cartes */
  --ink:       #101812;   /* vert-noir (texte principal) */
  --ink-soft:  #33413A;   /* titres secondaires */
  --muted:     #6A756E;   /* texte discret */
  --line:      #E4E8E0;   /* filets */
  --line-soft: #EEF2EA;
  --green:     #12B76A;   /* accent vif */
  --green-deep:#0E9558;   /* hover accent */
  --green-pop: #35D07E;   /* détails vifs */
  --green-dark:#0A7A45;
  --green-wash:#DDF3E7;
  --btn:       #15211B;   /* bouton principal foncé */
  --btn-hover: #0B120E;
  --radius:    18px;
  --radius-sm: 11px;
  --maxw:      1180px;
  --ease:      cubic-bezier(.22,.61,.36,1);
}
```

**Blocs présents dans l'ordre :**

| Bloc | Contenu |
|---|---|
| Scroll progress | Barre fixe en haut, gradient vert, glow pulsé, `clip-path` en flèche |
| Reset + body | `overflow-x:hidden`, Instrument Sans, fond `--bg` |
| `.wrap` / `.mono` / `.eyebrow` | Utilitaires layout et typo |
| Boutons | `.btn`, `.btn-primary`, `.btn-ghost` (pilule 999px) |
| Nav | `position:sticky`, backdrop-blur, état `.scrolled` (height 70px → 56px, fond opacifié, border-bottom) |
| … | (hero, rail, vcard, stats, réalisations, FAQ, contact, modal, media queries plus bas dans le fichier) |

---

## 4) Page d'accueil (`app/page.tsx` — 663 lignes)

Composant unique `'use client'` monolithique. Le gros `useEffect` gère :

- **Scroll** : barre de progression + toggle `.scrolled` sur le nav (>8px) + state `isScrolled` (>50px)
- **Menu mobile** : burger open/close via classes DOM
- **Modal lecteur** : clic sur `.vcard`/`.work`, navigation clavier (Esc, ←, →), gradient dynamique `--c1`/`--c2`
- **Animation hero scroll-linked (Effet A)** : `progressOf()` + `seg()` + transforms `translateX/scale/opacity` sur les cartes du rail — **désactivée sur mobile** (`window.innerWidth <= 768`)
- **Reveal on scroll** : IntersectionObserver (threshold 0.12)

**Sections dans l'ordre du JSX :**

| Ligne | Section | Implémentation |
|---|---|---|
| 187 | Scroll progress bar | inline |
| 189 | **NAV** | inline (header sticky + `.nav-inner-wrapper`) |
| 207 | Menu mobile | inline |
| 248 | **HERO** | composant `<Hero />` |
| 252 | **CHIFFRES** (stats) | inline |
| 276 | **RÉALISATIONS** (`#realisations`) | inline (work-grid) |
| 435 | **CLIENTS** (logos) | inline |
| 449 | **TÉMOIGNAGES** | composant `<TestimonialsSection />` (marquee) |
| 481 | **FAQ** (`#apropos`) | composant `<FAQAccordion />` |
| 529 | **CONTACT** (`#contact`) | inline (formulaire) |
| 575 | **BANDEAU CTA** | inline |
| 595 | **FOOTER** | inline |
| 629 | **MODAL LECTEUR** | inline |

**Imports de composants :** `Hero`, `TestimonialsSection`, `FAQAccordion` uniquement.

---

## 5) Config

### Versions

| Package | Déclarée | Installée |
|---|---|---|
| next | ^15.0.0 | **15.5.22** |
| react / react-dom | ^19.0.0 | **19.2.8** |
| tailwindcss (via `@tailwindcss/postcss`) | ^4.3.3 | **4.3.3** |
| framer-motion | ^12.42.2 | **12.42.2** — ⚠️ installé mais **non utilisé** dans le code actuel |

### tailwind.config

**Oui** — `tailwind.config.ts` existe à la racine.
⚠️ Le styling effectif de la page est en **CSS vanilla** dans `globals.css` (classes `.nav`, `.hero`, `.vcard`…), pas en classes Tailwind — sauf quelques composants stubs non utilisés (ex : `Nav.tsx`, `Contact.tsx`) écrits en Tailwind.

### Polices — double chargement ⚠️

Deux méthodes coexistent :

1. **`next/font/google`** dans `layout.tsx` → injecte les variables `--font-bricolage`, `--font-instrument`, `--font-jetbrains` sur `<html>`.
2. **`@import url(fonts.googleapis.com/…)`** en ligne 1 de `globals.css`.

Le CSS référence directement `"Bricolage Grotesque"`, `"Instrument Sans"`, `"JetBrains Mono"` par nom → **c'est le `@import` CSS qui est effectivement utilisé**. Les variables next/font sont injectées mais jamais consommées.

---

## 6) Composants existants

### `components/Hero.tsx` (utilisé ✅)

- Exporte `HeroCard` (type), `HERO_CARDS` (6 cartes 9:16 avec gradients `--c1`/`--c2`)
- Structure :
  - `<header id="accueil">`
  - `<section class="hero">` → hero-head (eyebrow, h1, lede, chips, CTA) + wall-head
  - `<section class="hero-stage" id="hero-stage">` → `.hero-stage-pin` (sticky) → `.rail#hero-rail` → 6 `.vcard`
- Chaque `.vcard` : `.film`, `.grain`, `.veil`, `.tag`, `.mute`, `.meta` (`.t`/`.s`), `.bar`, `.play`
- Props : `cards` (défaut `HERO_CARDS`), `onCardClick`
- L'animation scroll-linked est pilotée **depuis page.tsx** (pas dans ce fichier)

### `components/Nav.tsx` (NON utilisé ⚠️)

- Composant autonome avec `useState` (`scrolled`, `menuOpen`)
- Écrit en **classes Tailwind** (`sticky top-0 z-50`, `backdrop-blur-sm`…)
- Nav desktop + burger + menu mobile plein écran
- **N'est importé nulle part** — le nav réel est codé inline dans `page.tsx` (L189-247) en CSS vanilla

### `Header.tsx`

**N'existe pas.**

### Autres composants non référencés par la page actuelle

`VerticalWall.tsx`, `WorkGrid.tsx`, `Works.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `Stats.tsx`, `Clients.tsx`, `CTABand.tsx`, `Footer.tsx`, `Contact.tsx` — anciens stubs (souvent en Tailwind) supplantés par le markup inline de `page.tsx`.

---

## Synthèse

- **Stack réelle** : Next 15.5.22 · React 19.2.8 · CSS vanilla (Tailwind installé mais quasi inutilisé) · framer-motion installé mais inutilisé
- **Architecture** : `page.tsx` monolithique (663 lignes) + 3 composants actifs (`Hero`, `TestimonialsSection`, `FAQAccordion`) + ~10 composants morts
- **Points d'attention** : double chargement des polices, composants stubs orphelins, dépendance framer-motion superflue
