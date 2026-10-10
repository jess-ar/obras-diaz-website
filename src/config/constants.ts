import {
  Building2,
  HardHat,
  Wrench,
  Home,
  Layers,
  BarChart3,
} from 'lucide-react';
import type { Service, Project, Stat, ProcessStep, FAQ, GalleryItem, Job, Value } from '@/types';

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    icon: Wrench,
    title: 'Reformas integrales',
    desc: 'Renovación completa de viviendas y locales: estructura, instalaciones, acabados. Un único equipo de principio a fin.',
  },
  {
    icon: Home,
    title: 'Cocinas y baños',
    desc: 'Especialistas en la reforma de cocinas y cuartos de baño. Materiales de calidad, instalaciones al día y plazos cumplidos.',
  },
  {
    icon: Layers,
    title: 'Salones y dormitorios',
    desc: 'Transformamos salones, dormitorios y zonas de estar con criterio estético y funcionalidad real.',
  },
  {
    icon: Building2,
    title: 'Locales comerciales',
    desc: 'Adecuamos locales a la normativa vigente y los convertimos en espacios atractivos y operativos.',
  },
  {
    icon: HardHat,
    title: 'Oficinas y despachos',
    desc: 'Reformas de oficinas y despachos profesionales, con atención especial al confort acústico y la imagen corporativa.',
  },
  {
    icon: BarChart3,
    title: 'Gestión y dirección',
    desc: 'Coordinamos todos los gremios, gestionamos permisos y hacemos seguimiento continuo para que no tengas que preocuparte de nada.',
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    img: 'photo-1628744876525-f2678d8af47f',
    name: 'Reforma integral piso Salamanca',
    type: 'Reforma integral',
    location: 'Barcelona',
    year: '2024',
  },
  {
    img: 'photo-1762810931790-40b25e10b3e7',
    name: 'Cocina abierta — Eixample',
    type: 'Reforma de cocina',
    location: 'Barcelona',
    year: '2024',
  },
  {
    img: 'photo-1661107259637-4e1c55462428',
    name: 'Baño suite — Hotel Palacio',
    type: 'Reforma de baño',
    location: 'Barcelona',
    year: '2023',
  },
  {
    img: 'photo-1666037805138-f227944ed8d7',
    name: 'Salón con chimenea — Sant Cugat',
    type: 'Reforma de salón',
    location: 'Sant Cugat',
    year: '2023',
  },
  {
    img: 'photo-1552242718-c5360894aecd',
    name: 'Oficina boutique — Paseo de Gracia',
    type: 'Reforma de oficina',
    location: 'Barcelona',
    year: '2022',
  },
  {
    img: 'photo-1715985160053-d339e8b6eb94',
    name: 'Cocina y comedor — Sarrià',
    type: 'Reforma integral',
    location: 'Barcelona',
    year: '2022',
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS: Stat[] = [
  { value: '14+', label: 'Años de experiencia' },
  { value: '320+', label: 'Proyectos realizados' },
  { value: '280+', label: 'Clientes satisfechos' },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

export const PROCESS: ProcessStep[] = [
  {
    num: '01',
    title: 'Primera toma de contacto',
    desc: 'Nos reunimos para conocer tu proyecto, necesidades y expectativas.',
  },
  {
    num: '02',
    title: 'Evaluación del proyecto',
    desc: 'Nuestros técnicos estudian la viabilidad, plazos y condicionantes de la obra.',
  },
  {
    num: '03',
    title: 'Presupuesto detallado',
    desc: 'Elaboramos un presupuesto transparente, desglosado por partidas.',
  },
  {
    num: '04',
    title: 'Planificación',
    desc: 'Organizamos equipos, materiales y calendario de obra con precisión milimétrica.',
  },
  {
    num: '05',
    title: 'Ejecución',
    desc: 'Llevamos a cabo los trabajos con supervisión continua y reportes periódicos.',
  },
  {
    num: '06',
    title: 'Entrega y seguimiento',
    desc: 'Entregamos la obra terminada y realizamos seguimiento post-obra.',
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const FAQS: FAQ[] = [
  {
    q: '¿Qué tipo de reformas realizáis?',
    a: 'Reformas integrales de pisos, cocinas, baños, salones y dormitorios. También reformamos locales comerciales, oficinas y despachos profesionales. Si tienes dudas sobre si tu proyecto encaja, llámanos y te informamos.',
  },
  {
    q: '¿Trabajáis con particulares y empresas?',
    a: 'Sí. Trabajamos tanto con particulares que quieren reformar su vivienda como con empresas que necesitan acondicionar un local u oficina. Adaptamos el proceso y la comunicación a cada tipo de cliente.',
  },
  {
    q: '¿Cómo funciona el presupuesto?',
    a: 'Contactas con nosotros, hacemos una visita gratuita al inmueble y en 48–72 horas tienes un presupuesto detallado por partidas, sin letra pequeña ni costes ocultos.',
  },
  {
    q: '¿En qué zonas trabajáis?',
    a: "Principalmente en Barcelona ciudad y el área metropolitana: L'Hospitalet, Badalona, Cornellà, Sant Cugat, Castelldefels, Gavà, Terrassa y alrededores. También valoramos proyectos fuera del área según el encargo.",
  },
  {
    q: '¿Cuánto tarda una reforma integral de piso?',
    a: 'Depende del estado del inmueble y los metros cuadrados, pero una reforma integral de piso de 80–100 m² suele llevarse entre 2 y 4 meses. Siempre entregamos un calendario de obra antes de empezar.',
  },
  {
    q: '¿Qué pasa si surgen imprevistos en obra?',
    a: 'Te avisamos de inmediato, te explicamos las opciones y nunca ejecutamos ningún cambio sin tu aprobación. Nuestro precio cierra el presupuesto acordado: los imprevistos no te llegan como sorpresa al final.',
  },
];

// ─── Gallery ──────────────────────────────────────────────────────────────────

export const GALLERY_CATEGORIES = [
  'Todos',
  'Viviendas',
  'Cocinas',
  'Baños',
  'Salones',
  'Oficinas',
  'Locales',
];

export const GALLERY: GalleryItem[] = [
  {
    img: 'photo-1705321963943-de94bb3f0dd3',
    name: 'Reforma integral — Eixample',
    cat: 'Viviendas',
    location: 'Barcelona',
  },
  {
    img: 'photo-1628744876525-f2678d8af47f',
    name: 'Piso completo — Gràcia',
    cat: 'Viviendas',
    location: 'Barcelona',
  },
  {
    img: 'photo-1762810931790-40b25e10b3e7',
    name: 'Cocina oscura — Sarrià',
    cat: 'Cocinas',
    location: 'Barcelona',
  },
  {
    img: 'photo-1715985160053-d339e8b6eb94',
    name: 'Cocina abierta — Sant Cugat',
    cat: 'Cocinas',
    location: 'Sant Cugat',
  },
  {
    img: 'photo-1759691554646-8155da2172ee',
    name: 'Cocina con isla — Loft Poblenou',
    cat: 'Cocinas',
    location: 'Barcelona',
  },
  {
    img: 'photo-1661107259637-4e1c55462428',
    name: 'Baño suite — Hotel Eixample',
    cat: 'Baños',
    location: 'Barcelona',
  },
  {
    img: 'photo-1628602813485-4e8b09442e98',
    name: 'Baño spa — Vivienda particular',
    cat: 'Baños',
    location: 'Castelldefels',
  },
  {
    img: 'photo-1635247049694-0269c357ab69',
    name: 'Baño completo — Reforma integral',
    cat: 'Baños',
    location: 'Badalona',
  },
  {
    img: 'photo-1666037805138-f227944ed8d7',
    name: 'Salón con chimenea — Sant Cugat',
    cat: 'Salones',
    location: 'Sant Cugat',
  },
  {
    img: 'photo-1666001379694-4c823ec58810',
    name: 'Salón diáfano — Diagonal',
    cat: 'Salones',
    location: 'Barcelona',
  },
  {
    img: 'photo-1552242718-c5360894aecd',
    name: 'Oficina boutique — Paseo de Gracia',
    cat: 'Oficinas',
    location: 'Barcelona',
  },
  {
    img: 'photo-1761986757577-140af8859587',
    name: 'En ejecución — Poble Sec',
    cat: 'Locales',
    location: 'Barcelona',
  },
];

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export const JOBS: Job[] = [
  {
    title: 'Jefe de Obra',
    dept: 'Producción',
    location: 'Barcelona',
    type: 'Jornada completa',
    desc: 'Buscamos un Jefe de Obra con experiencia en reformas integrales de viviendas y locales en Barcelona y área metropolitana. Serás el responsable de planificar, coordinar y supervisar los trabajos de principio a fin, garantizando plazos, calidad y seguridad en cada proyecto.',
    req: [
      'FP Superior en Edificación, Arquitectura Técnica o similar',
      'Mínimo 5 años de experiencia en obras de reforma',
      'Capacidad de gestión de equipos y subcontratas',
      'Conocimiento de normativa urbanística y de seguridad en Cataluña',
      'Carnet de conducir B',
    ],
    offer: [
      'Contrato indefinido con período de prueba',
      'Vehículo de empresa para desplazamientos',
      'Herramientas y materiales propios de la empresa',
      'Plan de carrera y formación continua',
      'Seguro médico privado',
    ],
  },
  {
    title: 'Oficial 1ª Albañilería',
    dept: 'Ejecución',
    location: 'Barcelona',
    type: 'Jornada completa',
    desc: 'Necesitamos un Oficial de 1ª en albañilería para incorporarse a nuestros equipos de obra en reformas de viviendas y locales en Barcelona. Trabajarás junto a un equipo experimentado y con material y EPI de primera calidad.',
    req: [
      'Experiencia mínima de 3 años como oficial de albañilería',
      'Dominio de tabiquería, revestimientos, solados y alicatados',
      'Capacidad de lectura de planos',
      'Actitud responsable y orientación a la calidad',
      'Carnet de conducir valorable',
    ],
    offer: [
      'Contrato indefinido',
      'Material y EPI proporcionados por la empresa',
      'Formación en nuevas técnicas y sistemas constructivos',
      'Buen ambiente de trabajo y equipo estable',
      'Salario según convenio + incentivos por productividad',
    ],
  },
  {
    title: 'Técnico PRL',
    dept: 'Prevención',
    location: 'Barcelona / Remoto parcial',
    type: 'Jornada completa',
    desc: 'Incorporamos un Técnico de Prevención de Riesgos Laborales para supervisar y garantizar la seguridad en todas nuestras obras activas. Podrás desarrollar parte del trabajo en remoto, con visitas periódicas a obra.',
    req: [
      'Titulación de Técnico Superior en PRL (tres especialidades valorable)',
      'Experiencia mínima de 2 años en el sector de la construcción',
      'Conocimiento actualizado de la normativa vigente (Ley 31/1995, RD 1627/1997)',
      'Capacidad de redacción de planes de seguridad y evaluaciones de riesgo',
      'Habilidades de comunicación y resolución de conflictos en obra',
    ],
    offer: [
      'Contrato indefinido',
      'Flexibilidad de teletrabajo parcial',
      'Vehículo de empresa para visitas a obra',
      'Formación continua y actualización normativa',
      'Integración en un equipo comprometido con la seguridad',
    ],
  },
  {
    title: 'Administrativo/a de Obra',
    dept: 'Administración',
    location: 'Barcelona',
    type: 'Jornada completa',
    desc: 'Buscamos un perfil administrativo con experiencia o interés en el sector de la construcción para dar soporte a la gestión documental y económica de nuestras obras: presupuestos, albaranes, facturas, comunicación con proveedores y clientes.',
    req: [
      'Formación en Administración y Finanzas, Gestión o similar',
      'Experiencia mínima de 1 año en puesto similar (sector construcción valorable)',
      'Manejo fluido de herramientas ofimáticas (Excel, Word, correo)',
      'Organización, atención al detalle y capacidad de gestión de múltiples tareas',
      'Catalán y castellano a nivel nativo o avanzado',
    ],
    offer: [
      'Contrato indefinido',
      'Horario de oficina estable (lunes a viernes)',
      'Integración en un equipo pequeño y dinámico',
      'Formación interna en procesos y herramientas de la empresa',
      'Posibilidades de crecimiento interno',
    ],
  },
];

// ─── Values ───────────────────────────────────────────────────────────────────

export const VALUES: Value[] = [
  {
    title: 'Responsabilidad',
    desc: 'Cumplimos lo que prometemos: plazos, calidad y presupuesto acordado.',
  },
  {
    title: 'Precisión',
    desc: 'Cada detalle importa. Nuestra meticulosidad se nota en el resultado final.',
  },
  {
    title: 'Transparencia',
    desc: 'Comunicación honesta durante todo el proceso, sin letra pequeña.',
  },
  {
    title: 'Seguridad',
    desc: 'La seguridad de trabajadores y clientes es innegociable en cada obra.',
  },
  {
    title: 'Sostenibilidad',
    desc: 'Materiales responsables y gestión eficiente de residuos en cada proyecto.',
  },
  {
    title: 'Equipo',
    desc: 'Trabajadores propios formados, motivados y comprometidos con la excelencia.',
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────

export const BENEFITS = [
  'Contrato indefinido y estabilidad laboral',
  'Formación continua y certificaciones',
  'Equipo joven y colaborativo',
  'Herramientas y materiales de primera',
  'Plan de carrera interno',
  'Seguro médico privado',
];
