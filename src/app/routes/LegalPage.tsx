import { COMPANY_EMAIL, COMPANY_CIF } from '@/config/constants';
import { ArrowRight } from 'lucide-react';
import { InteriorHero } from '@/components/ui/Section';
import type { Page } from '@/types';

const LEGAL_CONTENT: Record<
  'privacidad' | 'cookies' | 'legal',
  { title: string; sections: { h: string; body: string }[] }
> = {
  privacidad: {
    title: 'Política de privacidad',
    sections: [
      {
        h: '1. Responsable del tratamiento',
        body: `Obras Díaz 2011, S.L. (en adelante, «la Empresa»), con CIF ${COMPANY_CIF} y domicilio social en Barcelona, es la responsable del tratamiento de los datos personales recabados a través de este sitio web y de los formularios de contacto y solicitud de presupuesto.\n\nPuede contactar con nosotros en: ${COMPANY_EMAIL}`,
      },
      {
        h: '2. Datos que recabamos',
        body: `Recabamos únicamente los datos que usted nos facilita de forma voluntaria a través de los formularios disponibles en el sitio web:\n\n• Nombre y apellidos\n• Dirección de correo electrónico\n• Datos relativos al proyecto de reforma (tipo, superficie, zona, etc.)\n• Currículum y datos de experiencia profesional, en el caso de candidaturas espontáneas\n\nNo recabamos datos especialmente sensibles ni datos de menores de 14 años. Si usted es menor de 14 años, por favor no cumplimente ningún formulario.`,
      },
      {
        h: '3. Finalidad y base jurídica del tratamiento',
        body: `Los datos se tratan con las siguientes finalidades y bases jurídicas:\n\n• Gestión de consultas y solicitudes de presupuesto: ejecución de medidas precontractuales a petición del interesado (art. 6.1.b RGPD).\n• Gestión de candidaturas: interés legítimo de la Empresa en la selección de personal (art. 6.1.f RGPD).\n• Gestión de bajas de comunicaciones comerciales: cumplimiento de una obligación legal (art. 6.1.c RGPD) y revocación del consentimiento.\n• Envío de comunicaciones comerciales, si usted ha prestado su consentimiento expreso: art. 6.1.a RGPD.`,
      },
      {
        h: '4. Conservación de los datos',
        body: `Los datos se conservan durante el tiempo necesario para atender la solicitud y, posteriormente, durante los plazos legales de prescripción de responsabilidades. Los datos de candidaturas se conservan durante un máximo de 12 meses, salvo que el candidato solicite su supresión antes.`,
      },
      {
        h: '5. Destinatarios',
        body: `Los datos no se ceden a terceros, salvo obligación legal o cuando sea estrictamente necesario para la prestación del servicio (p. ej., proveedores de hosting o plataformas de correo electrónico que actúan como encargados del tratamiento bajo contrato de encargo conforme al art. 28 RGPD). No realizamos transferencias internacionales de datos.`,
      },
      {
        h: '6. Derechos del interesado',
        body: `Puede ejercer en cualquier momento los siguientes derechos, dirigiendo un escrito a ${COMPANY_EMAIL} con copia de su documento de identidad:\n\n• Acceso: conocer qué datos tratamos sobre usted.\n• Rectificación: corregir datos inexactos o incompletos.\n• Supresión («derecho al olvido»): solicitar la eliminación de sus datos.\n• Limitación del tratamiento: solicitar que suspendamos temporalmente el tratamiento.\n• Portabilidad: recibir sus datos en formato estructurado y legible.\n• Oposición: oponerse al tratamiento basado en interés legítimo.\n• Retirada del consentimiento: en cualquier momento, sin efecto retroactivo.\n\nSi considera que sus derechos no han sido atendidos, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
      },
      {
        h: '7. Seguridad',
        body: `Adoptamos las medidas técnicas y organizativas apropiadas para garantizar la seguridad de sus datos y evitar su pérdida, alteración o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.`,
      },
      {
        h: '8. Cambios en esta política',
        body: `Podemos actualizar esta política para adaptarla a cambios legales o del servicio. La versión vigente siempre estará disponible en este sitio web. Última actualización: julio de 2026.`,
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    sections: [
      {
        h: '1. ¿Qué son las cookies?',
        body: `Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario cuando este los visita. Sirven para que el sitio recuerde sus preferencias, analice el uso que hace del mismo y, en algunos casos, muestre publicidad personalizada.`,
      },
      {
        h: '2. Cookies que utilizamos',
        body: `Este sitio web es una aplicación de una sola página (SPA) que no instala cookies de terceros ni cookies de seguimiento o publicidad.\n\nÚnicamente podría generarse alguna cookie técnica estrictamente necesaria para el funcionamiento del sitio (p. ej., preferencias de sesión). Estas cookies no requieren consentimiento previo según el art. 22.2 de la LSSI-CE, ya que son imprescindibles para la prestación del servicio solicitado por el usuario.\n\nNo utilizamos:\n• Cookies analíticas ni de medición de audiencia\n• Cookies publicitarias ni de retargeting\n• Cookies de redes sociales de terceros`,
      },
      {
        h: '3. Gestión y desactivación de cookies',
        body: `Puede configurar su navegador para bloquear o eliminar todas las cookies. Tenga en cuenta que deshabilitar las cookies técnicas podría afectar al funcionamiento del sitio. A continuación, encontrará los enlaces a las instrucciones de los navegadores más habituales:\n\n• Chrome: Configuración › Privacidad y seguridad › Cookies\n• Firefox: Opciones › Privacidad y seguridad › Cookies\n• Safari: Preferencias › Privacidad › Gestionar datos de sitios web\n• Edge: Configuración › Privacidad, búsqueda y servicios › Cookies`,
      },
      {
        h: '4. Actualizaciones',
        body: `Si en el futuro incorporáramos cookies adicionales que requirieran consentimiento, actualizaremos esta política y solicitaremos su autorización mediante el mecanismo correspondiente. Última actualización: julio de 2026.`,
      },
      {
        h: '5. Contacto',
        body: `Para cualquier consulta sobre nuestra política de cookies, puede contactarnos en ${COMPANY_EMAIL}.`,
      },
    ],
  },
  legal: {
    title: 'Aviso legal',
    sections: [
      {
        h: '1. Datos identificativos del titular',
        body: `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:\n\n• Denominación social: Obras Díaz 2011, S.L.\n• CIF: ${COMPANY_CIF}\n• Inscripción: Registro Mercantil de Barcelona\n• Correo electrónico: ${COMPANY_EMAIL}\n• Zona de actuación: Barcelona y área metropolitana`,
      },
      {
        h: '2. Objeto y ámbito de aplicación',
        body: `El presente Aviso Legal regula el acceso y uso del sitio web de Obras Díaz 2011, S.L. La utilización del sitio web atribuye la condición de usuario e implica la aceptación plena de las presentes condiciones. La Empresa se reserva el derecho a modificar este aviso en cualquier momento.`,
      },
      {
        h: '3. Condiciones de uso',
        body: `El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos en el sitio web, y en particular a no emplearlos para:\n\n• Incurrir en actividades ilícitas o contrarias a la buena fe y al orden público.\n• Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que atente contra los derechos humanos.\n• Introducir o difundir virus informáticos o cualquier otro sistema físico o lógico que pueda causar daños.\n• Intentar acceder, utilizar o manipular los datos de terceros usuarios u otros sistemas informáticos.`,
      },
      {
        h: '4. Propiedad intelectual e industrial',
        body: `Todos los contenidos del sitio web — textos, imágenes, logotipos, diseño gráfico, código fuente y demás elementos — son propiedad de Obras Díaz 2011, S.L. o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.\n\nQueda expresamente prohibida la reproducción total o parcial, distribución, comunicación pública o transformación de cualquier contenido sin autorización escrita previa de la Empresa.`,
      },
      {
        h: '5. Exclusión de garantías y responsabilidad',
        body: `La Empresa no garantiza la disponibilidad y continuidad del funcionamiento del sitio web ni la ausencia de errores en sus contenidos. Asimismo, no se responsabiliza de los daños que puedan derivarse de la falta de disponibilidad, continuidad o seguridad del sitio web, ni de la defraudación de las expectativas del usuario.\n\nLos contenidos del sitio tienen carácter meramente informativo y no constituyen asesoramiento técnico, jurídico o de otro tipo.`,
      },
      {
        h: '6. Enlaces a terceros',
        body: `El sitio web puede contener enlaces a sitios de terceros. La Empresa no asume responsabilidad alguna sobre el contenido, exactitud o legalidad de dichos sitios externos, ni sobre los daños que puedan derivarse de su acceso o uso.`,
      },
      {
        h: '7. Legislación aplicable y jurisdicción',
        body: `Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del uso del sitio web, las partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de Barcelona.`,
      },
    ],
  },
};

interface LegalPageProps {
  page: 'privacidad' | 'cookies' | 'legal';
  setPage: (p: Page) => void;
}

export function LegalPage({ page: type, setPage }: LegalPageProps) {
  const { title, sections } = LEGAL_CONTENT[type];
  return (
    <>
      <InteriorHero title={title} img="photo-1666037805138-f227944ed8d7" />
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            {sections.map((s, i) => (
              <div key={i} className="mb-10">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">
                  {s.h}
                </h2>
                <div className="space-y-3">
                  {s.body.split('\n\n').map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-[15px] text-[#555555] leading-relaxed whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t border-[#E5E5E5] pt-8 mt-12">
              <button
                onClick={() => setPage('inicio')}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] hover:opacity-50 transition-opacity group"
              >
                <ArrowRight
                  size={14}
                  className="rotate-180 group-hover:-translate-x-1 transition-transform"
                />
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
