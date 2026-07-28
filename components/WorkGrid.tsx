'use client';

const works = [
  {
    title: 'Ad — coach business',
    sub: 'Ads · Français',
    tag: '9:16',
    c1: '#0f6b3f',
    c2: '#2FCB72',
    ratio: 'v', // vertical 9:16
  },
  {
    title: 'Capsule podcast',
    sub: 'Podcast · Vertical',
    tag: '4:5',
    c1: '#134e37',
    c2: '#3fb6a0',
    ratio: 'p', // portrait 4:5
  },
  {
    title: 'VSL formation',
    sub: 'VSL · Horizontal · occupe 2 colonnes',
    tag: '16:9',
    c1: '#155e3a',
    c2: '#57e39a',
    ratio: 'h', // horizontal 16:9, span 2
  },
  {
    title: 'Reel immobilier',
    sub: 'Immobilier · Vertical',
    tag: '9:16',
    c1: '#1a5e2e',
    c2: '#7bd94f',
    ratio: 'v',
  },
  {
    title: 'Motion flyer',
    sub: 'Motion · Vertical',
    tag: '9:16',
    c1: '#0d5c46',
    c2: '#34d19a',
    ratio: 'v',
  },
  {
    title: 'Short — English',
    sub: 'Reel · English',
    tag: '9:16',
    c1: '#0e6b52',
    c2: '#2fcbb0',
    ratio: 'v',
  },
  {
    title: 'Ad — MentorShow',
    sub: 'Ads · FR/EN',
    tag: '9:16',
    c1: '#155e3a',
    c2: '#57e39a',
    ratio: 'v',
  },
];

export default function WorkGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {works.map((work, idx) => {
        const isHorizontal = work.ratio === 'h';
        const colSpan = isHorizontal ? 'lg:col-span-2' : '';
        const aspectClass =
          work.ratio === 'v' ? 'aspect-[9/16]' : work.ratio === 'p' ? 'aspect-[4/5]' : 'aspect-video';

        return (
          <article
            key={idx}
            className={`relative rounded-2xl overflow-hidden bg-black/95 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-350 group ${colSpan} ${aspectClass}`}
          >
            {/* Gradient film */}
            <div
              className="absolute inset-0 animate-drift"
              style={{
                background: `linear-gradient(135deg, ${work.c1}, ${work.c2})`,
                backgroundSize: '200% 200%',
                animation: `drift 11s cubic-bezier(.22,.61,.36,1) infinite`,
              }}
            />

            {/* Veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Tag */}
            <span className="absolute top-3 left-3 font-mono text-xs text-[#eafff2] bg-black/50 border border-white/15 px-2 py-0.75 rounded-sm backdrop-blur-sm">
              {work.tag}
            </span>

            {/* Play button (top right) */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-black ml-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Meta */}
            <div className="absolute left-3.5 right-3.5 bottom-3.5 text-white">
              <div className="font-semibold text-sm">{work.title}</div>
              <div className="font-mono text-xs text-[#bfe9cf] mt-0.75">{work.sub}</div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
