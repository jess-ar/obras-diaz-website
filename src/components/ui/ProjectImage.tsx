import { useState } from 'react';
import type { ProjectPhoto } from '@/types';

export function ProjectImage({
  photo,
  priority = false,
}: {
  photo: ProjectPhoto;
  priority?: boolean;
}) {
  const [attempt, setAttempt] = useState(0);
  const thumbnailWidth = Math.round(
    photo.width * Math.min(1, 800 / Math.max(photo.width, photo.height)),
  );
  if (attempt >= 2) {
    return <p className="py-3 text-sm text-[#626262]">Fotografía no disponible.</p>;
  }
  return (
    <div className="h-[clamp(190px,28svh,280px)] md:h-[clamp(210px,30svh,320px)] bg-[#F3F3F1] overflow-hidden">
      <img
        src={attempt === 0 ? photo.thumbnail : photo.src}
        srcSet={
          attempt === 0 && thumbnailWidth < photo.width
            ? `${photo.thumbnail} ${thumbnailWidth}w, ${photo.src} ${photo.width}w`
            : undefined
        }
        sizes="(min-width: 1440px) 648px, (min-width: 768px) calc((100vw - 80px) / 2), calc(100vw - 48px)"
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setAttempt((previous) => previous + 1)}
        className="block w-full h-full object-contain object-center"
      />
    </div>
  );
}
