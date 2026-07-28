# ICHOLA EDITING — Claude Code Guide

## 📋 Résumé projet

Portfolio pour **Ichola Editing** — monteur vidéo / motion designer spécialisé en format vertical (9:16, 4:5). Publicités, reels, capsules courtes. Bilingue FR/EN.

**Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS 4 + Cal.com

**Design**: Thème clair + vert vif (inspiré djanatocarlos.com). Mur vertical scrollable comme hero. Aucun rognage vidéo, vidéos hébergées externalement (Bunny/Cloudflare/Vimeo).

## 🎨 Tokens design (IMMUABLE)

Tous centralisés dans `tailwind.config.ts`. Les couleurs doivent rester pilotables par un seul changement.

```
Fond:     #FCFCFA / #F1F6EF / #FFFFFF
Texte:    #101812 (ink) / #33413A (ink-soft) / #6A756E (muted)
Vert:     #12B76A (défaut) / #0E9558 (deep) / #35D07E (pop) / #0A7A45 (dark) / #DDF3E7 (wash)
Boutons:  #15211B foncé
Ligne:    #E4E8E0
Typo:     Bricolage Grotesque (titres) / Instrument Sans (corps) / JetBrains Mono (code)
Radius:   18px (lg) / 11px (md)
```

## 📁 Structure

- **app/** — layout (ModalProvider), page, globals.css
- **components/** — 10+ composants React (Nav, Hero, Stats, VerticalWall, WorkGrid, FAQ, Contact, Modal, etc.)
- **lib/data.ts** — vidéos, clients, testimonials (données centralisées)
- **tailwind.config.ts** — config design + tokens
- **r_ichola.html** — référence HTML (ne pas modifier, utiliser pour dét…)

## 🔑 Règles de collaboration

### ✅ À faire
- Traduire du HTML → React en respectant 100% du design
- Utiliser Tailwind classes (tokens centralisés dans config)
- Ajouter reveal on scroll (IntersectionObserver 0.12 threshold)
- Implémenter interactions (scroll, keyboard, hover) exactement comme HTML
- Garder animations (drift, play, pulse, reveal) avec même timing/easing

### ❌ À NE PAS faire
- Changer les couleurs, espacements, ou typo sans validation
- "Améliorer" le design (c'est approuvé client)
- Modifier `r_ichola.html` (référence uniquement)
- Ajouter fonctionnalités non planifiées
- Rognage vidéo ou cadrage en 16:9 — respecter les ratios fournis

## 🚀 Commandes

```bash
npm install          # Installer dépendances
npm run dev          # Dev server → http://localhost:3000
npm run build        # Build production
npm run lint         # ESLint
```

## 📝 Checklist

- [ ] Scaffolding Next.js — ✅ DONE
- [ ] Components React (stubs) — ✅ DONE
- [ ] VerticalWall scrollable — ✅ DONE
- [ ] WorkGrid grille mixte — ✅ DONE
- [ ] Modal lecteur 9:16 + keyboard — ✅ DONE
- [ ] Tailwind config + tokens — ✅ DONE
- [ ] Animations (drift, play, pulse, reveal) — ✅ DONE
- [ ] Contact form API route — ❌ TODO
- [ ] Intégration vidéos réelles (Bunny IDs) — ❌ TODO
- [ ] Pages Réalisations (filtres) — ❌ TODO
- [ ] Page À propos — ❌ TODO
- [ ] Back-office CMS — ❌ TODO

## 🔗 Références

- **Design**: Thème clair + vert (djanatocarlos.com style, mais vert)
- **Wireframe**: 1b (validé client)
- **HTML ref**: `r_ichola.html` — consulter pour tous détails de style/interaction
- **Cal.com**: Intégration pour prise de RDV (à faire)
- **Vidéos**: Bunny Stream / Cloudflare Stream / Vimeo (stub IDs pour maintenant)

---

**Mainteneur**: [User] · **Créé**: 2026-07-27 · **Dernier update**: 2026-07-27
