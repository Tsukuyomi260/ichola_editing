'use client';

import { TestimonialCard, TestimonialAuthor } from './TestimonialCard';

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className = '',
}: TestimonialsSectionProps) {
  return (
    <section className={`testimonials-section ${className}`}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="testimonials-marquee">
          <div className="marquee-track">
            {[...Array(4)].map((_, setIndex) =>
              testimonials.map((testimonial, i) => (
                <TestimonialCard
                  key={`${setIndex}-${i}`}
                  {...testimonial}
                />
              ))
            )}
          </div>

          <div className="marquee-gradient marquee-gradient-left" />
          <div className="marquee-gradient marquee-gradient-right" />
        </div>
      </div>
    </section>
  );
}
