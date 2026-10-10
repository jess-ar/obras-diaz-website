import { COMPANY_EMAIL, COMPANY_MAILTO } from '@/config/constants';
import type { CSSProperties } from 'react';
import { CopyEmailButton } from './CopyEmailButton';

type EmailContactPageProps = {
  label: string;
  title: string;
  description: string;
  subject: string;
  image: { src: string; alt: string; width: number; height: number; caption: string };
  imageSide: 'left' | 'right';
};

export function EmailContactPage({
  label,
  title,
  description,
  subject,
  image,
  imageSide,
}: EmailContactPageProps) {
  return (
    <section
      aria-labelledby="email-page-title"
      className="bg-[#F6F6F4] text-[#0A0A0A] pt-6 pb-8 sm:pt-8 lg:pt-6"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between gap-6 border-t border-[#CECECB] pt-4 mb-6 text-[10px] tracking-[0.14em] uppercase text-[#626262]">
          <p>{label}</p>
          <span aria-hidden className="hidden sm:block">
            Obras Díaz 2011 SL
          </span>
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12 lg:items-center">
          <div
            className={`relative min-w-0 lg:row-start-1 motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 ${imageSide === 'left' ? 'lg:col-start-6 lg:col-span-7 lg:pl-4' : 'lg:col-start-1 lg:col-span-7'}`}
          >
            <h1
              id="email-page-title"
              className="relative max-w-[18ch] font-display text-[clamp(38px,6vw,72px)] lg:text-[clamp(36px,5.5svh,56px)] leading-[1.04] tracking-[-0.045em] font-extrabold text-balance"
            >
              {title}
            </h1>
            <p className="relative mt-5 max-w-[30ch] text-[#555555] text-[17px] leading-[1.6]">
              {description}
            </p>
            <div className="mt-6 pt-5 border-t border-[#CECECB]">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#626262] mb-3">
                Escríbenos
              </p>
              <a
                href={`${COMPANY_MAILTO}?subject=${encodeURIComponent(subject)}`}
                className="inline-block max-w-full [overflow-wrap:anywhere] text-[clamp(16px,2vw,24px)] font-medium underline decoration-1 underline-offset-[6px] transition-colors duration-180 hover:text-[#666666] focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-6 motion-reduce:transition-none"
              >
                {COMPANY_EMAIL}
              </a>
              <CopyEmailButton className="inline-block mt-6 py-[15px] px-7 border border-[#0A0A0A] bg-[#0A0A0A] text-white text-[13px] font-semibold transition-[background-color,color,transform] duration-180 hover:bg-transparent hover:text-[#0A0A0A] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-65 focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0" />
            </div>
          </div>
          <figure
            className={`min-w-0 lg:row-start-1 lg:justify-self-center lg:w-[min(100%,calc(clamp(300px,calc(100svh-280px),520px)*var(--email-image-ratio)))] motion-safe:animate-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-1000 ${imageSide === 'left' ? 'lg:col-start-1 lg:col-span-5' : 'lg:col-start-8 lg:col-span-5'}`}
            style={{ '--email-image-ratio': image.width / image.height } as CSSProperties}
          >
            <div className="overflow-hidden bg-[#E6E6E3] lg:bg-transparent">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                decoding="async"
                className="block w-full h-auto max-w-full mx-auto object-contain"
              />
            </div>
            <figcaption className="mt-3 text-right text-[11px] leading-[1.5] text-[#626262]">
              {image.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
