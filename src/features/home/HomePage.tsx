import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/Section';
import { BtnPrimary, BtnOutline } from '@/components/ui/Button';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SERVICES, PROJECTS, STATS, PROCESS, FAQS } from '@/config/constants';
import { AC } from '@/config/theme';
import type { Page } from '@/types';
import heroImage from '@/assets/images/hero-black-apartment-kitchen.png';

// ─── HOMEPAGE COMPONENT ────────────────────────────────────────────────────────

export function HomePage({ setPage }: { setPage: (p: Page) => void }) {
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
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#0A0A0A]" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#0A0A0A]">
                Desde 2011
              </span>
            </div>
            <h1 className="font-display text-6xl lg:text-[88px] font-black uppercase text-[#0A0A0A] leading-none tracking-tight mb-6">
              Tu reforma,
              <br />
              bien hecha.
              <br />
              Punto.
            </h1>
            <p className="text-[#0A0A0A] text-lg mb-10 max-w-lg leading-relaxed">
              Reformas integrales de viviendas, cocinas, baños y locales en Barcelona y alrededores.
              Más de 14 años, equipo propio y presupuesto cerrado desde el primer día.
            </p>
            <div className="flex flex-wrap gap-4">
              <BtnPrimary onClick={() => setPage('presupuesto')}>Pedir presupuesto</BtnPrimary>
              <BtnOutline onClick={() => setPage('galeria')}>
                Ver proyectos
              </BtnOutline>
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

      {/* Presentación */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <SectionLabel>Quiénes somos</SectionLabel>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
                Una empresa de construcción con vocación de permanencia.
              </h2>
            </div>
            <div>
              <p className="text-[#555555] text-[17px] leading-relaxed mb-5">
                Obras Díaz 2011, S.L. nació con un propósito claro: hacer bien las cosas, desde el
                primer clavo hasta la última pincelada. Con sede en Barcelona, llevamos más de una
                década ejecutando reformas de viviendas, cocinas, baños y locales en toda el área
                metropolitana.
              </p>
              <p className="text-[#666666] leading-relaxed mb-8 text-[15px]">
                Trabajamos con equipo propio, materiales seleccionados y una cultura de trabajo
                basada en la responsabilidad, la puntualidad y el rigor técnico.
              </p>
              <button
                onClick={() => setPage('nosotros')}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] hover:opacity-50 transition-opacity group"
              >
                Conoce nuestra historia
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <SectionLabel dark>Lo que hacemos</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-white leading-tight tracking-tight">
              Servicios
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/15">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <article
                  key={i}
                  className="bg-[#0A0A0A] p-8 lg:p-10 group hover:bg-[#1A1A1A] transition-colors duration-300 cursor-default"
                >
                  <Icon size={26} className="mb-6 text-white/70" aria-hidden={true} />
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    {s.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionLabel>Nuestro trabajo</SectionLabel>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
                Proyectos destacados
              </h2>
            </div>
            <button
              onClick={() => setPage('galeria')}
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] hover:opacity-50 transition-opacity group shrink-0"
            >
              Ver todos{' '}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <button
                key={i}
                type="button"
                className="group cursor-pointer text-left"
                onClick={() => setPage('galeria')}
                aria-label={`Ver proyecto: ${p.name}`}
              >
                <div className="relative overflow-hidden bg-[#1A1A1A] aspect-[4/3] mb-4">
                  <img
                    src={`https://images.unsplash.com/${p.img}?w=600&h=450&fit=crop&auto=format`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0A0A0A]/80 text-white text-[10px] font-medium px-2.5 py-1 uppercase tracking-wider">
                      {p.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-1 leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-[#666666] uppercase tracking-widest">
                      {p.location} · {p.year}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: AC }}
                    aria-hidden="true"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            {STATS.map((s, i) => (
              <div key={i} className="border-l border-white/10 pl-6 lg:pl-10">
                <div className="font-display text-5xl lg:text-7xl font-black text-white mb-2">
                  {s.value}
                </div>
                <div className="text-white/60 text-[11px] uppercase tracking-[0.25em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <SectionLabel>Cómo trabajamos</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
              Proceso de trabajo
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {PROCESS.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div
                  className="font-display text-5xl font-black text-[#BBBBBB] leading-none shrink-0 select-none"
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#666666] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#6E6E6E] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <SectionLabel dark>Preguntas frecuentes</SectionLabel>
              <h2 className="font-display text-4xl font-black uppercase text-white leading-tight tracking-tight mb-5">
                Resolvemos tus dudas
              </h2>
              <p className="text-white leading-relaxed text-[15px] mb-8">
                Si no encuentras lo que buscas, contacta directamente con nuestro equipo y te
                atendemos en menos de 24 horas.
              </p>
              <BtnOutline dark onClick={() => setPage('contacto')}>Contactar ahora</BtnOutline>
            </div>
            <div className="lg:col-span-3">
              <FaqAccordion items={FAQS} dark />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner setPage={setPage} light />
    </>
  );
}
