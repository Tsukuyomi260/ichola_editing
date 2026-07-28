'use client';

import { useRef, useEffect, useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log(formData);
  };

  return (
    <section className="py-21 bg-bg-2" id="contact">
      <div className="wrap">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          <span className="eyebrow">Contact</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mt-2">
            Parlons de <span className="kw">votre projet</span>
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-6 mt-10 transition-all duration-700 ${
            isRevealed ? 'reveal in' : 'reveal'
          }`}
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-surface border border-line rounded-2xl p-7.5">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className="w-full bg-bg border border-line rounded-md px-4 py-3 text-ink focus:outline-none focus:border-green focus:ring-2 focus:ring-green-wash"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="w-full bg-bg border border-line rounded-md px-4 py-3 text-ink focus:outline-none focus:border-green focus:ring-2 focus:ring-green-wash"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="vous@exemple.com"
                className="w-full bg-bg border border-line rounded-md px-4 py-3 text-ink focus:outline-none focus:border-green focus:ring-2 focus:ring-green-wash"
              />
            </div>

            <div className="mb-4">
              <label className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Décrivez votre projet en quelques mots…"
                className="w-full bg-bg border border-line rounded-md px-4 py-3 text-ink resize-vertical focus:outline-none focus:border-green focus:ring-2 focus:ring-green-wash"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full justify-center">
              Envoyer le message
            </button>
          </form>

          {/* Cal.com section */}
          <div className="bg-ink text-green-pop rounded-2xl p-7.5 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-2xl text-white">
                Vous préférez en parler de vive voix ?
              </h3>
              <p className="text-green-deep mt-2.5">
                Réservez un créneau, c'est plus rapide. Planifiez une réunion en un clic
                avec Cal.com.
              </p>
            </div>
            <div className="my-5.5 border border-dashed border-white/20 rounded-md p-6.5 text-center font-mono text-xs text-green-deep tracking-widest">
              [ EMBED CAL.COM ]
            </div>
            <a href="#" className="btn bg-green-pop text-black hover:bg-green-pop/90 justify-center">
              Réserver un appel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
