'use client';

export default function Clients() {
  return (
    <section className="py-14 border-t border-b border-line">
      <div className="wrap">
        <p className="text-center font-mono text-xs tracking-widest uppercase text-muted mb-7">
          Ils m'ont fait confiance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-11">
          {['MentorShow', 'Studio 4', 'Immo·Prod', 'CoachLab', 'Verticale'].map(
            (logo) => (
              <span
                key={logo}
                className="font-display font-bold text-lg text-ink-soft opacity-60 hover:opacity-100 transition-opacity"
              >
                {logo}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
