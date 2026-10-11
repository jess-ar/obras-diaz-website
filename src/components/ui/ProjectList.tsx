import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { PROJECTS } from '@/config/projects';
import { ProjectImage } from '@/components/ui/ProjectImage';

export function ProjectList() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(
            'motion-safe:animate-in',
            'motion-safe:slide-in-from-bottom-4',
            'motion-safe:duration-700',
          );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );
    root.current
      .querySelectorAll('[data-project-reveal]')
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-14">
      {PROJECTS.map((project, index) => (
        <article key={project.id} data-project-reveal className="min-w-0">
          <Link
            to={`/proyectos/${project.id}`}
            className="block group focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-8"
          >
            {project.photos[0] && <ProjectImage photo={project.photos[0]} priority={index < 2} />}
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="flex items-baseline gap-3 lg:gap-4">
                <span className="text-[11px] tabular-nums text-[#6E6E6E]" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-xl sm:text-2xl lg:text-[28px] font-semibold leading-tight tracking-tight">
                  {project.name}
                </h2>
              </div>
              <ArrowUpRight
                size={20}
                aria-hidden
                className="mt-1 shrink-0 text-[#6E6E6E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A0A0A] motion-reduce:transition-none motion-reduce:transform-none"
              />
            </div>
            <p className="mt-2 pl-7 lg:pl-8 text-xs text-[#626262] transition-colors group-hover:text-[#0A0A0A] motion-reduce:transition-none">
              Explorar proyecto
            </p>
          </Link>
        </article>
      ))}
    </div>
  );
}
