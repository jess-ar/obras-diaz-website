import { CtaBanner } from '@/components/ui/CtaBanner';
import { VALUES } from '@/config/constants';
import type { Page } from '@/types';
export function AboutPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight mb-8">
            Sobre nosotros
          </h1>
          <p className="text-[#555555] text-lg lg:text-xl leading-relaxed max-w-2xl">
            Obras Díaz 2011, S.L. realiza reformas de viviendas y locales en Barcelona y
            alrededores.
          </p>
        </div>
      </section>
      <section className="bg-[#0A0A0A] text-white py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-12">Nuestros valores</h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {VALUES.map((value) => (
              <div key={value.title}>
                <h3 className="font-display text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner setPage={setPage} />
    </>
  );
}
