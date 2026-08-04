/**
 * Catalogue des vidéos hébergées chez Vimeo.
 *
 * Une seule source de vérité pour tout le site : le hero, la grille des
 * réalisations et, plus tard, la page /realisations et le lecteur modal.
 *
 * Pour ajouter une vidéo :
 *   1. la mettre en ligne sur Vimeo ;
 *   2. relever son identifiant (les chiffres de l'URL vimeo.com/XXXXXXXXXX) ;
 *   3. récupérer l'affiche via
 *      https://vimeo.com/api/oembed.json?url=https://vimeo.com/IDENTIFIANT
 *      puis remplacer le suffixe `-d_200x150` par `-d_720x1280` ;
 *   4. ajouter l'entrée ci-dessous.
 *
 * `hash` : à renseigner uniquement pour une vidéo non répertoriée (le jeton qui
 * suit le `/` dans l'URL privée). Sans lui, Vimeo refuse la lecture.
 */

export type Ratio = '9:16' | '5:6' | '4:5' | '16:9';

/** Ratio CSS correspondant, pour dimensionner un cadre sans jamais recadrer. */
export const RATIO_CSS: Record<Ratio, string> = {
  '9:16': '9 / 16',
  '5:6': '5 / 6',
  '4:5': '4 / 5',
  '16:9': '16 / 9',
};

/** Genres utilisés par les filtres de /realisations. */
export type Tag = 'Ads' | 'Podcast' | 'Short / Reel' | 'Motion design' | 'VSL' | 'Témoignage';
export type Langue = 'Français' | 'English';

export type Video = {
  id: string;
  hash?: string;
  title: string;
  sub: string;
  poster: string;
  ratio: Ratio;
  /** Durée affichée sur la carte, au format mm:ss. */
  duration?: string;
  tags?: Tag[];
  langue?: Langue;
};

/** Vertical ou horizontal — déduit du ratio, jamais saisi à la main. */
export function orientation(v: Video): 'Vertical' | 'Horizontal' {
  return v.ratio === '16:9' ? 'Horizontal' : 'Vertical';
}

/**
 * Vidéo mise en avant dans le cadre du hero d'accueil.
 * Elle figure aussi au catalogue : c'est une réalisation à part entière, pas
 * seulement une bande-annonce.
 */
export const SHOWREEL: Video = {
  id: '1214542567',
  title: 'Ad — coach',
  sub: 'Spot publicitaire · vertical · FR',
  poster:
    'https://i.vimeocdn.com/video/2185499314-bc5394a1d06053aabbb6ce488160f466292b96722de85fb6a5af546eb56c2262-d_720x1280',
  ratio: '9:16',
  duration: '00:18',
  tags: ['Ads', 'Short / Reel'],
  langue: 'Français',
};

/**
 * Grille « Dernières réalisations ».
 * Les titres et sous-titres viennent des noms de fichiers Vimeo et du contenu
 * réel des vidéos — rien n'est inventé.
 */
