import { InteriorHero, SectionLabel } from '@/components/ui/Section';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { VALUES } from '@/config/constants';
import { AC } from '@/config/theme';
import type { Page } from '@/types';

interface AboutPageProps {
  setPage: (p: Page) => void;
}

export function AboutPage({ setPage }: AboutPageProps) {
  const certs = [
    'ISO 9001:2015 · Gestión de calidad',
    'ISO 14001:2015 · Gestión ambiental',
    'ISO 45001:2018 · Seguridad y salud',
    'Registro REA nº 28-XXXXX',
  ];

  return (
    <>
      <InteriorHero
        title="Sobre nosotros"
        subtitle="Conoce la empresa, el equipo y la filosofía detrás de cada reforma."
        img="photo-1666037805138-f227944ed8d7"
      />

      {/* Historia */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <SectionLabel>Nuestra historia</SectionLabel>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-8">
                Desde 2011 construyendo con propósito.
              </h2>
              <div className="space-y-5 text-[#555555] leading-relaxed text-[15px]">
                <p>
                  Obras Díaz 2011, S.L. fue fundada en Barcelona con un objetivo sencillo pero
                  ambicioso: hacer reformas de calidad, con honestidad y sin atajos.
                </p>
                <p>
                  Empezamos con un pequeño equipo de profesionales con amplia experiencia. Con los
                  años, hemos crecido de forma orgánica manteniendo el control de calidad que nos
                  distingue.
                </p>
                <p>
                  Hoy contamos con maquinaria propia y hemos ejecutado más de 320 proyectos en
                  Barcelona y alrededores. Pero seguimos trabajando como el primer día: con
                  dedicación, rigor y cercanía.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1628744876525-f2678d8af47f?w=700&h=900&fit=crop&auto=format"
                alt="Salón reformado por Obras Díaz 2011"
                className="w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-[#0A0A0A] p-8">
                <div className="font-display text-6xl font-black text-white leading-none">14+</div>
                <div className="text-white/65 text-[10px] uppercase tracking-[0.3em] mt-2">
                  Años de historia
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-[#F5F5F5] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <SectionLabel>Lo que nos define</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
              Valores
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E0E0E0]">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white p-8 lg:p-10">
                <div
                  className="font-display text-4xl font-black text-[#BBBBBB] mb-5 leading-none select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">
                  {v.title}
                </h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                label: 'Misión',
                text: '"Ejecutar proyectos de construcción y reforma con los más altos estándares de calidad, respetando los plazos y el presupuesto acordado, para generar valor duradero a nuestros clientes."',
              },
              {
                label: 'Visión',
                text: '"Ser la empresa de construcción de referencia en España, reconocida por la fiabilidad de sus obras, la satisfacción de sus clientes y el bienestar de su equipo humano."',
              },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 p-10 lg:p-14">
                <div
                  className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-6"
                  style={{ color: AC }}
                >
                  {item.label}
                </div>
                <p className="text-white text-xl lg:text-2xl leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seguridad · Calidad · Sostenibilidad */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                label: 'Seguridad',
                title: 'Primero las personas',
                text: 'Nuestros técnicos de PRL supervisan cada fase. Todos los trabajadores reciben formación continua y disponemos de los EPIs más actualizados. Cero accidentes graves en los últimos 5 años.',
              },
              {
                label: 'Calidad',
                title: 'Certificados y controlados',
                text: 'Sistema de gestión de calidad ISO 9001:2015. Controles en obra en todas las fases y entrega de cada trabajo con documentación técnica completa.',
              },
              {
                label: 'Sostenibilidad',
                title: 'Obra responsable',
                text: 'Gestionamos residuos conforme a la legislación, priorizamos materiales con ecoetiqueta y minimizamos el impacto ambiental. Certificados ISO 14001.',
              },
            ].map((item, i) => (
              <div key={i}>
                <SectionLabel>{item.label}</SectionLabel>
                <h3 className="font-display text-2xl font-black uppercase text-[#0A0A0A] tracking-wide mb-4">
                  {item.title}
                </h3>
                <p className="text-[#555555] leading-relaxed text-[15px]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="bg-[#F5F5F5] py-10 border-y border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
            <div
              className="text-[10px] font-semibold tracking-[0.3em] uppercase shrink-0"
              style={{ color: AC }}
            >
              Certificaciones
            </div>
            <div className="flex flex-wrap gap-3">
              {certs.map((c, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium uppercase tracking-wide text-[#555555] border border-[#D5D5D5] px-4 py-2 bg-white"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner setPage={setPage} />
    </>
  );
}
