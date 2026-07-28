'use client';

import { useState } from 'react';

export interface FAQItem {
  id: string;
  number: string;
  title: string;
  content: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={`faq-accordion ${className}`}>
      {items.map((item, index) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <div key={item.id} className="faq-item">
            <button
              className="faq-button"
              onClick={() => setActiveId(isActive ? null : item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-active={isActive}
              data-hovered={isHovered}
            >
              <div className="faq-number-wrapper">
                <div className="faq-number-bg" />
                <span className="faq-number">{item.number}</span>
              </div>

              <h3 className="faq-title">{item.title}</h3>

              <div className="faq-indicator">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>

            {isActive && (
              <div className="faq-content">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
