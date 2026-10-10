import { EmailContactPage } from '@/components/ui/EmailContactPage';

export function JobsPage() {
  return (
    <EmailContactPage
      label="Trabaja con nosotros"
      title="El próximo proyecto puede empezar contigo."
      description="¿Te gustaría formar parte del equipo? Envíanos tu currículum."
      subject="Envío de currículum"
      imageSide="right"
      image={{
        src: '/projects/casa-cerdanyola/015.webp',
        alt: 'Puerta con contraventanas verdes y vista hacia la escalera interior de Casa Cerdanyola',
        width: 720,
        height: 1074,
        caption: 'Casa Cerdanyola · Reforma terminada.',
      }}
    />
  );
}
