'use client';

import { useEffect, useRef, useState } from 'react';
import { PremiereProLogo, AfterEffectsLogo, CapCutLogo } from './ToolLogos';
import VimeoFrame from './VimeoFrame';
import VideoModal from './VideoModal';
import { REALISATIONS, RATIO_CLASS, type Video } from '@/lib/videos';
import CalEmbed from './CalEmbed';
import { CAL_URL } from '@/lib/site';

/**
 * Bas de page v4 — design validé (langage « écran » du hero).
 * Sections : chiffres (compteurs), réalisations, clients (ticker),
 * avis (variante honnête), FAQ, contact, écran final « parlons. », footer.
 *
 * - SHOW_REAL_QUOTES : passer à true UNIQUEMENT quand de VRAIS avis clients
 *   existent (remplacer alors les placeholders). En attendant, la variante
 *   honnête « Les premiers retours arrivent » est affichée.
 * - Les cartes réalisations lisent le catalogue lib/videos.ts : affiche au
 *   repos, aperçu muet au survol, lecteur agrandi avec le son au clic.
 */

/** Numéro WhatsApp d'Ichola, au format wa.me (indicatif sans le +). */
const WHATSAPP = '2290148192084';

/**
 * Le formulaire n'a pas de backend : il compose le message et ouvre la
 * conversation WhatsApp pré-remplie. Rien n'est stocké côté serveur, donc
 * pas de besoin d'anti-spam ici.
 */
function ouvrirWhatsApp(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const champ = (k: string) => String(data.get(k) ?? '').trim();
  const nomComplet = [champ('prenom'), champ('nom')].filter(Boolean).join(' ');

  const lignes = ['Bonjour Ichola,'];
  if (nomComplet) lignes.push(`Je suis ${nomComplet}.`);
  if (champ('email')) lignes.push(`Email : ${champ('email')}`);
  if (champ('message')) lignes.push('', champ('message'));

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lignes.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

const SHOW_REAL_QUOTES = false;

const FAQ_ITEMS = [
  {
    q: 'Comment se passe la collaboration ?',
    a: "Un appel de cadrage, un brief clair, puis une première version rapide. On itère ensemble sur des points précis (rythme, textes, musique) jusqu'à validation. Vous savez toujours où en est le projet.",
  },
  {
    q: 'Quels sont vos délais ?',
    a: "Comptez 48 à 72 h pour une première version d'un format court, selon la complexité du motion design. Les délais exacts sont posés dès le brief — et tenus.",
  },
  {
    q: 'Quels sont vos tarifs ?',
    a: 'Au projet ou au forfait mensuel selon votre volume. Le plus simple : un appel de 15 minutes pour cadrer le besoin, et vous repartez avec une fourchette claire.',
  },
];

/**
 * Carte de réalisation.
 * La vidéo tourne d'elle-même, en boucle muette, mais UNIQUEMENT quand la
 * carte est à l'écran : le lecteur se monte à l'entrée dans le viewport et se
 * démonte à la sortie. Avec une vingtaine de vidéos, c'est ce qui évite de
 * charger vingt lecteurs d'un coup. Le son arrive au clic, en grand.
 */
function WorkCard({ v, onOpen, i = 0 }: { v: Video; onOpen: (v: Video) => void; i?: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`lp-wk ${RATIO_CLASS[v.ratio]}`}
      data-rv
      style={{ '--rvd': `${i * 0.1}s` } as React.CSSProperties}
      onClick={() => onOpen(v)}
      aria-label={`Agrandir avec le son : ${v.title} — ${v.sub}`}
    >
      <VimeoFrame video={v} active={visible} />
      <div className="veilw" aria-hidden="true"></div>
      <span className="tag">{v.ratio}</span>
      {v.duration && <span className="dur">{v.duration}</span>}
      <div className="playw" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </div>
      <div className="metaw">
        <div className="t">{v.title}</div>
      </div>
    </button>
  );
}

