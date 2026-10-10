import type { Page } from '@/types';

export const PAGE_PATHS: Record<Page, string> = {
  inicio: '/',
  nosotros: '/sobre-nosotros',
  galeria: '/proyectos',
  trabaja: '/trabaja-con-nosotros',
  presupuesto: '/solicitar-presupuesto',
  privacidad: '/privacidad',
  cookies: '/cookies',
  legal: '/aviso-legal',
};

export const LEGACY_PATHS: Record<string, string> = {
  '/inicio': '/',
  '/nosotros': PAGE_PATHS.nosotros,
  '/galeria': PAGE_PATHS.galeria,
  '/trabaja': PAGE_PATHS.trabaja,
  '/presupuesto': PAGE_PATHS.presupuesto,
  '/legal': PAGE_PATHS.legal,
};

export function migrateLegacyHash() {
  const slug = window.location.hash.replace(/^#\/?/, '');
  if (Object.hasOwn(PAGE_PATHS, slug)) {
    window.history.replaceState(null, '', PAGE_PATHS[slug as Page] + window.location.search);
  }
}
