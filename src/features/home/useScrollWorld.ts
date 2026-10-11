import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOME_TOUR, TOUR_CLIPS } from '@/features/home/homeTour';

gsap.registerPlugin(ScrollTrigger);

type Connection = {
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

export function useScrollWorld(root: RefObject<HTMLElement | null>) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [active, setActive] = useState(0);
  const [segment, setSegment] = useState(0);
  const navigateStop = useRef<((index: number) => void) | null>(null);
  const focusStop = useCallback((index: number) => navigateStop.current?.(index), []);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const update = () => {
      setReducedMotion(query.matches);
      setSaveData(Boolean(connection?.saveData));
    };
    update();
    query.addEventListener('change', update);
    connection?.addEventListener?.('change', update);
    return () => {
      query.removeEventListener('change', update);
      connection?.removeEventListener?.('change', update);
    };
  }, []);

  useEffect(() => {
    const world = root.current;
    if (!world || reducedMotion || saveData) return;
    const stage = world.querySelector<HTMLElement>('[data-tour-stage]');
    if (!stage) return;
    const header = document.querySelector('header');
    const texts = Array.from(stage.querySelectorAll<HTMLElement>('[data-tour-text]'));
    const videos = Array.from(stage.querySelectorAll<HTMLVideoElement>('video'));
    const fill = stage.querySelector<HTMLElement>('[data-tour-progress]');
    let desiredTime = 0;
    let clipIndex = 0;
    const syncVideo = () => {
      videos.forEach((video, index) => {
        if (index !== clipIndex) video.style.visibility = 'hidden';
      });
      const video = videos[clipIndex];
      if (
        !video ||
        !TOUR_CLIPS[clipIndex] ||
        video.readyState < 2 ||
        !Number.isFinite(video.duration)
      )
        return;
      if (video.seeking) return;
      if (Math.abs(video.currentTime - desiredTime) > 0.04) {
        video.currentTime = desiredTime;
      } else video.style.visibility = 'visible';
    };
    const render = (progress: number) => {
      const position = progress * (HOME_TOUR.length - 1);
      const stopIndex = Math.round(position);
      setActive((previous) => (previous === stopIndex ? previous : stopIndex));
      clipIndex = Math.min(TOUR_CLIPS.length - 1, Math.floor(position));
      setSegment((previous) => (previous === clipIndex ? previous : clipIndex));
      texts.forEach((text, index) => {
        const offset = position - index;
        const travel = Math.max(0, Math.abs(offset) - 0.3) / 0.2;
        gsap.set(text, { y: -Math.sign(offset) * Math.min(1, travel) * 24 });
      });
      if (fill) fill.style.transform = `scaleX(${progress})`;
      const video = videos[clipIndex];
      if (video && Number.isFinite(video.duration))
        desiredTime = Math.min(
          (position - clipIndex) * video.duration,
          Math.max(0, video.duration - 0.04),
        );
      syncVideo();
    };
    const trigger = ScrollTrigger.create({
      trigger: world,
      start: () => `top top+=${header?.getBoundingClientRect().height ?? 108}`,
      end: () => `+=${Math.max(1, world.offsetHeight - stage.offsetHeight)}`,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });
    let focusFrame = 0;
    navigateStop.current = (index) => {
      const progress = index / (HOME_TOUR.length - 1);
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: 'instant' });
      render(progress);
      cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(() => {
        texts[index]?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
      });
    };
    const onLoaded = () => render(trigger.progress);
    videos.forEach((video) => {
      video.addEventListener('seeked', syncVideo);
      video.addEventListener('loadeddata', onLoaded);
    });
    const observer = new ResizeObserver(() => {
      const height = header?.getBoundingClientRect().height ?? 108;
      world.style.setProperty('--tour-header-height', `${height}px`);
      ScrollTrigger.refresh();
    });
    if (header) observer.observe(header);
    render(trigger.progress);
    return () => {
      navigateStop.current = null;
      cancelAnimationFrame(focusFrame);
      trigger.kill();
      observer.disconnect();
      videos.forEach((video) => {
        video.removeEventListener('seeked', syncVideo);
        video.removeEventListener('loadeddata', onLoaded);
      });
      gsap.set(texts, { clearProps: 'transform' });
    };
  }, [root, reducedMotion, saveData]);
  return { active, segment, staticMode: reducedMotion || saveData, focusStop };
}
