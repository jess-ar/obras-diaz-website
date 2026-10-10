import { Link } from 'react-router';
import { PAGE_PATHS } from '@/app/routes/paths';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import whiteLogoSrc from '@/assets/logos/logo-obras-diaz-white.png';
import type { Page } from '@/types';

interface HeaderProps {
  current?: Page;
}

const links: { id: Page; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Sobre nosotros' },
  { id: 'galeria', label: 'Proyectos' },
  { id: 'trabaja', label: 'Trabaja con nosotros' },
  { id: 'presupuesto', label: 'Solicitar presupuesto' },
];

export function Header({ current }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderLinks = () =>
    links.map(({ id, label }) => (
      <Link
        key={id}
        to={PAGE_PATHS[id]}
        onClick={() => setMobileOpen(false)}
        aria-current={current === id ? 'page' : undefined}
        className={`text-[13px] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${current === id ? 'text-white' : 'text-white/60'}`}
      >
        {label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-8 py-5">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            aria-label="Obras Díaz 2011 — ir al inicio"
            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Logo src={whiteLogoSrc} height="4.25rem" />
          </Link>
          <nav className="hidden xl:flex items-center gap-6" aria-label="Navegación principal">
            {renderLinks()}
          </nav>
          <button
            type="button"
            className="xl:hidden p-2 text-white/60 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            className="xl:hidden flex flex-col items-start gap-5 border-t border-white/8 py-6"
            aria-label="Navegación móvil"
          >
            {renderLinks()}
          </nav>
        )}
      </div>
    </header>
  );
}
