import { Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { AC } from '@/config/theme';
import type { Page } from '@/types';
import whiteLogoSrc from '@/assets/logos/logo-obras-diaz-white.png';

interface FooterProps {
  setPage: (p: Page) => void;
}

export function Footer({ setPage }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Logo src={whiteLogoSrc} height="4.25rem" />
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed mb-6">
              Más de 14 años construyendo espacios pensados para durar. Calidad, compromiso y
              profesionalidad en cada proyecto.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/obrasdiaz2011sl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram de Obras Díaz 2011"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/obrasdiaz2011sl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook de Obras Díaz 2011"
              >
                <Facebook size={18} />
              </a>
              <span
                className="text-white/25 cursor-not-allowed"
                title="LinkedIn — próximamente"
                aria-label="LinkedIn — próximamente"
              >
                <Linkedin size={18} />
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/55 mb-6">
              Contacto
            </h3>
            <ul className="space-y-4 text-[13px] text-white/60">
              <li className="flex items-start gap-3">
                <Mail size={13} className="mt-0.5 shrink-0" style={{ color: AC }} />{' '}
                info@obrasdiaz2011.es
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: AC }} /> Barcelona y
                alrededores
              </li>
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/55 mb-6">
              Navegación
            </h3>
            <ul className="space-y-3 text-[13px]">
              {(
                ['inicio', 'nosotros', 'galeria', 'trabaja', 'contacto', 'presupuesto'] as Page[]
              ).map((id, i) => (
                <li key={id}>
                  <button
                    onClick={() => setPage(id)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {
                      [
                        'Inicio',
                        'Sobre nosotros',
                        'Galería de reformas',
                        'Trabaja con nosotros',
                        'Contacto',
                        'Pedir presupuesto',
                      ][i]
                    }
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/55 mb-6">
              Legal
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li>
                <button
                  onClick={() => setPage('privacidad')}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Política de privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('cookies')}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Política de cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('legal')}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Aviso legal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('baja')}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Darse de baja
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/50">
            © {new Date().getFullYear()} Obras Díaz 2011, S.L. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-white/50">
            CIF: B-XXXXXXXX · Registro Mercantil de Barcelona
          </p>
        </div>
      </div>
    </footer>
  );
}
