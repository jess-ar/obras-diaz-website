import { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import { HomePage } from '@/features/home';
import { AboutPage } from '@/features/about';
import { GalleryPage } from '@/features/gallery';
import { JobsPage } from '@/features/jobs';
import { PresupuestoPage } from '@/features/contact';
import { LegalPage } from '@/app/routes/LegalPage';
import { NotFoundPage } from '@/app/routes/NotFoundPage';
import { PAGE_PATHS, LEGACY_PATHS } from '@/app/routes/paths';
import { PROJECTS } from '@/config/projects';
import { Header, Footer } from '@/components/layout';
import { Seo } from '@/components/Seo';
import type { Page } from '@/types';

function ProjectRoute() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((item) => item.id === projectId);
  if (projectId && !project) return <NotFoundPage />;
  return (
    <GalleryPage
      key={projectId ?? 'all'}
      initialProject={project ?? null}
      onProjectSelect={(selected) =>
        navigate(selected ? `/proyectos/${selected.id}` : '/proyectos')
      }
    />
  );
}

function SiteRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const current = (Object.entries(PAGE_PATHS).find(([, path]) => path === pathname)?.[0] ??
    (location.pathname.startsWith('/proyectos/') ? 'galeria' : undefined)) as Page | undefined;
  const setPage = (page: Page) => navigate(PAGE_PATHS[page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Seo />
      <Header current={current} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage setPage={setPage} />} />
          <Route path={PAGE_PATHS.nosotros} element={<AboutPage setPage={setPage} />} />
          <Route path="/proyectos" element={<ProjectRoute />} />
          <Route path="/proyectos/:projectId" element={<ProjectRoute />} />
          <Route path={PAGE_PATHS.trabaja} element={<JobsPage />} />
          <Route path={PAGE_PATHS.presupuesto} element={<PresupuestoPage />} />
          {(['privacidad', 'cookies', 'legal'] as const).map((page) => (
            <Route
              key={page}
              path={PAGE_PATHS[page]}
              element={<LegalPage page={page} setPage={setPage} />}
            />
          ))}
          {Object.entries(LEGACY_PATHS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteRoutes />
    </BrowserRouter>
  );
}
