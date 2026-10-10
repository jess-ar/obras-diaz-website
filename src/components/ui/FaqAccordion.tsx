import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/types';

interface FaqAccordionProps {
  items: FAQ[];
  dark?: boolean;
}

export function FaqAccordion({ items, dark = false }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);
  
  return (
    <div className={`divide-y ${dark ? 'divide-white/25' : 'divide-[#E5E5E5]'}`}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className={`font-display text-lg font-bold uppercase tracking-wide ${dark ? 'text-white' : 'text-[#0A0A0A]'} pr-8 leading-snug group-hover:opacity-60 transition-opacity`}>
              {item.q}
            </span>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={`shrink-0 ${dark ? 'text-white' : 'text-[#666666]'} transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <div className={`pb-6 ${dark ? 'text-white' : 'text-[#555555]'} leading-relaxed text-[15px]`}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
