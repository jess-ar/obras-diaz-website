import { Building2, Home, Layers, Wrench } from 'lucide-react';
import type { Service, Value } from '@/types';
export const COMPANY_EMAIL = 'obrasdiaz2011sl@gmail.com';
export const COMPANY_CIF = 'B-65595126';
export const COMPANY_MAILTO = `mailto:${COMPANY_EMAIL}`;
export const CV_MAILTO = `${COMPANY_MAILTO}?subject=Env%C3%ADo%20de%20curr%C3%ADculum`;
export const SERVICES: Service[] = [
  { icon: Wrench, title: 'Reformas integrales', desc: 'Renovación de viviendas.' },
  { icon: Home, title: 'Cocinas y baños', desc: 'Reforma de cocinas y baños.' },
  { icon: Layers, title: 'Interiores', desc: 'Salones, dormitorios y zonas de estar.' },
  { icon: Building2, title: 'Locales y oficinas', desc: 'Reforma de espacios de trabajo.' },
];
export { PROJECTS } from './projects';
export const VALUES: Value[] = [
  { title: 'Responsabilidad', desc: 'Un trabajo responsable.' },
  { title: 'Cuidado del detalle', desc: 'Atención a cada acabado.' },
  { title: 'Claridad', desc: 'Comunicación sencilla y directa.' },
];
