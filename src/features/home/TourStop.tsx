import type { Page } from '@/types';
import type { TourStopData } from './homeTour';

export function TourStop({
  stop,
  index,
  active,
  setPage,
}: {
  stop: TourStopData;
  index: number;
  active: boolean;
  setPage: (page: Page) => void;
}) {
  const Title = index === 0 ? 'h1' : 'h2';
  return (
    <div
      data-tour-text
      aria-hidden={!active}
      className={`absolute inset-x-0 px-6 lg:px-12 ${index === 0 ? 'top-[45%]' : 'bottom-0 pb-16 lg:pb-20'}`}
      style={{ visibility: active ? 'visible' : 'hidden' }}
    >
      <div className="max-w-[1440px] mx-auto">
        <Title
          className={`font-display whitespace-pre-line text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl ${index === 0 ? 'relative -top-8 origin-bottom-left scale-[1.2] font-extrabold [-webkit-text-stroke:0.5px_currentColor] text-[#0A0A0A]' : 'font-semibold text-white'}`}
        >
          {stop.title}
        </Title>
        {stop.subtitle && <p className="mt-5 text-lg text-white/85">{stop.subtitle}</p>}
        <button
          type="button"
          onClick={() => setPage(stop.page)}
          tabIndex={active ? 0 : -1}
          className="mt-8 inline-block border border-white bg-white text-[#0A0A0A] px-6 py-3 text-sm font-medium hover:bg-transparent hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {stop.cta}
        </button>
      </div>
    </div>
  );
}