export default function SectionsV4() {
  const rootRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const [statsPlayed, setStatsPlayed] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [lecture, setLecture] = useState<Video | null>(null);

  // Reveal doux
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll('[data-rv]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // Compteurs du panneau chiffres
  useEffect(() => {
    const sec = statsRef.current;
    if (!sec) return;
    const nums = sec.querySelectorAll<HTMLElement>('[data-count]');
    const finish = () => {
      nums.forEach((n) => (n.textContent = n.dataset.count ?? ''));
      setStatsPlayed(true);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const run = () => {
      setStatsPlayed(true);
      nums.forEach((n) => {
        const target = parseInt(n.dataset.count ?? '0', 10);
        const dur = 1200;
        let t0: number | null = null;
        const step = (ts: number) => {
          if (t0 === null) t0 = ts;
          const p = Math.min(1, (ts - t0) / dur);
          n.textContent = String(Math.round(ease(p) * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <div className="lp" ref={rootRef}>
      {/* ============ 01 — CHIFFRES : panneau de dérushage ============ */}
      <section className={`lp-stats lp-wrap${statsPlayed ? ' played in' : ''}`} ref={statsRef} data-rv>
        <div className="lp-panel">
          <span className="lp-ptk a"></span><span className="lp-ptk b"></span>
          <span className="lp-ptk c"></span><span className="lp-ptk d"></span>
          <div className="lp-phead">
            <span>{'// '}<b>Dérushage</b> — les chiffres</span>
            <span>S1 2026</span>
          </div>
          <div className="lp-sgrid">
            <div className="lp-stat">
              <div className="n"><em>+</em><span data-count="250">0</span></div>
              <div className="l">vidéos livrées</div>
              <div className="m">9:16 · 4:5 · 16:9</div>
              <div className="bar" style={{ '--w': '86%' } as React.CSSProperties}><i></i></div>
            </div>
            <div className="lp-stat">
              <div className="n"><span data-count="207">0</span><em>&nbsp;M</em></div>
              <div className="l">de vues générées avec l&apos;équipe MentorShow</div>
              <div className="m">Cumul S1 2026</div>
              <div className="bar" style={{ '--w': '72%' } as React.CSSProperties}><i></i></div>
            </div>
            <div className="lp-stat">
              <div className="n"><span data-count="3">0</span></div>
              <div className="l">logiciels utilisés au quotidien</div>
              <div className="lp-tools" role="list">
                <span className="tool" role="listitem" title="Adobe Premiere Pro"><PremiereProLogo /></span>
                <span className="tool" role="listitem" title="Adobe After Effects"><AfterEffectsLogo /></span>
                <span className="tool" role="listitem" title="CapCut"><CapCutLogo /></span>
              </div>
              <div className="bar" style={{ '--w': '100%' } as React.CSSProperties}><i></i></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 — DERNIÈRES RÉALISATIONS ============ */}
      <section className="lp-works lp-wrap" id="realisations" data-rv>
        <div className="lp-whead">
          <div>
            <span className="lp-eb"><i></i>Sélection</span>
            <h2 className="lp-title">Dernières réalisations<em>.</em></h2>
            <p className="lp-sub">Un aperçu. Tout le reste est sur la page Réalisations.</p>
          </div>
          <a className="lp-btn-g" href="#">Voir toutes mes réalisations</a>
        </div>

        <div className="lp-wr1">
          {REALISATIONS.map((v, i) => (
            <WorkCard key={v.id} v={v} i={i} onOpen={setLecture} />
          ))}
        </div>

        <div className="lp-wfoot">
          <a className="lp-linkr" href="#">Voir toutes mes réalisations
            <span className="lp-rc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
        </div>
      </section>

      {/* ============ 03 — CLIENTS : ticker ============ */}
      <section className="lp-clients" data-rv>
        <span className="lp-eb"><i></i>Ils m&apos;ont fait confiance</span>
        <div className="lp-ticker" aria-hidden="true">
          <div className="lp-ttrack">
            {[0, 1].map((k) => (
              <div className="it" key={k}>
                <span className="nm">MentorShow</span><span className="sep"></span>
                <span className="nm">Studio 4</span><span className="sep"></span>
                <span className="nm">Immo-Prod</span><span className="sep"></span>
                <span className="nm">CoachLab</span><span className="sep"></span>
                <span className="nm">Verticale</span><span className="sep"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 04 — AVIS CLIENTS ============ */}
      {SHOW_REAL_QUOTES ? (
        <section className="lp-quotes lp-wrap" data-rv>
          <div className="lp-chead">
            <span className="lp-eb"><i></i>Retours clients</span>
            <h2 className="lp-title">Ce qu&apos;ils en disent<em>.</em></h2>
          </div>
          <div className="lp-qgrid">
            {/* Remplacer par de VRAIS avis (nom, rôle, entreprise réels) avant de passer SHOW_REAL_QUOTES à true */}
            <article className="lp-qcard">
              <div className="qm">«</div>
              <p>Espace réservé à un vrai retour client — 2 à 3 phrases, spécifiques et vérifiables.</p>
              <div className="who">
                <span className="ini">PN</span>
                <span><span className="nm">Prénom Nom</span><br /><span className="rl">Rôle · Entreprise</span></span>
              </div>
            </article>
            <article className="lp-qcard">
              <div className="qm">«</div>
              <p>Espace réservé à un vrai retour client — idéalement un profil différent (coach, immobilier, créateur).</p>
              <div className="who">
                <span className="ini">PN</span>
                <span><span className="nm">Prénom Nom</span><br /><span className="rl">Rôle · Entreprise</span></span>
              </div>
            </article>
            <article className="lp-qcard">
              <div className="qm">«</div>
              <p>Espace réservé à un vrai retour client — le plus court des trois, une phrase percutante suffit.</p>
              <div className="who">
                <span className="ini">PN</span>
                <span><span className="nm">Prénom Nom</span><br /><span className="rl">Rôle · Entreprise</span></span>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section className="lp-quotes lp-wrap" data-rv>
          <div className="lp-qwait">
            <span className="lp-qlbl">{'// '}Avis clients</span>
            <h3>Les premiers retours arrivent.</h3>
            <p>Cette section s&apos;ouvrira avec de vrais avis de vrais clients — pas des témoignages inventés. En attendant, le travail parle : regardez les réalisations.</p>
            <div className="cta"><a className="lp-btn-g" href="#realisations">Voir les réalisations</a></div>
          </div>
        </section>
      )}

      {/* ============ 05 — FAQ ============ */}
      <section className="lp-faq lp-wrap" id="faq" data-rv>
        <div className="lp-chead">
          <span className="lp-eb"><i></i>Questions fréquentes</span>
          <h2 className="lp-title">Tout ce qu&apos;on me demande souvent<em>.</em></h2>
          <p className="lp-sub">Si votre question n&apos;y est pas, écrivez-moi, je réponds vite.</p>
        </div>
        <div className="lp-faqlist">
          {FAQ_ITEMS.map((item, i) => (
            <div className={`lp-fitem${openFaq === i ? ' open' : ''}`} key={item.q}>
              <button
                className="lp-fq"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="qt">{item.q}</span>
                <span className="pl">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <div className="lp-fa"><div><p>{item.a}</p></div></div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 06 — CONTACT ============ */}
      <section className="lp-contact" id="contact" data-rv>
        <div className="lp-wrap">
          <span className="lp-eb"><i></i>Contact</span>
          <h2 className="lp-title">Parlons de votre projet<em>.</em></h2>
          <div className="lp-cgrid">
            <form className="lp-cform" onSubmit={ouvrirWhatsApp}>
              <div className="lp-frow">
                <div className="lp-field">
                  <label htmlFor="lp-fp">Prénom</label>
                  <input id="lp-fp" name="prenom" type="text" placeholder="Prénom" autoComplete="given-name" />
                </div>
                <div className="lp-field">
                  <label htmlFor="lp-fn">Nom</label>
                  <input id="lp-fn" name="nom" type="text" placeholder="Nom" autoComplete="family-name" />
                </div>
              </div>
              <div className="lp-field">
                <label htmlFor="lp-fe">Email</label>
                <input id="lp-fe" name="email" type="email" placeholder="vous@exemple.com" autoComplete="email" />
              </div>
              <div className="lp-field">
                <label htmlFor="lp-fm">Message</label>
                <textarea id="lp-fm" name="message" required placeholder="Décrivez votre projet en quelques mots…"></textarea>
              </div>
              <button className="lp-btn-a" type="submit">Envoyer le message</button>
              <p className="lp-fnote">{'// '}la conversation s&apos;ouvre dans WhatsApp</p>
            </form>
            <aside className="lp-ccall">
              <span className="lp-ctk a"></span><span className="lp-ctk b"></span>
              <span className="lp-ctk c"></span><span className="lp-ctk d"></span>
              <h3>Vous préférez en parler de vive voix ?</h3>
              <p className="txt">Réservez un créneau, c&apos;est plus rapide. Planifiez une réunion en un clic avec Cal.com.</p>
              <CalEmbed />
              <a className="lp-btn-a" href={CAL_URL} target="_blank" rel="noopener noreferrer">
                Réserver un appel
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ 07 — CTA FINAL : « parlons. » ============ */}
      <div className="lp-cta" data-rv>
        <div className="lp-fr">
          <div className="glow"></div>
          <div className="cgrain"></div>
          <span className="tk a"></span><span className="tk b"></span>
          <span className="tk c"></span><span className="tk d"></span>
          <span className="lp-eb"><i></i>Prochaine étape</span>
          <h2>parlons<em>.</em></h2>
          <p className="lede">Premier échange <b>gratuit et sans engagement</b>. On transforme votre idée en vertical qui accroche.</p>
          <div className="btns">
            <a className="lp-btn-a" href="#contact">Réserver un appel
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a className="lp-pilll" href="#contact">M&apos;écrire</a>
          </div>
          <div className="sb"><span className="tc">00:00:00</span><span className="ln"><i></i></span><span className="tc">GO</span></div>
        </div>
      </div>

      {/* ============ 08 — FOOTER ============ */}
      <footer className="lp-footer lp-wrap" data-rv>
        <div className="lp-fgrid">
          <div className="lp-fbrand">
            <div className="wm">ICHOLA<span>.</span>EDITING</div>
            <p>Monteur vidéo &amp; motion designer. Publicités, reels et capsules courtes en vertical.</p>
          </div>
          <div className="lp-fcol">
            <div className="lp-flbl">Navigation</div>
            <a href="#accueil">Accueil</a>
            <a href="#realisations">Réalisations</a>
            <a href="/a-propos">À propos</a>
            <a href="#contact">Réserver un appel</a>
          </div>
          <div className="lp-fcol">
            <div className="lp-flbl">Réseaux</div>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">X / Twitter</a>
            <a href="#">Email</a>
          </div>
        </div>
        <div className="lp-fbot">
          <span className="cp">© 2026 <b>ICHOLA EDITING</b>. Tous droits réservés.</span>
          <span className="st"><i></i>Disponible pour de nouveaux projets · FR / EN</span>
        </div>
      </footer>

      <VideoModal video={lecture} onClose={() => setLecture(null)} />
    </div>
  );
}
