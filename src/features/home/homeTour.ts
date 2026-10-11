import type { Page } from '@/types';

export interface TourStopData {
  id: string;
  photo: string;
  photoSrcSet?: string;
  alt: string;
  title: string;
  subtitle?: string;
  cta: string;
  page: Page;
  focus: number;
  verticalFocus?: number;
  fit?: 'cover' | 'contain';
}
export interface TourClip {
  src: string;
  poster: string;
}
// Añadir solo después de generar y validar cada clip y su póster real.
export const TOUR_CLIPS: (TourClip | null)[] = [null, null, null, null];
export const HOME_TOUR: TourStopData[] = [
  {
    id: 'escalera-cerdanyola',
    photo: '/projects/casa-cerdanyola/cerdanyola-17(1).jpeg',
    alt: 'Planta superior de Casa Cerdanyola con barandilla blanca, paredes de espejo y suelo de madera',
    title: 'Tu casa,\na tu manera.',
    subtitle: 'Reformas integrales en Barcelona y alrededores.',
    cta: 'Solicitar presupuesto',
    page: 'presupuesto',
    focus: 50,
    verticalFocus: 75,
  },
  {
    id: 'detalle',
    photo: '/projects/calle-girona/reforma-girona-05.jpg',
    alt: 'Detalle del salón y la chimenea de Calle Girona',
    title: 'Construimos confianza.',
    cta: 'Sobre nosotros',
    page: 'nosotros',
    focus: 50,
    verticalFocus: 72,
  },
  {
    id: 'salon-mariano-cubi',
    photo: '/projects/calle-mariano-cubi/maria-cubi-05_Nero_AI_Image_Upscaler_Photo_Face.jpeg',
    alt: 'Interior de Calle Mariano Cubí con sofá, suelo hidráulico y cocina abierta',
    title: 'Espacios que transformamos.',
    cta: 'Ver reformas',
    page: 'galeria',
    focus: 50,
    verticalFocus: 65,
    fit: 'cover',
  },
  {
    id: 'interior-valencia',
    photo: '/projects/calle-valencia/004.webp',
    alt: 'Interior de Calle Valencia con pared de pavés y salida a la terraza',
    title: 'Trabaja con nosotros.',
    cta: 'Únete al equipo',
    page: 'trabaja',
    focus: 50,
    verticalFocus: 72,
  },
  {
    id: 'piscina-provenza',
    photo: '/projects/calle-provenza/001.webp',
    photoSrcSet: '/projects/calle-provenza/001-thumb.webp 800w, /projects/calle-provenza/001.webp 4032w',
    alt: 'Interior de Calle Provenza con muro de piedra, escalera de madera y piscina acristalada',
    title: 'Hablemos de tu proyecto.',
    cta: 'Solicitar presupuesto',
    page: 'presupuesto',
    focus: 50,
  },
];
