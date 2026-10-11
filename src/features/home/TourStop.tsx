import type { Page } from '@/types';
import type { TourStopData } from '@/features/home/homeTour';
import { Link } from 'react-router';
import { PAGE_PATHS } from '@/app/routes/paths';
import type { KeyboardEventHandler } from 'react';

export function TourStop({
  stop,
  index,
  active,
  onCtaKeyDown,
}: {
  stop: TourStopData;
  index: number;
  active: boolean;
  setPage: (page: Page) => void;
  onCtaKeyDown?: KeyboardEventHandler<HTMLAnchorElement>;
}) {
  const Title = index === 0 ? 'h1' : 'h2';
  return (
    <div
      data-tour-text
      aria-hidden={!active}
      className={`absolute z-10 inset-x-0 px-6 lg:px-12 ${index === 0 ? 'top-[8%] bottom-0 sm:top-[45%]' : 'bottom-0 pb-12 sm:pb-16 lg:pb-20'}`}
      style={{ visibility: active ? 'visible' : 'hidden' }}
    >
      <div className={`relative max-w-[1440px] mx-auto ${index === 0 ? 'h-full' : ''}`}>
        <Title
          className={`font-display whitespace-pre-line leading-[1.05] tracking-tight max-w-3xl ${index === 0 ? 'relative top-6 text-right sm:text-left sm:-top-[36px] lg:-top-[46px] h-[75.6px] sm:h-[100.8px] lg:h-[151.2px] text-[44px] sm:text-[57.6px] lg:text-[86.4px] font-extrabold text-[#0A0A0A]' : 'text-4xl sm:text-5xl lg:text-7xl font-semibold text-white'}`}
        >
          {stop.title}
        </Title>
        <div className={index === 0 ? 'absolute inset-x-0 bottom-0 pb-12 sm:pb-16 lg:pb-20' : ''}>
          {stop.subtitle && (
            <p className={`mt-5 text-white/85 ${index === 0 ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
              {stop.subtitle}
            </p>
          )}
          <Link
            to={PAGE_PATHS[stop.page]}
            onKeyDown={onCtaKeyDown}
            tabIndex={active ? 0 : -1}
            className="mt-8 inline-block border border-white bg-white text-[#0A0A0A] px-6 py-3 text-sm font-medium hover:bg-transparent hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {stop.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
