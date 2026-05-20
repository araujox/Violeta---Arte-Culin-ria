import React, { useState } from 'react';
import { VIOLETA_REVIEWS } from '../data';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';

interface ReviewSectionProps {
  onNotify: (text: string) => void;
}

export default function ReviewSection({ onNotify }: ReviewSectionProps) {
  const [reviews] = useState<Testimonial[]>(VIOLETA_REVIEWS);

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 ${i < count ? 'fill-gold-400 text-gold-400' : 'text-neutral-800'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-16">
      
      {/* Testimonials sliders / columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <div 
            key={rev.id} 
            className="p-6 rounded-lg bg-neutral-900/60 border border-gold-800/5 hover:border-gold-800/15 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {renderStars(rev.stars)}
                <span className="text-[8px] bg-gold-400/10 text-gold-300 px-2 py-0.5 rounded font-sans uppercase font-semibold">
                  Google Maps
                </span>
              </div>
              <p className="text-xs text-[#ECE6D9] italic leading-relaxed text-justify">
                "{rev.text}"
              </p>
            </div>

            <div className="border-t border-gold-800/10 pt-3 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-serif text-[#FCFBF8] font-bold">{rev.name}</h5>
                <p className="text-[10px] text-[#8E8376]">{rev.role}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-gold-400 uppercase tracking-wider font-semibold">Prato Favorito</p>
                <p className="text-[10px] text-white truncate max-w-[120px] italic">{rev.dish}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
