import { Link } from 'react-router';
import { PAGE_PATHS } from '@/app/routes/paths';
import { Instagram } from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_MAILTO } from '@/config/constants';
import type { Page } from '@/types';

const legalLinks: { page: Page; label: string }[] = [
  { page: 'privacidad', label: 'Privacidad' },
  { page: 'cookies', label: 'Cookies' },
  { page: 'legal', label: 'Aviso legal' },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={COMPANY_MAILTO}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {COMPANY_EMAIL}
            </a>
            <a
              href="https://www.instagram.com/obrasdiaz2011sl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Obras Díaz 2011"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/obrasdiaz2011sl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Obras Díaz 2011"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="border-t border-white/15 mt-8 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Obras Díaz 2011, S.L.</p>
          <nav aria-label="Enlaces legales" className="flex flex-wrap gap-x-6 gap-y-3">
            {legalLinks.map(({ page, label }) => (
              <Link key={page} to={PAGE_PATHS[page]} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
