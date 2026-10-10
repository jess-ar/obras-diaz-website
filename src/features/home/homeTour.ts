import type { Page } from '@/types';

export interface TourStopData {
  id: string;
  photo: string;
  alt: string;
  title: string;
  subtitle?: string;
  cta: string;
  page: Page;
  focus: number;
}
export interface TourClip {
  src: string;
  poster: string;
}
// Añadir solo después de generar y validar cada clip y su póster real.
export const TOUR_CLIPS: (TourClip | null)[] = [null, null, null, null];
export const HOME_TOUR: TourStopData[] = [
  {
    id: 'salon',
    photo: '/home/girona/001.webp',
    alt: 'Salón de Calle Girona con chimenea y sofás',
    title: 'Tu casa,\na tu manera.',
    subtitle: 'Reformas integrales en Barcelona y alrededores.',
    cta: 'Solicitar presupuesto',
    page: 'presupuesto',
    focus: 50,
  },
  {
    id: 'detalle',
    photo: '/home/girona/004.webp',
    alt: 'Detalle del salón y la chimenea de Calle Girona',
    title: 'Construimos confianza.',
    cta: 'Sobre nosotros',
    page: 'nosotros',
    focus: 50,
  },
  {
    id: 'cocina',
    photo: '/home/girona/008.webp',
    alt: 'Cocina de Calle Girona con encimeras metálicas y muebles de madera',
    title: 'Espacios que transformamos.',
    cta: 'Ver reformas',
    page: 'galeria',
    focus: 50,
  },
  {
    id: 'salon-ventanas',
    photo: '/home/girona/005.webp',
    alt: 'Salón de Calle Girona con sofás junto a las ventanas',
    title: 'Trabaja con nosotros.',
    cta: 'Únete al equipo',
    page: 'trabaja',
    focus: 50,
  },
  {
    id: 'estancia-blanca',
    photo: '/home/girona/016.webp',
    alt: 'Estancia blanca de Calle Girona con encimera y estantes',
    title: 'Hablemos de tu proyecto.',
    cta: 'Solicitar presupuesto',
    page: 'presupuesto',
    focus: 50,
  },
];
