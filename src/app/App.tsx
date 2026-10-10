import { useEffect, useState } from 'react';
import { HomePage } from '@/features/home';
import { AboutPage } from '@/features/about';
import { GalleryPage } from '@/features/gallery';
import { JobsPage } from '@/features/jobs';
import { PresupuestoPage } from '@/features/contact';
import { LegalPage } from '@/app/routes/LegalPage';
import { Header, Footer } from '@/components/layout';
import type { Page, Project } from '@/types';

const pages: Page[] = [
  'inicio',
  'nosotros',
  'galeria',
  'trabaja',
  'presupuesto',
  'privacidad',
  'cookies',
  'legal',
];

function pageFromUrl(): Page {
  const candidate = window.location.hash.replace(/^#\/?/, '') as Page;
  return pages.includes(candidate) ? candidate : 'inicio';
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromUrl);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const syncPage = () => {
      setSelectedProject(null);
      setPage(pageFromUrl());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', syncPage);
    window.addEventListener('hashchange', syncPage);
    return () => {
      window.removeEventListener('popstate', syncPage);
      window.removeEventListener('hashchange', syncPage);
    };
  }, []);

  const navigate = (p: Page) => {
    if (p !== pageFromUrl()) {
      window.history.pushState(null, '', `#/${p}`);
    }
    setSelectedProject(null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Header current={page} setPage={navigate} />
      <main id="main-content">
        {page === 'inicio' && <HomePage setPage={navigate} />}
        {page === 'nosotros' && <AboutPage setPage={navigate} />}
        {page === 'galeria' && <GalleryPage initialProject={selectedProject} />}
        {page === 'trabaja' && <JobsPage />}
        {page === 'presupuesto' && <PresupuestoPage />}
        {page === 'privacidad' && <LegalPage page="privacidad" setPage={navigate} />}
        {page === 'cookies' && <LegalPage page="cookies" setPage={navigate} />}
        {page === 'legal' && <LegalPage page="legal" setPage={navigate} />}
      </main>
      <Footer setPage={navigate} />
    </div>
  );
}
