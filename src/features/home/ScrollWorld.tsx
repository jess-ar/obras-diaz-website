import { useEffect, useRef, type CSSProperties } from 'react';
import type { Page } from '@/types';
import { HOME_TOUR, TOUR_CLIPS } from '@/features/home/homeTour';
import { TourStop } from '@/features/home/TourStop';
import { useScrollWorld } from '@/features/home/useScrollWorld';

export function ScrollWorld({ setPage }: { setPage: (page: Page) => void }) {
  const root = useRef<HTMLElement>(null);
  const { active, segment, staticMode, focusStop } = useScrollWorld(root);
  const availableImages = [
    Math.max(0, active - 1),
    active,
    Math.min(active + 1, HOME_TOUR.length - 1),
  ];
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const cachedUrls = useRef(new Map<number, string>());
  useEffect(() => {
    const nodes = videos.current;
    const cache = cachedUrls.current;
    const controller = new AbortController();
    const keep = staticMode ? [] : [segment, segment + 1];
    cache.forEach((url, index) => {
      if (keep.includes(index)) return;
      const video = nodes[index];
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
        video.style.visibility = 'hidden';
      }
      URL.revokeObjectURL(url);
      cache.delete(index);
    });
    const load = async () => {
      for (const index of keep) {
        const clip = TOUR_CLIPS[index],
          video = nodes[index];
        if (!clip || !video || cache.has(index) || controller.signal.aborted) continue;
        try {
          const response = await fetch(clip.src, { signal: controller.signal });
          if (!response.ok) throw new Error('Clip unavailable');
          const blob = await response.blob();
          if (controller.signal.aborted) return;
          const url = URL.createObjectURL(blob);
          cache.set(index, url);
          video.src = url;
          video.load();
          // Brief initialization for frame seeking in Safari.
          await video.play().catch(() => {});
          video.pause();
        } catch {
          /* Keep the photograph if loading fails. */
        }
      }
    };
    void load();
    return () => controller.abort();
  }, [segment, staticMode]);
  useEffect(() => {
    const nodes = videos.current;
    const cache = cachedUrls.current;
    return () => {
      nodes.forEach((video) => {
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
      });
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  if (staticMode)
    return (
      <section aria-label="Reformas de Obras Díaz" className="bg-[#0A0A0A] text-white">
        {HOME_TOUR.map((stop, index) => (
          <article
            key={stop.id}
            data-tour-last={index === HOME_TOUR.length - 1 ? '' : undefined}
            className="min-h-[max(640px,calc(100dvh-108px))] relative overflow-hidden"
          >
            <img
              src={stop.photo}
              srcSet={stop.photoSrcSet}
              sizes="100vw"
              alt={stop.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 w-full h-full ${index === 0 ? 'lg:[--hero-vertical-focus:40%]' : ''}`}
              style={{
                objectFit: stop.fit ?? 'cover',
                objectPosition: `${stop.focus}% var(--hero-vertical-focus, ${stop.verticalFocus ?? 50}%)`,
              }}
            />
            <div
              aria-hidden
              className="absolute left-0 bottom-0 pointer-events-none w-[min(1100px,100%)] h-3/4 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,10,10,0.72)_0%,rgba(10,10,10,0.5)_35%,rgba(10,10,10,0)_72%)]"
            />
            <TourStop stop={stop} index={index} active setPage={setPage} />
          </article>
        ))}
      </section>
    );

  return (
    <section
      ref={root}
      aria-label="Recorrido por nuestras reformas"
      className="relative [--tour-header-height:108px] [--tour-scroll-pace:1] lg:[--tour-scroll-pace:1.8] h-[calc((1+(var(--tour-count)-1)*var(--tour-scroll-pace))*max(540px,calc(100dvh-var(--tour-header-height))))] motion-reduce:h-auto bg-[#0A0A0A] text-white"
      style={{ '--tour-count': HOME_TOUR.length } as CSSProperties}
    >
      <div
        data-tour-stage
        className="sticky top-[var(--tour-header-height)] h-[max(540px,calc(100dvh-var(--tour-header-height)))] overflow-hidden motion-reduce:relative motion-reduce:top-0"
      >
        {HOME_TOUR.map(
          (stop, index) =>
            availableImages.includes(index) && (
              <img
                key={stop.id}
                src={TOUR_CLIPS[index]?.poster ?? stop.photo}
                srcSet={TOUR_CLIPS[index]?.poster ? undefined : stop.photoSrcSet}
                sizes="100vw"
                alt={active === index ? stop.alt : ''}
                aria-hidden={active !== index}
                loading="eager"
                fetchPriority={index === 0 ? 'high' : 'low'}
                decoding="async"
                className={`absolute inset-0 w-full h-full ${index === 0 ? 'lg:[--hero-vertical-focus:40%]' : ''}`}
                style={{
                  objectFit: stop.fit ?? 'cover',
                  visibility: active === index ? 'visible' : 'hidden',
                  objectPosition: `${stop.focus}% var(--hero-vertical-focus, ${stop.verticalFocus ?? 50}%)`,
                }}
              />
            ),
        )}
        {TOUR_CLIPS.map((clip, index) => (
          <video
            key={HOME_TOUR[index].id}
            ref={(element) => {
              videos.current[index] = element;
            }}
            poster={clip?.poster}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{ visibility: 'hidden', objectPosition: `${HOME_TOUR[index].focus}% center` }}
          />
        ))}
        <div
          aria-hidden
          className="absolute left-0 bottom-0 pointer-events-none w-[min(1100px,100%)] h-3/4 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,10,10,0.72)_0%,rgba(10,10,10,0.5)_35%,rgba(10,10,10,0)_72%)]"
        />
        {HOME_TOUR.map((stop, index) => (
          <TourStop
            key={stop.id}
            stop={stop}
            index={index}
            active={active === index}
            setPage={setPage}
            onCtaKeyDown={(event) => {
              if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) return;
              const next = index + (event.shiftKey ? -1 : 1);
              if (next < 0 || next >= HOME_TOUR.length) return;
              event.preventDefault();
              focusStop(next);
            }}
          />
        ))}
        <div
          className="absolute inset-x-6 lg:inset-x-12 bottom-6 flex items-center gap-4 text-xs text-white/80 pointer-events-none"
          aria-hidden
        >
          <div className="h-px w-24 bg-white/30">
            <div data-tour-progress className="h-full bg-white origin-left scale-x-0" />
          </div>
          <span className={`ml-auto ${active === 0 ? 'lg:text-[#0A0A0A]' : 'text-white'}`}>
            Desliza para recorrer
          </span>
        </div>
      </div>
    </section>
  );
}
