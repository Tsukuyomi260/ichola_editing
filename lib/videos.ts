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

export type Video = {
  id: string;
  hash?: string;
  title: string;
  sub: string;
  poster: string;
  ratio: Ratio;
  /** Durée affichée sur la carte, au format mm:ss. */
  duration?: string;
};

/** Vidéo mise en avant dans le cadre du hero d'accueil. */
export const SHOWREEL: Video = {
  id: '1214542567',
  title: 'Ad — coach',
  sub: 'reel · vertical · FR',
  poster:
    'https://i.vimeocdn.com/video/2185499314-bc5394a1d06053aabbb6ce488160f466292b96722de85fb6a5af546eb56c2262-d_720x1280',
  ratio: '9:16',
  duration: '00:18',
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
  },
  {
    id: '1215041025',
    title: 'Chancio',
    sub: 'Motion design · promo · FR',
    poster:
      'https://i.vimeocdn.com/video/2186117850-87fccd2e4ffba13588056a3347ca1df899ba2e6ee2bd702c90db4f34b244cdf0-d_900x1080',
    ratio: '5:6',
    duration: '00:29',
  },
  {
    id: '1214552992',
    title: 'Healing Days — Londres',
    sub: 'Ads · MentorShow · EN',
    poster:
      'https://i.vimeocdn.com/video/2185513487-2bce720226f1461c4077afed0ef4220305e39d5d39ada4be7055a1893bd8e5a3-d_1280x720',
    ratio: '16:9',
    duration: '01:59',
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
