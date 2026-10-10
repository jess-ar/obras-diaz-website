import { COMPANY_EMAIL, COMPANY_MAILTO } from '@/config/constants';

export function PresupuestoPage() {
  return (
    <section className="bg-white py-20 lg:py-32 min-h-[60vh]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight mb-8">
          Solicitar presupuesto
        </h1>
        <p className="text-[#555555] text-lg leading-relaxed mb-10">
          Cuéntanos qué quieres reformar. Escríbenos por correo.
        </p>
        <a
          href={`${COMPANY_MAILTO}?subject=Solicitud%20de%20presupuesto`}
          className="inline-block text-xl sm:text-2xl lg:text-3xl font-medium border-b border-[#0A0A0A] pb-2 hover:text-[#6E6E6E] hover:border-[#6E6E6E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {COMPANY_EMAIL}
        </a>
      </div>
    </section>
  );
}