export const REALISATIONS: Video[] = [
  {
    id: '1215014254',
    title: 'Maxwell',
    sub: 'Capsule podcast · vertical · FR',
    poster:
      'https://i.vimeocdn.com/video/2186086817-57f7fe0af91f16b0a0bf948f797cc85e70126cc3760710b426fa71a9ee619eb9-d_720x1280',
    ratio: '9:16',
    duration: '01:23',
    tags: ['Podcast', 'Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1215041025',
    title: 'Chancio',
    sub: 'Motion design · promo · FR',
    poster:
      'https://i.vimeocdn.com/video/2186117850-87fccd2e4ffba13588056a3347ca1df899ba2e6ee2bd702c90db4f34b244cdf0-d_900x1080',
    ratio: '5:6',
    duration: '00:29',
    tags: ['Motion design'],
    langue: 'Français',
  },
  {
    id: '1214552992',
    title: 'Healing Days — Londres',
    sub: 'Ads · MentorShow · EN',
    poster:
      'https://i.vimeocdn.com/video/2185513487-2bce720226f1461c4077afed0ef4220305e39d5d39ada4be7055a1893bd8e5a3-d_1280x720',
    ratio: '16:9',
    duration: '01:59',
    tags: ['Ads'],
    langue: 'English',
  },
];

/** Seconde rangée — formats verticaux (9:16 et 5:6). */
export const REALISATIONS_2: Video[] = [
  {
    id: '1215184801',
    title: 'Paul Bordas x Wilson BOTOYIYE',
    sub: 'Capsule podcast · vertical · FR',
    poster:
      'https://i.vimeocdn.com/video/2186293201-9c6cdf668ef0461bcfafdffb03d894af6f5d3089a2184f564d98f0fb47292f1a-d_720x1280',
    ratio: '9:16',
    duration: '00:45',
    tags: ['Podcast', 'Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1214554767',
    title: 'Réel',
    sub: 'Motion design · vertical · FR',
    poster:
      'https://i.vimeocdn.com/video/2185514722-c32e7ec85ec011c6c1e7d4c7ab551a4cfddcc416c47102cbbec1bb494848bd43-d_720x1280',
    ratio: '9:16',
    duration: '00:20',
    tags: ['Motion design'],
    langue: 'Français',
  },
  {
    id: '1215182648',
    title: 'Branding For All',
    sub: 'Spot publicitaire · vertical',
    poster:
      'https://i.vimeocdn.com/video/2186290740-e0063d9c42ac44c73c3f8612b844d16f2104bdebe0782b317762eaabf76b98b1-d_900x1080',
    ratio: '5:6',
    duration: '00:32',
    tags: ['Ads'],
    langue: 'Français',
  },
];

/** Classe de ratio utilisée par les cartes de la grille. */
export const RATIO_CLASS: Record<Ratio, string> = {
  '9:16': 'r916',
  '5:6': 'r56',
  '4:5': 'r45',
  '16:9': 'r169',
};

/**
 * Construit l'URL du lecteur.
 * `background` masque toutes les commandes et lance la lecture en boucle
 * muette : c'est le mode « aperçu », celui qu'on veut dans une carte.
 */
export function playerUrl(v: Video, opts: { background?: boolean; autoplay?: boolean } = {}) {
  const p = new URLSearchParams();
  if (v.hash) p.set('h', v.hash);
  if (opts.background) {
    // Aperçu : boucle muette, aucune commande.
    p.set('background', '1');
    p.set('autoplay', '1');
    p.set('loop', '1');
    p.set('muted', '1');
    p.set('autopause', '0');
  } else if (opts.autoplay) {
    // Lecteur agrandi : avec le son. Le clic qui ouvre la fenêtre compte comme
    // geste utilisateur, donc les navigateurs autorisent la lecture sonore.
    p.set('autoplay', '1');
    p.set('autopause', '0');
  }
  // Toujours : pas d'habillage Vimeo, pas de pistage.
  p.set('controls', opts.background ? '0' : '1');
  p.set('title', '0');
  p.set('byline', '0');
  p.set('portrait', '0');
  p.set('badge', '0');
  p.set('dnt', '1');
  return `https://player.vimeo.com/video/${v.id}?${p.toString()}`;
}

/**
 * Réalisations visibles uniquement sur /realisations.
 *
 * C'est ici qu'on ajoute les nouvelles vidéos : l'accueil garde ses six cartes
 * choisies pour leur mélange de formats, le catalogue s'allonge sans le
 * déséquilibrer. Une entrée suffit, la page se réorganise seule — les filtres
 * et leurs compteurs sont calculés à partir de cette liste.
 */
export const AUTRES: Video[] = [
  {
    id: '1215301368',
    // Titre provisoire tiré de l'accroche à l'écran — le nom de fichier Vimeo
    // (« SHORT 14 (1) ») n'a rien à faire sur un portfolio.
    title: 'Airbnb — réservations',
    sub: 'Short · conciergerie · FR',
    poster:
      'https://i.vimeocdn.com/video/2186442010-baee096879519fb3c06736bb1ed4d445e686ac8f2a2d47af1dc6d6f3bded610b-d_720x1280',
    ratio: '9:16',
    duration: '00:31',
    tags: ['Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1215301369',
    // Idem : nom de fichier « SHORT 22 ». Même client, même série que ci-dessus.
    title: 'Airbnb — loyers',
    sub: 'Short · conciergerie · FR',
    poster:
      'https://i.vimeocdn.com/video/2186441808-e19772c345925429c2f8cc93b450298b264ef211407d6b3859796f7bbf610ad7-d_720x1280',
    ratio: '9:16',
    duration: '00:21',
    tags: ['Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1215307192',
    title: 'Résilience — Boris Cyrulnik',
    sub: 'Ads · témoignage · MentorShow · FR',
    poster:
      'https://i.vimeocdn.com/video/2186451808-e3be0d8c30c26ef02369b73beef62f9f9f89e5c1e4c05a090eb0e5975ca69222-d_1280x720',
    ratio: '16:9',
    duration: '00:57',
    tags: ['Ads', 'Témoignage'],
    langue: 'Français',
  },
  {
    id: '1215307195',
    // Titre provisoire tiré du sous-titre à l'écran — sur Vimeo elle s'appelle
    // encore « test 1 ».
    title: 'Réveille-toi !',
    sub: 'Capsule · face caméra · FR',
    poster:
      'https://i.vimeocdn.com/video/2186449013-7229f5267cf935c8f4fe4e0f3bdbda52ef142ea84b1c00779b388277794e03b2-d_720x1280',
    ratio: '9:16',
    duration: '00:57',
    tags: ['Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1215307193',
    title: 'B2B et B2C',
    sub: 'Motion design · typographie · FR',
    poster:
      'https://i.vimeocdn.com/video/2186448605-c33f28bc049319acb8577d19109c0c50e40d8a861f8d76f34641c17803cf8498-d_1280x720',
    ratio: '16:9',
    duration: '00:51',
    tags: ['Motion design'],
    langue: 'Français',
  },
  {
    id: '1215301370',
    title: 'Tournée',
    sub: 'Motion design · Branding For All · FR',
    poster:
      'https://i.vimeocdn.com/video/2186441508-8b4fa6373684ad54bd96c7157aef007d56597ca60f63f34c63bc8ee86af350ec-d_900x1080',
    ratio: '5:6',
    duration: '00:26',
    tags: ['Motion design'],
    langue: 'Français',
  },
  {
    id: '1215308360',
    // Nom de fichier complet côté Vimeo : « DC - Bénéfices - FR - 9-16 - Ads ».
    title: 'Bénéfices',
    sub: 'Ads · témoignage client · MentorShow · FR',
    poster:
      'https://i.vimeocdn.com/video/2186451541-2a4f3c034a1d4c596b46d6551d45d4bb039cff8c756f14d8ee0811fa9052f974-d_720x1280',
    ratio: '9:16',
    duration: '01:16',
    tags: ['Ads', 'Témoignage'],
    langue: 'Français',
  },
  {
    id: '1215310337',
    // Titre raccourci depuis le nom Vimeo. Même plateau que la capsule
    // « Paul Bordas x Wilson BOTOYIYE » déjà au catalogue.
    title: 'Paul Bordas — la réaction des proches',
    sub: 'Capsule podcast · vertical · FR',
    poster:
      'https://i.vimeocdn.com/video/2186452037-67a63d324f160894fdf5a3b14c0fcd387a467ee1977d7d13e2ea4d8accfb576c-d_720x1280',
    ratio: '9:16',
    duration: '00:45',
    tags: ['Podcast', 'Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1215311556',
    // Aucun titre exploitable : le fichier s'appelle « 10 » et l'affiche ne
    // porte aucun texte. Le numéro est conservé pour que la vidéo reste
    // repérable côté Vimeo — à renommer.
    title: 'Capsule podcast — 10',
    sub: 'Capsule podcast · vertical · FR',
    poster:
      'https://i.vimeocdn.com/video/2186453008-8920ac3a5f8c6298defa470ce47b6f5d031a946c679b6f74bc568943981c87ab-d_720x1280',
    ratio: '9:16',
    duration: '00:44',
    tags: ['Podcast', 'Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1215325447',
    // Nom Vimeo « 24 vie privée et pro ».
    title: 'Vie privée et vie pro',
    sub: 'Capsule podcast · vertical · FR',
    poster:
      'https://i.vimeocdn.com/video/2186469930-7a6ce1864e7a69d8d9d66c8a2121123cad97c5a9eda4c3cddb61d1c2c4ef9605-d_720x1280',
    ratio: '9:16',
    duration: '00:32',
    tags: ['Podcast', 'Short / Reel'],
    langue: 'Français',
  },
  {
    id: '1215325126',
    // Fichier « 12 ». Titre tiré de l'incrustation à l'écran — à confirmer.
    title: 'E-commerce — la courbe',
    sub: 'Short · incrustation animée · FR',
    poster:
      'https://i.vimeocdn.com/video/2186469413-409ce10e22baf35d88e8dc60ac32ad09c75d506827a6794fc2305a43f1d23dae-d_720x1280',
    ratio: '9:16',
    duration: '00:38',
    tags: ['Short / Reel', 'Motion design'],
    langue: 'Français',
  },
  {
    id: '1215311973',
    // Idem : fichier « 02 ». Micro à la main, face caméra — à renommer, et le
    // genre reste à confirmer.
    title: 'Capsule — 02',
    sub: 'Capsule · face caméra · FR',
    poster:
      'https://i.vimeocdn.com/video/2186453540-dddc0bdd4031ff64353772995e32fab1d4ab6868ea07b5c41b1b42113b48b933-d_720x1280',
    ratio: '9:16',
    duration: '00:28',
    tags: ['Short / Reel'],
    langue: 'Français',
  },
];

/**
 * Catalogue complet servant la page /realisations : tout ce qui est en ligne.
 * Le showreel du hero y figure aussi, dédoublonné par identifiant au cas où il
 * serait ajouté deux fois.
 */
export const CATALOGUE: Video[] = [
  ...REALISATIONS,
  ...REALISATIONS_2,
  SHOWREEL,
  ...AUTRES,
].filter((v, i, tout) => tout.findIndex((x) => x.id === v.id) === i);
