import { EmailContactPage } from '@/components/ui/EmailContactPage';

export function PresupuestoPage() {
  return (
    <EmailContactPage
      label="Solicitar presupuesto"
      title="Hablemos de tu próximo proyecto."
      description="Cuéntanos qué tienes en mente."
      subject="Solicitud de presupuesto"
      imageSide="left"
      image={{
        src: '/projects/casa-cerdanyola/006.webp',
        alt: 'Cocina de Casa Cerdanyola con isla de madera, escalera y estructura blanca',
        width: 720,
        height: 1080,
        caption: 'Casa Cerdanyola · Reforma terminada.',
      }}
    />
  );
}
