import React from 'react';
import { software } from '../data/portfolio';

export function SoftwareMarquee() {
  const sequence = [...software, ...software];
  return (
    <section aria-label="Software I use" className="w-full overflow-hidden bg-night py-5 md:py-6">
      <p className="sr-only">{software.join(', ')}</p>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {[0, 1].map((half) =>
        <div key={half} className="flex shrink-0 items-center">
            {sequence.map((name, i) =>
          <span key={`${half}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-display text-2xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
                  {name}
                </span>
                <span className="text-2xl text-accent md:text-4xl">•</span>
              </span>
          )}
          </div>
        )}
      </div>
    </section>);

}