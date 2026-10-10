import { AC } from '@/config/theme';

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-8" style={{ background: dark ? '#FFFFFF' : AC }} />
      <span className="text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: dark ? '#FFFFFF' : AC }}>
        {children}
      </span>
    </div>
  );
}

interface InteriorHeroProps {
  title: string;
  subtitle?: string;
  img: string;
}

export function InteriorHero({ title, subtitle, img }: InteriorHeroProps) {
  return (
    <div className="relative h-[42vh] min-h-[320px] flex items-end bg-[#1A1A1A] overflow-hidden">
      <img
        src={`https://images.unsplash.com/${img}?w=1440&h=640&fit=crop&auto=format`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 pb-12 pt-28 w-full">
        <div
          className="text-[10px] tracking-[0.35em] uppercase mb-3 font-semibold"
          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          Obras Díaz 2011, S.L.
        </div>
        <h1 className="font-display text-5xl lg:text-7xl font-black uppercase text-white leading-none tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-white/65 text-base max-w-xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
