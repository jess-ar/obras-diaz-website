import { useState } from 'react';
import { HomePage } from '@/features/home';
import { AboutPage } from '@/features/about';
import { GalleryPage } from '@/features/gallery';
import { JobsPage } from '@/features/jobs';
import { ContactPage, PresupuestoPage, UnsubscribePage } from '@/features/contact';
import { LegalPage } from '@/app/routes/LegalPage';
import { Header, Footer } from '@/components/layout';
import type { Page } from '@/types';

export default function App() {
  const [page, setPage] = useState<Page>('inicio');

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Header current={page} setPage={navigate} />
      <main id="main-content" className={page === 'inicio' ? '' : 'pt-16 lg:pt-20'}>
        {page === 'inicio' && <HomePage setPage={navigate} />}
        {page === 'nosotros' && <AboutPage setPage={navigate} />}
        {page === 'galeria' && <GalleryPage />}
        {page === 'trabaja' && <JobsPage />}
        {page === 'contacto' && <ContactPage setPage={navigate} />}
        {page === 'presupuesto' && <PresupuestoPage />}
        {page === 'baja' && <UnsubscribePage setPage={navigate} />}
        {page === 'privacidad' && <LegalPage page="privacidad" setPage={navigate} />}
        {page === 'cookies' && <LegalPage page="cookies" setPage={navigate} />}
        {page === 'legal' && <LegalPage page="legal" setPage={navigate} />}
      </main>
      <Footer setPage={navigate} />
    </div>
  );
}

