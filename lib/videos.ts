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

export type Ratio = '9:16' | '4:5' | '16:9';

export type Video = {
  id: string;
  hash?: string;
  title: string;
  sub: string;
  poster: string;
  ratio: Ratio;
};

/** Vidéo mise en avant dans le cadre du hero d'accueil. */
export const SHOWREEL: Video = {
  id: '1214542567',
  title: 'Ad — coach',
  sub: 'reel · vertical · FR',
  poster:
    'https://i.vimeocdn.com/video/2185499314-bc5394a1d06053aabbb6ce488160f466292b96722de85fb6a5af546eb56c2262-d_720x1280',
  ratio: '9:16',
};

/**
 * Construit l'URL du lecteur.
 * `background` masque toutes les commandes et lance la lecture en boucle
 * muette : c'est le mode « aperçu », celui qu'on veut dans une carte.
 */
export function playerUrl(v: Video, opts: { background?: boolean } = {}) {
  const p = new URLSearchParams();
  if (v.hash) p.set('h', v.hash);
  if (opts.background) {
    p.set('background', '1');
    p.set('autoplay', '1');
    p.set('loop', '1');
    p.set('muted', '1');
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
