import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { HOME_TOUR } from '@/features/home/homeTour';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => {
      const stage = document.querySelector<HTMLElement>('[data-tour-stage]');
      const world = stage?.parentElement;
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 108;
      if (stage && world) {
        const distance = Math.max(1, world.offsetHeight - stage.offsetHeight);
        const progress = (headerHeight - world.getBoundingClientRect().top) / distance;
        const lastSceneStart = (HOME_TOUR.length - 1.5) / (HOME_TOUR.length - 1);
        setVisible(progress >= lastSceneStart);
      } else {
        const lastScene = document.querySelector<HTMLElement>('[data-tour-last]');
        setVisible(Boolean(lastScene && lastScene.getBoundingClientRect().top <= headerHeight));
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      onClick={() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
      }}
      className="fixed bottom-28 right-6 lg:right-12 z-40 flex h-11 w-11 items-center justify-center border border-white/30 bg-[#0A0A0A] text-white hover:bg-white hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <ArrowUp size={20} aria-hidden />
    </button>
  );
}
