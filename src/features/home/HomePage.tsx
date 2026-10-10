import { ArrowRight } from 'lucide-react';
import { BtnPrimary, BtnOutline } from '@/components/ui/Button';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SERVICES } from '@/config/constants';
import { ProjectList } from '@/components/ui/ProjectList';
import type { Page, Project } from '@/types';
import heroImage from '@/assets/images/hero-black-apartment-kitchen.png';

// ─── HOMEPAGE COMPONENT ────────────────────────────────────────────────────────

export function HomePage({
  setPage,
  onProjectSelect,
}: {
  setPage: (p: Page) => void;
  onProjectSelect: (project: Project) => void;
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] md:h-auto md:min-h-[calc(100svh-108px)] flex items-end md:items-start bg-[#0A0A0A] overflow-hidden">
        <img
          src={heroImage}
          alt="Cocina luminosa con muebles negros, paredes blancas y encimera gris"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/75" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 md:pt-8 pb-16 lg:pb-28 w-full">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[80px] font-semibold text-[#0A0A0A] leading-none tracking-tight mb-6">
              Reformamos espacios.
            </h1>
            <p className="text-[#0A0A0A] text-lg mb-10 max-w-lg leading-relaxed">
              Reformas de viviendas y locales en Barcelona y alrededores.
            </p>
            <div className="flex flex-wrap gap-4">
              <BtnPrimary onClick={() => setPage('presupuesto')}>Solicitar presupuesto</BtnPrimary>
              <BtnOutline onClick={() => setPage('galeria')}>Ver proyectos</BtnOutline>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-white" />
          <span
            className="text-white text-[9px] tracking-[0.3em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-8 lg:gap-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold">Obras Díaz 2011, S.L.</h2>
          <div>
            <p className="text-[#555555] text-lg leading-relaxed mb-6">
              Obras Díaz 2011, S.L. es una empresa de reformas de viviendas y locales.
            </p>
            <button
              onClick={() => setPage('nosotros')}
              className="flex items-center gap-2 text-sm hover:text-[#6E6E6E]"
            >
              Sobre nosotros <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Servicios
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={i} className="border-t border-white/20 pt-6">
                  <Icon size={26} className="mb-6 text-white/70" aria-hidden={true} />
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">{s.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between gap-6 mb-12">
            <h2 className="font-display text-3xl lg:text-5xl font-bold">Nuestros proyectos</h2>
            <button onClick={() => setPage('galeria')} className="text-sm hover:text-[#6E6E6E]">
              Ver todos
            </button>
          </div>
          <ProjectList onSelect={onProjectSelect} />
        </div>
      </section>
      <CtaBanner setPage={setPage} />
    </>
  );
}
