import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getSeo } from '@/config/seo';
import { PROJECTS } from '@/config/projects';

export function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getSeo(pathname, PROJECTS);
    document.title = seo.title;
    const setMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    for (const [key, value] of Object.entries({ title: seo.title, description: seo.description, url: seo.url, image: seo.image })) {
      setMeta('property', `og:${key}`, value);
    }
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Obras Díaz');
    setMeta('property', 'og:locale', 'es_ES');
    setMeta('name', 'twitter:card', 'summary_large_image');
    for (const [key, value] of Object.entries({ title: seo.title, description: seo.description, image: seo.image })) {
      setMeta('name', `twitter:${key}`, value);
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seo.url;
    let schema = document.getElementById('seo-structured-data');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'seo-structured-data';
      schema.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(seo.structuredData);
  }, [pathname]);
  return null;
}
