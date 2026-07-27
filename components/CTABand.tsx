'use client';

export default function CTABand() {
  return (
    <section className="py-0">
      <div className="wrap">
        <div
          className="relative overflow-hidden rounded-3xl py-16 md:py-20 px-10 md:px-10 text-center"
          style={{
            background:
              'linear-gradient(130deg, #0A7A45, #12B76A 55%, #35D07E)',
            boxShadow: '0 30px 70px -30px rgba(10,122,69,.6)',
          }}
        >
          <div
            className="absolute -right-20 -top-20 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,.28), transparent 60%)',
            }}
          />

          <h2 className="relative font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-black">
            Votre projet mérite d'être vu.<br />
            Parlons-en.
          </h2>
          <p className="relative mt-4 text-lg max-w-2xl mx-auto text-black/70">
            Premier échange gratuit et sans engagement. On transforme votre
            idée en vertical qui accroche.
          </p>

          <div className="relative flex flex-wrap gap-3 justify-center mt-7">
            <a
              href="#contact"
              className="btn bg-black text-white hover:bg-black/90"
            >
              Démarrer mon projet
            </a>
            <a
              href="#contact"
              className="btn bg-transparent text-black border border-black/40 hover:border-black"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
