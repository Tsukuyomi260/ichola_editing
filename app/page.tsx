import HeroScreen from '@/components/HeroScreen';
import ScrollProgress from '@/components/ScrollProgress';
import SectionsV4 from '@/components/SectionsV4';

/**
 * Accueil. Composant serveur : toute l'interactivité vit dans les composants
 * clients qu'il assemble, donc la coque de la page est rendue côté serveur.
 */
export default function Page() {
  return (
    <>
      <ScrollProgress />
      <main>
        <HeroScreen />
        <SectionsV4 />
      </main>
    </>
  );
}
