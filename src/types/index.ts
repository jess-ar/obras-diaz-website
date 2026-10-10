// ─── Application Types ────────────────────────────────────────────────────────

export type Page =
  | 'inicio'
  | 'nosotros'
  | 'galeria'
  | 'trabaja'
  | 'presupuesto'
  | 'privacidad'
  | 'cookies'
  | 'legal';

export interface Service {
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;
  title: string;
  desc: string;
}

export interface ProjectPhoto {
  src: string;
  thumbnail: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  name: string;
  photos: ProjectPhoto[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface GalleryItem {
  img: string;
  name: string;
  cat: string;
  location: string;
}

export interface Job {
  title: string;
  dept: string;
  location: string;
  type: string;
  desc: string;
  req: string[];
  offer: string[];
}

export interface Value {
  title: string;
  desc: string;
}
