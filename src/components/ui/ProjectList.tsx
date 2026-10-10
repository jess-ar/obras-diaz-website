import { PROJECTS } from '@/config/constants';
import type { Project } from '@/types';
export function ProjectList({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
      {PROJECTS.map((project) => {
        const cover = project.photos[0];
        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            className="text-left group focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {cover && (
              <div className="aspect-[4/3] overflow-hidden mb-4">
                <img
                  src={cover.thumbnail}
                  alt={cover.alt}
                  loading="lazy"
                  decoding="async"
                  width={cover.width}
                  height={cover.height}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="border-b border-[#E5E5E5] pb-6">
              <h3 className="font-display text-2xl lg:text-3xl font-bold group-hover:text-[#6E6E6E] transition-colors">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-[#666666]">
                {cover ? 'Ver proyecto' : 'Fotografías próximamente'}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
