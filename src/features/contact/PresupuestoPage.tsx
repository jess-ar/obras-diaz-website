import { CopyEmailButton } from '@/components/ui/CopyEmailButton';

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
        <CopyEmailButton
          className="inline-block bg-[#0A0A0A] text-white px-8 py-4 text-sm font-semibold hover:bg-[#333333] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        />
      </div>
    </section>
  );
}
