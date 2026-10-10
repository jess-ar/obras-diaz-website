import { useEffect, useRef, type CSSProperties } from 'react';
import type { Page } from '@/types';
import { HOME_TOUR, TOUR_CLIPS } from './homeTour';
import { TourStop } from './TourStop';
import { useScrollWorld } from './useScrollWorld';
import './scrollWorld.css';

export function ScrollWorld({ setPage }: { setPage: (page: Page) => void }) {
  const root = useRef<HTMLElement>(null);
  const { active, segment, staticMode } = useScrollWorld(root);
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
      <section aria-label="Calle Girona" className="bg-[#0A0A0A] text-white">
        {HOME_TOUR.map((stop, index) => (
          <article key={stop.id} className="tour-static relative overflow-hidden">
            <img
              src={stop.photo}
              alt={stop.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: `${stop.focus}% center` }}
            />
            <div aria-hidden className="tour-text-shade absolute left-0 bottom-0 pointer-events-none" />
            <TourStop stop={stop} index={index} active setPage={setPage} />
          </article>
        ))}
      </section>
    );

  return (
    <section
      ref={root}
      aria-label="Recorrido por Calle Girona"
      className="tour-world bg-[#0A0A0A] text-white"
      style={{ '--tour-count': HOME_TOUR.length } as CSSProperties}
    >
      <div data-tour-stage className="tour-stage">
        {HOME_TOUR.map(
          (stop, index) =>
            availableImages.includes(index) && (
              <img
                key={stop.id}
                src={TOUR_CLIPS[index]?.poster ?? stop.photo}
                alt={active === index ? stop.alt : ''}
                aria-hidden={active !== index}
                loading="eager"
                fetchPriority={index === 0 ? 'high' : 'low'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  visibility: active === index ? 'visible' : 'hidden',
                  objectPosition: `${stop.focus}% center`,
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
        <div aria-hidden className="tour-text-shade absolute left-0 bottom-0 pointer-events-none" />
        {HOME_TOUR.map((stop, index) => (
          <TourStop
            key={stop.id}
            stop={stop}
            index={index}
            active={active === index}
            setPage={setPage}
          />
        ))}
        <div
          className="absolute inset-x-6 lg:inset-x-12 bottom-6 flex items-center gap-4 text-xs text-white/80 pointer-events-none"
          aria-hidden
        >
          <div className="h-px w-24 bg-white/30">
            <div data-tour-progress className="h-full bg-white origin-left scale-x-0" />
          </div>
          <span className="ml-auto">Desliza para recorrer</span>
        </div>
      </div>
    </section>
  );
}
