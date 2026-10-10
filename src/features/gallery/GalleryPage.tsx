import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ProjectList } from '@/components/ui/ProjectList';
import type { Project } from '@/types';
export function GalleryPage({ initialProject = null }: { initialProject?: Project | null }) {
  const [project, setProject] = useState<Project | null>(initialProject);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const photos = project?.photos ?? [];
  useEffect(() => {
    if (photoIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const buttons = Array.from(
          closeButton.current?.closest('[role=dialog]')?.querySelectorAll('button') ?? [],
        );
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === 'Escape') setPhotoIndex(null);
      if (event.key === 'ArrowLeft')
        setPhotoIndex((index) =>
          index === null ? null : (index - 1 + photos.length) % photos.length,
        );
      if (event.key === 'ArrowRight')
        setPhotoIndex((index) => (index === null ? null : (index + 1) % photos.length));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      opener.current?.focus();
    };
  }, [photoIndex, photos.length]);
  return (
    <section className="bg-white py-20 lg:py-28 min-h-[60vh]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {project ? (
          <>
            <button
              type="button"
              onClick={() => setProject(null)}
              className="flex items-center gap-2 text-sm mb-8 hover:text-[#6E6E6E]"
            >
              <ArrowLeft size={16} />
              Todos los proyectos
            </button>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight mb-12">
              {project.name}
            </h1>
            {photos.length === 0 ? (
              <p className="text-[#666666] text-lg">Fotografías próximamente.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {photos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    aria-label={`Ampliar fotografía: ${photo.alt}`}
                    onClick={(event) => {
                      opener.current = event.currentTarget;
                      setPhotoIndex(index);
                    }}
                  >
                    <img
                      src={photo.thumbnail}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      width={photo.width}
                      height={photo.height}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight mb-12">
              Proyectos
            </h1>
            <ProjectList onSelect={setProject} />
          </>
        )}
      </div>
      {photoIndex !== null && photos[photoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografías de ${project?.name}`}
          className="fixed inset-0 z-[60] bg-[#0A0A0A] text-white flex items-center justify-center p-12 lg:p-20"
        >
          <button
            ref={closeButton}
            type="button"
            onClick={() => setPhotoIndex(null)}
            aria-label="Cerrar fotografía"
            className="absolute top-5 right-5 p-3"
          >
            <X />
          </button>
          {photos.length > 1 && (
            <button
              type="button"
              onClick={() => setPhotoIndex((photoIndex - 1 + photos.length) % photos.length)}
              aria-label="Fotografía anterior"
              className="absolute left-2 lg:left-6 p-3"
            >
              <ChevronLeft />
            </button>
          )}
          <img
            src={photos[photoIndex].src}
            alt={photos[photoIndex].alt}
            className="max-w-full max-h-[80vh] object-contain"
          />
          {photos.length > 1 && (
            <button
              type="button"
              onClick={() => setPhotoIndex((photoIndex + 1) % photos.length)}
              aria-label="Fotografía siguiente"
              className="absolute right-2 lg:right-6 p-3"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
