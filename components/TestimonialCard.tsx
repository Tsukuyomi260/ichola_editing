'use client';

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className = '',
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div';

  return (
    <Card
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`testimonial-card ${className}`}
    >
      <div className="testimonial-author">
        <img
          src={author.avatar}
          alt={author.name}
          className="testimonial-avatar"
        />
        <div className="testimonial-info">
          <h3 className="testimonial-name">{author.name}</h3>
          <p className="testimonial-handle">{author.handle}</p>
        </div>
      </div>
      <p className="testimonial-text">{text}</p>
    </Card>
  );
}
