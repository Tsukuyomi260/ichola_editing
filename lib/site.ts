/**
 * Adresse canonique du site.
 *
 * Elle sert de base à toutes les URL absolues : image de partage, sitemap,
 * balises canoniques. Le jour où le domaine ichola-editing.com est branché,
 * une seule ligne est à changer ici — ou mieux, définir NEXT_PUBLIC_SITE_URL
 * dans les variables d'environnement Vercel, sans toucher au code.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ichola-editing.vercel.app';

export const SITE_NAME = 'ICHOLA EDITING';
