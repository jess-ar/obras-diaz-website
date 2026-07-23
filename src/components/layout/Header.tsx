import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { BtnPrimary } from '@/components/ui/Button';
import { ACR } from '@/config/theme';
import { useScrolled } from '@/hooks/useScrolled';
import type { Page } from '@/types';
import defaultLogoSrc from '@/assets/logos/logo-obras-diaz-default.png';
import onDarkLogoSrc from '@/assets/logos/logo-obras-diaz-on-dark.png';

interface HeaderProps {
  current: Page;
  setPage: (p: Page) => void;
}

export function Header({ current, setPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();
  const isHero = current === 'inicio';

  const onDark = isHero && !scrolled;
  const headerBg = scrolled ? 'bg-white border-b border-[#E5E5E5] shadow-sm' : 'bg-transparent';
  const headerLogo = onDark ? onDarkLogoSrc : defaultLogoSrc;

  const nav = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Sobre nosotros' },
    { id: 'galeria', label: 'Galería' },
    { id: 'trabaja', label: 'Trabaja con nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const go = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <button
          onClick={() => go('inicio')}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          style={{ outlineColor: ACR }}
          aria-label="Obras Díaz 2011 — ir al inicio"
        >
          <Logo src={headerLogo} height="3.25rem" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id as Page)}
              className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:opacity-50 ${
                current === item.id ? 'border-b border-current pb-0.5' : ''
              } ${onDark ? 'text-white' : 'text-[#0A0A0A]'}`}
            >
              {item.label}
            </button>
          ))}
          <BtnPrimary onClick={() => go('presupuesto')}>Pedir presupuesto</BtnPrimary>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 -mr-2 ${onDark ? 'text-white' : 'text-[#0A0A0A]'}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden bg-white border-t border-[#E5E5E5]"
          role="navigation"
          aria-label="Menú móvil"
        >
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id as Page)}
              className={`w-full text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] border-b border-[#F0F0F0] hover:bg-[#F8F8F8] transition-colors ${
                current === item.id ? 'text-[#6E6E6E]' : 'text-[#0A0A0A]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="px-6 py-5">
            <BtnPrimary onClick={() => go('presupuesto')} full>
              Pedir presupuesto
            </BtnPrimary>
          </div>
        </div>
      )}
    </header>
  );
}
