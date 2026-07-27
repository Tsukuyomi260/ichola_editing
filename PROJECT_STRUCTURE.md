# ICHOLA EDITING — Scaffolding Next.js

## Structure du projet

```
ichola_editing/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Accueil (compose tous les components)
│   └── globals.css         # Styles globaux + Tailwind directives
├── components/
│   ├── Nav.tsx             # Header sticky + menu mobile
│   ├── Hero.tsx            # Section hero + titre + vertical wall (stub)
│   ├── Stats.tsx           # 3 chiffres (grille)
│   ├── Works.tsx           # Réalisations (grille mixte stub)
│   ├── Clients.tsx         # Logos clients
│   ├── Testimonials.tsx    # Témoignages (3 quotes stub)
│   ├── FAQ.tsx             # Accordéon
│   ├── Contact.tsx         # Formulaire + Cal.com
│   ├── CTABand.tsx         # Bandeau dégradé
│   ├── Footer.tsx          # Footer avec liens
│   └── Modal.tsx           # Lecteur modal (stub)
├── lib/                    # Utilitaires (à remplir)
│── tailwind.config.ts      # Config Tailwind + tokens Ichola
├── tsconfig.json           # Config TypeScript
├── next.config.js          # Config Next.js
├── postcss.config.js       # Config PostCSS
├── package.json            # Dépendances
└── r_ichola.html           # Référence HTML (à ne pas modifier)
```

## Tokens Tailwind

Tous les tokens Ichola sont intégrés dans `tailwind.config.ts` :

- **Couleurs** : `bg`, `bg-2`, `surface`, `ink`, `ink-soft`, `muted`, `line`, `green.*`, `btn`
- **Typo** : `font-sans` (Instrument), `font-display` (Bricolage), `font-mono` (JetBrains)
- **Radius** : `rounded-lg` (18px), `rounded-md` (11px)
- **Animations** : `pulse`, `drift`, `reveal`

## Composants à compléter

### Priorité 1 : Hero & VerticalWall
- [ ] Créer composant `VerticalWall.tsx` (rail scrollable, 6 cartes, animations)
- [ ] Intégrer dans Hero.tsx

### Priorité 2 : Works Grid
- [ ] Créer composant `WorkGrid.tsx` (grille mixte ratios, dégradés)
- [ ] Intégrer dans Works.tsx

### Priorité 3 : Testimonials
- [ ] Créer composant `QuoteCard.tsx`
- [ ] Remplir Testimonials.tsx avec vraies données

### Priorité 4 : Modal/Player
- [ ] Compléter Modal.tsx (lecteur pleine hauteur, keyboard nav)
- [ ] Connecter au rail et à la grille

### Priorité 5 : Data & Backend
- [ ] Créer `lib/data.ts` avec vidéos/réalisations
- [ ] Intégrer upload dynamique de vidéos (Bunny/Vimeo IDs)
- [ ] API route pour formulaire contact

## Commandes

```bash
npm install          # Installer dépendances
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Build production
npm run start        # Start production
npm run lint         # Linter
```

## Notes de migration HTML → React

✅ **Fait** :
- Structure de base Next.js
- Tailwind avec tokens Ichola
- Tous les composants majeurs (stubs)
- Styles globaux + animations
- Mobile menu + nav sticky
- FAQ accordéon

❌ **À faire** :
- VerticalWall (rail scrollable + interactions souris/clavier)
- WorkGrid (grille mixte + modal player)
- Modal player (complet avec nav)
- Formulaire contact (backend)
- Révisions avec le HTML comme référence

## Référence design

- `r_ichola.html` — HTML de référence, consulter pour dét…
