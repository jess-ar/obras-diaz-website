import { SectionLabel } from '@/components/ui/Section';
import { BtnPrimary, BtnOutline } from '@/components/ui/Button';
import type { Page } from '@/types';

interface CtaBannerProps {
  setPage: (p: Page) => void;
  light?: boolean;
}

export function CtaBanner({ setPage, light = false }: CtaBannerProps) {
  return (
    <section className={`${light ? 'bg-white' : 'bg-[#0A0A0A]'} py-20 lg:py-28`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel dark={!light}>Siguiente paso</SectionLabel>
          <h2 className={`font-display text-4xl lg:text-6xl font-black uppercase ${light ? 'text-[#0A0A0A]' : 'text-white'} leading-none tracking-tight mb-6`}>
            ¿Tienes un proyecto
            <br />
            en mente?
          </h2>
          <p className={`${light ? 'text-[#555555]' : 'text-white/70'} text-lg mb-10 max-w-xl leading-relaxed`}>
            Cuéntanos qué necesitas. Analizamos tu proyecto y te enviamos presupuesto gratuito y
            detallado.
          </p>
          <div className="flex flex-wrap gap-4">
            <BtnPrimary onClick={() => setPage('presupuesto')}>Pedir presupuesto</BtnPrimary>
            <BtnOutline dark={!light} onClick={() => setPage('galeria')}>
              Ver proyectos
            </BtnOutline>
          </div>
        </div>
      </div>
    </section>
  );
}
