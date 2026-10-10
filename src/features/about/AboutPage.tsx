import { useEffect, useRef } from 'react';
import type { Page } from '@/types';
import './about.css';

// Editorial copy supplied by the client; confirm procedures before publication.
const stages = [
  { title: 'Planificación', text: 'Estudiamos el proyecto y organizamos los trabajos.' },
  { title: 'Ejecución', text: 'Coordinamos los trabajos y supervisamos cada fase.' },
  { title: 'Entrega', text: 'Revisamos los acabados antes de dar la obra por finalizada.' },
];

export function AboutPage({ setPage }: { setPage: (page: Page) => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('about-reveal');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    root.current.querySelectorAll('[data-about-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="about-page">
      <section aria-labelledby="about-intro" className="bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <p className="about-label mb-8 text-[#626262]">
            Sobre nosotros / Nuestra forma de trabajar
          </p>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div data-about-reveal className="lg:col-span-7 lg:pt-10">
              <h1
                id="about-intro"
                className="font-display font-semibold text-4xl sm:text-6xl xl:text-7xl leading-[1.06] tracking-tight max-w-3xl"
              >
                Cada obra empieza mucho antes de construir.
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-[#555555]">
                Escuchamos, estudiamos y planificamos cada proyecto antes de empezar.
              </p>
              <p className="about-label mt-12 lg:mt-20 text-[#626262]">Obras Díaz 2011 SL</p>
            </div>
            <figure data-about-reveal className="lg:col-span-5 lg:mt-20">
              <div className="aspect-[4/5] overflow-hidden bg-[#ECECEA]">
                <img
                  src="/projects/casa-cerdanyola/005.webp"
                  alt="Escalera helicoidal, arcos y estructura acristalada en Casa Cerdanyola"
                  width={720}
                  height={910}
                  fetchPriority="high"
                  className="about-photo"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-[#626262]">
                Casa Cerdanyola · Detalle de un proyecto terminado.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-process" className="bg-[#F1F1EF] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div data-about-reveal className="grid lg:grid-cols-12 gap-6 mb-14 lg:mb-20">
            <p className="about-label lg:col-span-4 text-[#626262]">El proceso</p>
            <h2
              id="about-process"
              className="lg:col-span-8 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight"
            >
              Del plano
              <br />a la realidad.
            </h2>
          </div>
          <ol className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">
            {stages.map((stage, index) => (
              <li
                key={stage.title}
                data-about-reveal
                className={`about-step ${index === 1 ? 'md:mt-16' : index === 2 ? 'md:mt-32' : ''}`}
              >
                <span aria-hidden className="about-number font-display block mb-8">
                  0{index + 1}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold tracking-tight mb-4">
                  {stage.title}
                </h3>
                <p className="text-[#555555] leading-relaxed max-w-xs">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about-details" className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <figure data-about-reveal className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-[#ECECEA]">
              <img
                src="/projects/casa-cerdanyola/010.webp"
                alt="Detalle de la barandilla y el hueco de la escalera en Casa Cerdanyola"
                width={720}
                height={1130}
                loading="lazy"
                decoding="async"
                className="about-photo"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-[#626262]">
              Casa Cerdanyola · Detalle de un proyecto terminado.
            </figcaption>
          </figure>
          <div data-about-reveal className="lg:col-span-7">
            <p className="about-label text-[#626262] mb-8">Nuestra manera de hacer las cosas</p>
            <h2
              id="about-details"
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-12 lg:mb-16"
            >
              Los detalles
              <br />
              importan.
            </h2>
            <ul className="border-t border-[#D5D5D5]">
              {['Coordinación', 'Seguimiento', 'Atención al detalle'].map((concept) => (
                <li
                  key={concept}
                  className="border-b border-[#D5D5D5] py-5 lg:py-6 font-display text-xl lg:text-2xl"
                >
                  {concept}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-cta" className="bg-[#F1F1EF] py-16 lg:py-24">
        <div
          data-about-reveal
          className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <h2
            id="about-cta"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight max-w-3xl"
          >
            ¿Tienes un proyecto
            <br className="hidden sm:block" /> en mente?
          </h2>
          <button
            type="button"
            onClick={() => setPage('presupuesto')}
            className="self-start lg:self-auto inline-block bg-[#0A0A0A] text-white px-8 py-4 text-sm font-semibold hover:bg-[#333333] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Solicitar presupuesto
          </button>
        </div>
      </section>
    </div>
  );
}
