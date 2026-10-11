import type { Project } from '@/types';

export const SITE_URL = 'https://obras-diaz.vercel.app';
const DEFAULT_IMAGE = '/og-image.jpg';

const pages: Record<string, { title: string; description: string; noindex?: boolean }> = {
  '/': {
    title: 'Reformas integrales en Barcelona | Obras Díaz',
    description: 'Reformas integrales de viviendas y locales en Barcelona y alrededores. Cocinas, baños, instalaciones y acabados. Solicita presupuesto a Obras Díaz.',
  },
  '/sobre-nosotros': {
    title: 'Empresa de reformas en Barcelona | Obras Díaz',
    description: 'Conoce Obras Díaz y nuestra forma de trabajar: planificación, coordinación de los trabajos y atención a los acabados en cada reforma.',
  },
  '/proyectos': {
    title: 'Proyectos de reformas en Barcelona | Obras Díaz',
    description: 'Descubre las reformas de Obras Díaz: viviendas, cocinas, baños e interiores. Fotografías de proyectos terminados en Barcelona y alrededores.',
  },
  '/solicitar-presupuesto': {
    title: 'Presupuesto de reforma en Barcelona | Obras Díaz',
    description: 'Cuéntanos tu proyecto y solicita presupuesto para tu reforma en Barcelona y alrededores. Contacta con el equipo de Obras Díaz por correo electrónico.',
  },
  '/trabaja-con-nosotros': {
    title: 'Trabaja con nosotros | Obras Díaz Barcelona',
    description: '¿Quieres formar parte del equipo de Obras Díaz? Envíanos tu currículum y cuéntanos tu experiencia en el sector de las reformas.',
  },
  '/privacidad': { title: 'Política de privacidad | Obras Díaz', description: 'Información sobre el tratamiento de datos personales en Obras Díaz.', noindex: true },
  '/cookies': { title: 'Política de cookies | Obras Díaz', description: 'Información sobre las cookies y el funcionamiento de la web de Obras Díaz.', noindex: true },
  '/aviso-legal': { title: 'Aviso legal | Obras Díaz', description: 'Datos de identificación y condiciones de uso del sitio web de Obras Díaz 2011, S.L.', noindex: true },
};

export const SEO_PATHS = [
  ...Object.keys(pages),
];

export function getSeo(pathname: string, projects: Project[]) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const project = projects.find((item) => path === `/proyectos/${item.id}`);
  const page = project ? {
    title: `Reforma de ${project.name} | Obras Díaz`,
    description: `Descubre el proyecto de reforma de ${project.name} realizado por Obras Díaz. Explora las fotografías del interior y sus acabados.`,
  } : pages[path];
  const title = page?.title ?? 'Página no encontrada | Obras Díaz';
  const description = page?.description ?? 'La página solicitada no existe. Consulta los proyectos y servicios de reformas de Obras Díaz.';
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}${DEFAULT_IMAGE}`;
  const noindex = !page || Boolean('noindex' in page && page.noindex);
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Obras Díaz',
    legalName: 'Obras Díaz 2011, S.L.',
    url: SITE_URL,
    sameAs: ['https://www.instagram.com/obrasdiaz2011sl', 'https://www.facebook.com/obrasdiaz2011sl'],
  };
  const breadcrumb = path === '/' ? [] : [{
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      ...(project ? [{ '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${SITE_URL}/proyectos` }] : []),
      { '@type': 'ListItem', position: project ? 3 : 2, name: project?.name ?? title.split(' | ')[0], item: url },
    ],
  }];
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [organization, {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title,
      description, inLanguage: 'es', about: { '@id': organization['@id'] },
    }, ...breadcrumb, ...(path === '/' ? [{
      '@type': 'Service', name: 'Reformas integrales en Barcelona',
      serviceType: 'Reformas integrales de viviendas y locales',
      areaServed: { '@type': 'City', name: 'Barcelona' },
      provider: { '@id': organization['@id'] },
    }] : [])],
  };
  return { title, description, url, image, noindex, structuredData };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function renderSeoHead(path: string, projects: Project[]) {
  const seo = getSeo(path, projects);
  const metadata = [
    ['name', 'description', seo.description],
    ['name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', 'Obras Díaz'],
    ['property', 'og:locale', 'es_ES'],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'og:url', seo.url],
    ['property', 'og:image', seo.image],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', seo.title],
    ['name', 'twitter:description', seo.description],
    ['name', 'twitter:image', seo.image],
  ];
  return `<title>${escapeHtml(seo.title)}</title>\n` +
    metadata.map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`).join('\n') +
    `\n<link rel="canonical" href="${escapeHtml(seo.url)}" />\n` +
    `<script id="seo-structured-data" type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g, '\\u003c')}</script>`;
}
