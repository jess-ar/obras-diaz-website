import { useState, useEffect } from "react";
import logoSrc from "../assets/logos/logo-obras-diaz.jpg";
import {
  Menu, X, ChevronDown, ChevronLeft, ChevronRight,
  ArrowRight, Mail, MapPin, Instagram, Linkedin, Facebook,
  Upload, CheckCircle, AlertCircle, Filter,
  Building2, HardHat, Wrench, Home, Layers, BarChart3,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "inicio" | "nosotros" | "galeria" | "trabaja" | "contacto" | "presupuesto" | "baja" | "privacidad" | "cookies" | "legal";

// ─── Logo SVG ─────────────────────────────────────────────────────────────────
// Faithful recreation of the OD monogram: black O ring + gray D shape

function LogoFull({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <img
      src={logoSrc}
      alt="Obras Díaz 2011, S.L. — logotipo"
      className="h-10 w-auto"
      style={
        variant === "light"
          ? { filter: "invert(1)", mixBlendMode: "screen" }
          : { mixBlendMode: "multiply" }
      }
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: Wrench,    title: "Reformas integrales",   desc: "Renovación completa de viviendas y locales: estructura, instalaciones, acabados. Un único equipo de principio a fin." },
  { icon: Home,      title: "Cocinas y baños",       desc: "Especialistas en la reforma de cocinas y cuartos de baño. Materiales de calidad, instalaciones al día y plazos cumplidos." },
  { icon: Layers,    title: "Salones y dormitorios", desc: "Transformamos salones, dormitorios y zonas de estar con criterio estético y funcionalidad real." },
  { icon: Building2, title: "Locales comerciales",   desc: "Adecuamos locales a la normativa vigente y los convertimos en espacios atractivos y operativos." },
  { icon: HardHat,   title: "Oficinas y despachos",  desc: "Reformas de oficinas y despachos profesionales, con atención especial al confort acústico y la imagen corporativa." },
  { icon: BarChart3, title: "Gestión y dirección",   desc: "Coordinamos todos los gremios, gestionamos permisos y hacemos seguimiento continuo para que no tengas que preocuparte de nada." },
];

const PROJECTS = [
  { img: "photo-1628744876525-f2678d8af47f", name: "Reforma integral piso Salamanca",   type: "Reforma integral",   location: "Barcelona", year: "2024" },
  { img: "photo-1762810931790-40b25e10b3e7", name: "Cocina abierta — Eixample",         type: "Reforma de cocina",  location: "Barcelona", year: "2024" },
  { img: "photo-1661107259637-4e1c55462428", name: "Baño suite — Hotel Palacio",        type: "Reforma de baño",    location: "Barcelona", year: "2023" },
  { img: "photo-1666037805138-f227944ed8d7", name: "Salón con chimenea — Sant Cugat",   type: "Reforma de salón",   location: "Sant Cugat",year: "2023" },
  { img: "photo-1552242718-c5360894aecd",    name: "Oficina boutique — Paseo de Gracia", type: "Reforma de oficina", location: "Barcelona", year: "2022" },
  { img: "photo-1715985160053-d339e8b6eb94", name: "Cocina y comedor — Sarrià",         type: "Reforma integral",   location: "Barcelona", year: "2022" },
];

const STATS = [
  { value: "14+", label: "Años de experiencia" },
  { value: "320+", label: "Proyectos realizados" },
  { value: "280+", label: "Clientes satisfechos" },
];

const PROCESS = [
  { num: "01", title: "Primera toma de contacto", desc: "Nos reunimos para conocer tu proyecto, necesidades y expectativas." },
  { num: "02", title: "Evaluación del proyecto",  desc: "Nuestros técnicos estudian la viabilidad, plazos y condicionantes de la obra." },
  { num: "03", title: "Presupuesto detallado",    desc: "Elaboramos un presupuesto transparente, desglosado por partidas." },
  { num: "04", title: "Planificación",            desc: "Organizamos equipos, materiales y calendario de obra con precisión milimétrica." },
  { num: "05", title: "Ejecución",                desc: "Llevamos a cabo los trabajos con supervisión continua y reportes periódicos." },
  { num: "06", title: "Entrega y seguimiento",    desc: "Entregamos la obra terminada y realizamos seguimiento post-obra." },
];

const FAQS = [
  { q: "¿Qué tipo de reformas realizáis?",              a: "Reformas integrales de pisos, cocinas, baños, salones y dormitorios. También reformamos locales comerciales, oficinas y despachos profesionales. Si tienes dudas sobre si tu proyecto encaja, llámanos y te informamos." },
  { q: "¿Trabajáis con particulares y empresas?",       a: "Sí. Trabajamos tanto con particulares que quieren reformar su vivienda como con empresas que necesitan acondicionar un local u oficina. Adaptamos el proceso y la comunicación a cada tipo de cliente." },
  { q: "¿Cómo funciona el presupuesto?",                a: "Contactas con nosotros, hacemos una visita gratuita al inmueble y en 48–72 horas tienes un presupuesto detallado por partidas, sin letra pequeña ni costes ocultos." },
  { q: "¿En qué zonas trabajáis?",                     a: "Principalmente en Barcelona ciudad y el área metropolitana: L'Hospitalet, Badalona, Cornellà, Sant Cugat, Castelldefels, Gavà, Terrassa y alrededores. También valoramos proyectos fuera del área según el encargo." },
  { q: "¿Cuánto tarda una reforma integral de piso?",  a: "Depende del estado del inmueble y los metros cuadrados, pero una reforma integral de piso de 80–100 m² suele llevarse entre 2 y 4 meses. Siempre entregamos un calendario de obra antes de empezar." },
  { q: "¿Qué pasa si surgen imprevistos en obra?",     a: "Te avisamos de inmediato, te explicamos las opciones y nunca ejecutamos ningún cambio sin tu aprobación. Nuestro precio cierra el presupuesto acordado: los imprevistos no te llegan como sorpresa al final." },
];

const GALLERY_CATS = ["Todos", "Viviendas", "Cocinas", "Baños", "Salones", "Oficinas", "Locales"];

const GALLERY = [
  { img: "photo-1705321963943-de94bb3f0dd3", name: "Reforma integral — Eixample",        cat: "Viviendas", location: "Barcelona" },
  { img: "photo-1628744876525-f2678d8af47f", name: "Piso completo — Gràcia",             cat: "Viviendas", location: "Barcelona" },
  { img: "photo-1762810931790-40b25e10b3e7", name: "Cocina oscura — Sarrià",             cat: "Cocinas",   location: "Barcelona" },
  { img: "photo-1715985160053-d339e8b6eb94", name: "Cocina abierta — Sant Cugat",        cat: "Cocinas",   location: "Sant Cugat" },
  { img: "photo-1759691554646-8155da2172ee", name: "Cocina con isla — Loft Poblenou",    cat: "Cocinas",   location: "Barcelona" },
  { img: "photo-1661107259637-4e1c55462428", name: "Baño suite — Hotel Eixample",        cat: "Baños",     location: "Barcelona" },
  { img: "photo-1628602813485-4e8b09442e98", name: "Baño spa — Vivienda particular",     cat: "Baños",     location: "Castelldefels" },
  { img: "photo-1635247049694-0269c357ab69", name: "Baño completo — Reforma integral",   cat: "Baños",     location: "Badalona" },
  { img: "photo-1666037805138-f227944ed8d7", name: "Salón con chimenea — Sant Cugat",    cat: "Salones",   location: "Sant Cugat" },
  { img: "photo-1666001379694-4c823ec58810", name: "Salón diáfano — Diagonal",           cat: "Salones",   location: "Barcelona" },
  { img: "photo-1552242718-c5360894aecd",    name: "Oficina boutique — Paseo de Gracia", cat: "Oficinas",  location: "Barcelona" },
  { img: "photo-1761986757577-140af8859587", name: "En ejecución — Poble Sec",           cat: "Locales",   location: "Barcelona" },
];

const JOBS = [
  {
    title: "Jefe de Obra",
    dept: "Producción", location: "Barcelona", type: "Jornada completa",
    desc: "Buscamos un Jefe de Obra con experiencia en reformas integrales de viviendas y locales en Barcelona y área metropolitana. Serás el responsable de planificar, coordinar y supervisar los trabajos de principio a fin, garantizando plazos, calidad y seguridad en cada proyecto.",
    req: [
      "FP Superior en Edificación, Arquitectura Técnica o similar",
      "Mínimo 5 años de experiencia en obras de reforma",
      "Capacidad de gestión de equipos y subcontratas",
      "Conocimiento de normativa urbanística y de seguridad en Cataluña",
      "Carnet de conducir B",
    ],
    offer: [
      "Contrato indefinido con período de prueba",
      "Vehículo de empresa para desplazamientos",
      "Herramientas y materiales propios de la empresa",
      "Plan de carrera y formación continua",
      "Seguro médico privado",
    ],
  },
  {
    title: "Oficial 1ª Albañilería",
    dept: "Ejecución", location: "Barcelona", type: "Jornada completa",
    desc: "Necesitamos un Oficial de 1ª en albañilería para incorporarse a nuestros equipos de obra en reformas de viviendas y locales en Barcelona. Trabajarás junto a un equipo experimentado y con material y EPI de primera calidad.",
    req: [
      "Experiencia mínima de 3 años como oficial de albañilería",
      "Dominio de tabiquería, revestimientos, solados y alicatados",
      "Capacidad de lectura de planos",
      "Actitud responsable y orientación a la calidad",
      "Carnet de conducir valorable",
    ],
    offer: [
      "Contrato indefinido",
      "Material y EPI proporcionados por la empresa",
      "Formación en nuevas técnicas y sistemas constructivos",
      "Buen ambiente de trabajo y equipo estable",
      "Salario según convenio + incentivos por productividad",
    ],
  },
  {
    title: "Técnico PRL",
    dept: "Prevención", location: "Barcelona / Remoto parcial", type: "Jornada completa",
    desc: "Incorporamos un Técnico de Prevención de Riesgos Laborales para supervisar y garantizar la seguridad en todas nuestras obras activas. Podrás desarrollar parte del trabajo en remoto, con visitas periódicas a obra.",
    req: [
      "Titulación de Técnico Superior en PRL (tres especialidades valorable)",
      "Experiencia mínima de 2 años en el sector de la construcción",
      "Conocimiento actualizado de la normativa vigente (Ley 31/1995, RD 1627/1997)",
      "Capacidad de redacción de planes de seguridad y evaluaciones de riesgo",
      "Habilidades de comunicación y resolución de conflictos en obra",
    ],
    offer: [
      "Contrato indefinido",
      "Flexibilidad de teletrabajo parcial",
      "Vehículo de empresa para visitas a obra",
      "Formación continua y actualización normativa",
      "Integración en un equipo comprometido con la seguridad",
    ],
  },
  {
    title: "Administrativo/a de Obra",
    dept: "Administración", location: "Barcelona", type: "Jornada completa",
    desc: "Buscamos un perfil administrativo con experiencia o interés en el sector de la construcción para dar soporte a la gestión documental y económica de nuestras obras: presupuestos, albaranes, facturas, comunicación con proveedores y clientes.",
    req: [
      "Formación en Administración y Finanzas, Gestión o similar",
      "Experiencia mínima de 1 año en puesto similar (sector construcción valorable)",
      "Manejo fluido de herramientas ofimáticas (Excel, Word, correo)",
      "Organización, atención al detalle y capacidad de gestión de múltiples tareas",
      "Catalán y castellano a nivel nativo o avanzado",
    ],
    offer: [
      "Contrato indefinido",
      "Horario de oficina estable (lunes a viernes)",
      "Integración en un equipo pequeño y dinámico",
      "Formación interna en procesos y herramientas de la empresa",
      "Posibilidades de crecimiento interno",
    ],
  },
];

const VALUES = [
  { title: "Responsabilidad", desc: "Cumplimos lo que prometemos: plazos, calidad y presupuesto acordado." },
  { title: "Precisión",       desc: "Cada detalle importa. Nuestra meticulosidad se nota en el resultado final." },
  { title: "Transparencia",   desc: "Comunicación honesta durante todo el proceso, sin letra pequeña." },
  { title: "Seguridad",       desc: "La seguridad de trabajadores y clientes es innegociable en cada obra." },
  { title: "Sostenibilidad",  desc: "Materiales responsables y gestión eficiente de residuos en cada proyecto." },
  { title: "Equipo",          desc: "Trabajadores propios formados, motivados y comprometidos con la excelencia." },
];

const BENEFITS = [
  "Contrato indefinido y estabilidad laboral",
  "Formación continua y certificaciones",
  "Equipo joven y colaborativo",
  "Herramientas y materiales de primera",
  "Plan de carrera interno",
  "Seguro médico privado",
];

// ─── Design tokens (accent gray) ─────────────────────────────────────────────
const AC  = "#6E6E6E"; // accent gray — default
const ACH = "#4A4A4A"; // accent gray — hover
const ACR = "#333333"; // accent gray — active/ring

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-8" style={{ background: AC }} />
      <span className="text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: AC }}>
        {children}
      </span>
    </div>
  );
}

function BtnPrimary({ children, onClick, type = "button", full = false }: {
  children: React.ReactNode; onClick?: () => void; type?: "button" | "submit"; full?: boolean;
}) {
  return (
    <button
      type={type} onClick={onClick}
      style={{ background: AC }}
      className={`${full ? "w-full" : ""} px-8 py-4 text-white text-sm font-semibold tracking-widest uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      onMouseEnter={e => (e.currentTarget.style.background = ACH)}
      onMouseLeave={e => (e.currentTarget.style.background = AC)}
      onFocus={e => (e.currentTarget.style.outlineColor = ACR)}
    >
      {children}
    </button>
  );
}

function BtnOutline({ children, onClick, type = "button", full = false, dark = false }: {
  children: React.ReactNode; onClick?: () => void; type?: "button" | "submit"; full?: boolean; dark?: boolean;
}) {
  return (
    <button
      type={type} onClick={onClick}
      style={{ outlineColor: ACR }}
      className={`${full ? "w-full" : ""} px-8 py-4 border text-sm font-semibold tracking-widest uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        dark
          ? "border-white/40 text-white hover:border-white hover:bg-white/5"
          : "border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
      <AlertCircle size={11} aria-hidden="true" /> {msg}
    </p>
  );
}

function InputField({ label, id, required, error, type = "text", placeholder, value, onChange }: {
  label: string; id: string; required?: boolean; error?: string;
  type?: string; placeholder?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2">
        {label}{required && " *"}
      </label>
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        aria-describedby={error ? `${id}-err` : undefined}
        aria-invalid={!!error}
        className={`w-full border px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#C0C0C0] bg-white focus:outline-none transition-colors hover:border-[#999999] ${error ? "border-red-500" : "border-[#E0E0E0]"}`}
        style={{ ["--tw-ring-color" as string]: ACR }}
        onFocus={e => { e.currentTarget.style.outline = `2px solid ${ACR}`; e.currentTarget.style.outlineOffset = "2px"; }}
        onBlur={e => { e.currentTarget.style.outline = ""; }}
      />
      <span id={`${id}-err`}><FieldError msg={error} /></span>
    </div>
  );
}

function SelectField({ label, id, required, error, value, onChange, children }: {
  label: string; id: string; required?: boolean; error?: string;
  value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2">
        {label}{required && " *"}
      </label>
      <select
        id={id} value={value} onChange={e => onChange(e.target.value)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full border px-4 py-3 text-sm text-[#0A0A0A] bg-white focus:outline-none transition-colors hover:border-[#999999] ${error ? "border-red-500" : "border-[#E0E0E0]"}`}
        onFocus={e => { e.currentTarget.style.outline = `2px solid ${ACR}`; e.currentTarget.style.outlineOffset = "2px"; }}
        onBlur={e => { e.currentTarget.style.outline = ""; }}
      >
        {children}
      </select>
      <span id={`${id}-err`}><FieldError msg={error} /></span>
    </div>
  );
}

function InteriorHero({ title, subtitle, img }: { title: string; subtitle?: string; img: string }) {
  return (
    <div className="relative h-[42vh] min-h-[320px] flex items-end bg-[#1A1A1A] overflow-hidden">
      <img
        src={`https://images.unsplash.com/${img}?w=1440&h=640&fit=crop&auto=format`}
        alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 pb-12 pt-28 w-full">
        <div className="text-[10px] tracking-[0.35em] uppercase mb-3 font-semibold" style={{ color: AC }}>
          Obras Díaz 2011, S.L.
        </div>
        <h1 className="font-display text-5xl lg:text-7xl font-black uppercase text-white leading-none tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-white/65 text-base max-w-xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}

function CtaBanner({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="bg-[#0A0A0A] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel>Siguiente paso</SectionLabel>
          <h2 className="font-display text-4xl lg:text-6xl font-black uppercase text-white leading-none tracking-tight mb-6">
            ¿Tienes un proyecto<br />en mente?
          </h2>
          <p className="text-white/55 text-lg mb-10 max-w-xl leading-relaxed">
            Cuéntanos qué necesitas. Analizamos tu proyecto y te enviamos presupuesto gratuito y detallado.
          </p>
          <div className="flex flex-wrap gap-4">
            <BtnPrimary onClick={() => setPage("presupuesto")}>Pedir presupuesto</BtnPrimary>
            <BtnOutline dark onClick={() => setPage("galeria")}>Ver proyectos</BtnOutline>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[#E5E5E5]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-display text-lg font-bold uppercase tracking-wide text-[#0A0A0A] pr-8 leading-snug group-hover:opacity-60 transition-opacity">
              {item.q}
            </span>
            <ChevronDown
              size={18} aria-hidden="true"
              className={`shrink-0 text-[#666666] transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="pb-6 text-[#555555] leading-relaxed text-[15px]">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ current, setPage }: { current: Page; setPage: (p: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const isHero = current === "inicio";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const onDark  = isHero && !scrolled;
  const headerBg = scrolled ? "bg-white border-b border-[#E5E5E5] shadow-sm" : "bg-transparent";

  const nav = [
    { id: "inicio",   label: "Inicio" },
    { id: "nosotros", label: "Sobre nosotros" },
    { id: "galeria",  label: "Galería" },
    { id: "trabaja",  label: "Trabaja con nosotros" },
    { id: "contacto", label: "Contacto" },
  ];

  const go = (p: Page) => { setPage(p); setMobileOpen(false); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <button
          onClick={() => go("inicio")}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          style={{ outlineColor: ACR }}
          aria-label="Obras Díaz 2011 — ir al inicio"
        >
          <LogoFull variant={onDark ? "light" : "dark"} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id as Page)}
              className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:opacity-50 ${
                current === item.id ? "border-b border-current pb-0.5" : ""
              } ${onDark ? "text-white" : "text-[#0A0A0A]"}`}
            >
              {item.label}
            </button>
          ))}
          <BtnPrimary onClick={() => go("presupuesto")}>Pedir presupuesto</BtnPrimary>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 -mr-2 ${onDark ? "text-white" : "text-[#0A0A0A]"}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E5E5]" role="navigation" aria-label="Menú móvil">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id as Page)}
              className={`w-full text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] border-b border-[#F0F0F0] hover:bg-[#F8F8F8] transition-colors ${
                current === item.id ? "text-[#6E6E6E]" : "text-[#0A0A0A]"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="px-6 py-5">
            <BtnPrimary onClick={() => go("presupuesto")} full>Pedir presupuesto</BtnPrimary>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <div className="mb-6">
              <LogoFull variant="light" />
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed mb-6">
              Más de 14 años construyendo espacios pensados para durar. Calidad, compromiso y profesionalidad en cada proyecto.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/obrasdiaz2011sl"
                target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram de Obras Díaz 2011"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/obrasdiaz2011sl"
                target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook de Obras Díaz 2011"
              >
                <Facebook size={18} />
              </a>
              <span className="text-white/25 cursor-not-allowed" title="LinkedIn — próximamente" aria-label="LinkedIn — próximamente">
                <Linkedin size={18} />
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/55 mb-6">Contacto</h3>
            <ul className="space-y-4 text-[13px] text-white/60">
              <li className="flex items-start gap-3"><Mail  size={13} className="mt-0.5 shrink-0" style={{ color: AC }} /> info@obrasdiaz2011.es</li>
              <li className="flex items-start gap-3"><MapPin size={13} className="mt-0.5 shrink-0" style={{ color: AC }} /> Barcelona y alrededores</li>
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/55 mb-6">Navegación</h3>
            <ul className="space-y-3 text-[13px]">
              {(["inicio","nosotros","galeria","trabaja","contacto","presupuesto"] as Page[]).map((id, i) => (
                <li key={id}><button onClick={() => setPage(id)} className="text-white/60 hover:text-white transition-colors">
                  {["Inicio","Sobre nosotros","Galería de reformas","Trabaja con nosotros","Contacto","Pedir presupuesto"][i]}
                </button></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/55 mb-6">Legal</h3>
            <ul className="space-y-3 text-[13px]">
              <li><button onClick={() => setPage("privacidad")} className="text-white/60 hover:text-white transition-colors">Política de privacidad</button></li>
              <li><button onClick={() => setPage("cookies")} className="text-white/60 hover:text-white transition-colors">Política de cookies</button></li>
              <li><button onClick={() => setPage("legal")} className="text-white/60 hover:text-white transition-colors">Aviso legal</button></li>
              <li><button onClick={() => setPage("baja")} className="text-white/60 hover:text-white transition-colors">Darse de baja</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/50">© {new Date().getFullYear()} Obras Díaz 2011, S.L. Todos los derechos reservados.</p>
          <p className="text-[11px] text-white/50">CIF: B-XXXXXXXX · Registro Mercantil de Barcelona</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] flex items-end bg-[#0A0A0A] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1762810931790-40b25e10b3e7?w=1920&h=1080&fit=crop&auto=format"
          alt="Cocina reformada por Obras Díaz 2011"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 lg:pb-28 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-white/50" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/70">Desde 2011</span>
            </div>
            <h1 className="font-display text-6xl lg:text-[88px] font-black uppercase text-white leading-none tracking-tight mb-6">
              Tu reforma,<br />bien hecha.<br />Punto.
            </h1>
            <p className="text-white/65 text-lg mb-10 max-w-lg leading-relaxed">
              Reformas integrales de viviendas, cocinas, baños y locales en Barcelona y alrededores. Más de 14 años, equipo propio y presupuesto cerrado desde el primer día.
            </p>
            <div className="flex flex-wrap gap-4">
              <BtnPrimary onClick={() => setPage("presupuesto")}>Pedir presupuesto</BtnPrimary>
              <BtnOutline dark onClick={() => setPage("galeria")}>Ver proyectos</BtnOutline>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-white" />
          <span className="text-white text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        </div>
      </section>

      {/* Presentación */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <SectionLabel>Quiénes somos</SectionLabel>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
                Una empresa de construcción con vocación de permanencia.
              </h2>
            </div>
            <div>
              <p className="text-[#555555] text-[17px] leading-relaxed mb-5">
                Obras Díaz 2011, S.L. nació con un propósito claro: hacer bien las cosas, desde el primer clavo hasta la última pincelada. Con sede en Barcelona, llevamos más de una década ejecutando reformas de viviendas, cocinas, baños y locales en toda el área metropolitana.
              </p>
              <p className="text-[#666666] leading-relaxed mb-8 text-[15px]">
                Trabajamos con equipo propio, materiales seleccionados y una cultura de trabajo basada en la responsabilidad, la puntualidad y el rigor técnico.
              </p>
              <button
                onClick={() => setPage("nosotros")}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] hover:opacity-50 transition-opacity group"
              >
                Conoce nuestra historia
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-[#F5F5F5] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <SectionLabel>Lo que hacemos</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
              Servicios
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E0E0E0]">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={i} className="bg-white p-8 lg:p-10 group hover:bg-[#0A0A0A] transition-colors duration-300 cursor-default">
                  <Icon size={26} className="mb-6" style={{ color: AC }} aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#0A0A0A] group-hover:text-white mb-3 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-[#666666] group-hover:text-white/55 leading-relaxed transition-colors">{s.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionLabel>Nuestro trabajo</SectionLabel>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
                Proyectos destacados
              </h2>
            </div>
            <button
              onClick={() => setPage("galeria")}
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] hover:opacity-50 transition-opacity group shrink-0"
            >
              Ver todos <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <article
                key={i}
                className="group cursor-pointer"
                onClick={() => setPage("galeria")}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setPage("galeria")}
                aria-label={`Ver proyecto: ${p.name}`}
              >
                <div className="relative overflow-hidden bg-[#1A1A1A] aspect-[4/3] mb-4">
                  <img
                    src={`https://images.unsplash.com/${p.img}?w=600&h=450&fit=crop&auto=format`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0A0A0A]/80 text-white text-[10px] font-medium px-2.5 py-1 uppercase tracking-wider">{p.type}</span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-1 leading-tight">{p.name}</h3>
                    <p className="text-[11px] text-[#666666] uppercase tracking-widest">{p.location} · {p.year}</p>
                  </div>
                  <ArrowRight size={14} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: AC }} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            {STATS.map((s, i) => (
              <div key={i} className="border-l border-white/10 pl-6 lg:pl-10">
                <div className="font-display text-5xl lg:text-7xl font-black text-white mb-2">{s.value}</div>
                <div className="text-white/60 text-[11px] uppercase tracking-[0.25em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-[#F5F5F5] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <SectionLabel>Cómo trabajamos</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">Proceso de trabajo</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {PROCESS.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="font-display text-5xl font-black text-[#BBBBBB] leading-none shrink-0 select-none" aria-hidden="true">{step.num}</div>
                <div className="pt-1">
                  <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-2 leading-tight">{step.title}</h3>
                  <p className="text-[13px] text-[#666666] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <SectionLabel>Preguntas frecuentes</SectionLabel>
              <h2 className="font-display text-4xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-5">Resolvemos tus dudas</h2>
              <p className="text-[#666666] leading-relaxed text-[15px] mb-8">
                Si no encuentras lo que buscas, contacta directamente con nuestro equipo y te atendemos en menos de 24 horas.
              </p>
              <BtnPrimary onClick={() => setPage("contacto")}>Contactar ahora</BtnPrimary>
            </div>
            <div className="lg:col-span-3">
              <FaqAccordion items={FAQS} />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner setPage={setPage} />
    </>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const certs = [
    "ISO 9001:2015 · Gestión de calidad",
    "ISO 14001:2015 · Gestión ambiental",
    "ISO 45001:2018 · Seguridad y salud",
    "Registro REA nº 28-XXXXX",
  ];

  return (
    <>
      <InteriorHero
        title="Sobre nosotros"
        subtitle="Conoce la empresa, el equipo y la filosofía detrás de cada reforma."
        img="photo-1666037805138-f227944ed8d7"
      />

      {/* Historia */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <SectionLabel>Nuestra historia</SectionLabel>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-8">
                Desde 2011 construyendo con propósito.
              </h2>
              <div className="space-y-5 text-[#555555] leading-relaxed text-[15px]">
                <p>Obras Díaz 2011, S.L. fue fundada en Barcelona con un objetivo sencillo pero ambicioso: hacer reformas de calidad, con honestidad y sin atajos.</p>
                <p>Empezamos con un pequeño equipo de profesionales con amplia experiencia. Con los años, hemos crecido de forma orgánica manteniendo el control de calidad que nos distingue.</p>
                <p>Hoy contamos con maquinaria propia y hemos ejecutado más de 320 proyectos en Barcelona y alrededores. Pero seguimos trabajando como el primer día: con dedicación, rigor y cercanía.</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1628744876525-f2678d8af47f?w=700&h=900&fit=crop&auto=format"
                alt="Salón reformado por Obras Díaz 2011"
                className="w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-[#0A0A0A] p-8">
                <div className="font-display text-6xl font-black text-white leading-none">14+</div>
                <div className="text-white/65 text-[10px] uppercase tracking-[0.3em] mt-2">Años de historia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-[#F5F5F5] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <SectionLabel>Lo que nos define</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">Valores</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E0E0E0]">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white p-8 lg:p-10">
                <div className="font-display text-4xl font-black text-[#BBBBBB] mb-5 leading-none select-none" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">{v.title}</h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              { label: "Misión", text: '"Ejecutar proyectos de construcción y reforma con los más altos estándares de calidad, respetando los plazos y el presupuesto acordado, para generar valor duradero a nuestros clientes."' },
              { label: "Visión", text: '"Ser la empresa de construcción de referencia en España, reconocida por la fiabilidad de sus obras, la satisfacción de sus clientes y el bienestar de su equipo humano."' },
            ].map(item => (
              <div key={item.label} className="border border-white/10 p-10 lg:p-14">
                <div className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-6" style={{ color: AC }}>{item.label}</div>
                <p className="text-white text-xl lg:text-2xl leading-relaxed font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seguridad · Calidad · Sostenibilidad */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              { label: "Seguridad",      title: "Primero las personas",    text: "Nuestros técnicos de PRL supervisan cada fase. Todos los trabajadores reciben formación continua y disponemos de los EPIs más actualizados. Cero accidentes graves en los últimos 5 años." },
              { label: "Calidad",        title: "Certificados y controlados", text: "Sistema de gestión de calidad ISO 9001:2015. Controles en obra en todas las fases y entrega de cada trabajo con documentación técnica completa." },
              { label: "Sostenibilidad", title: "Obra responsable",         text: "Gestionamos residuos conforme a la legislación, priorizamos materiales con ecoetiqueta y minimizamos el impacto ambiental. Certificados ISO 14001." },
            ].map((item, i) => (
              <div key={i}>
                <SectionLabel>{item.label}</SectionLabel>
                <h3 className="font-display text-2xl font-black uppercase text-[#0A0A0A] tracking-wide mb-4">{item.title}</h3>
                <p className="text-[#555555] leading-relaxed text-[15px]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="bg-[#F5F5F5] py-10 border-y border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
            <div className="text-[10px] font-semibold tracking-[0.3em] uppercase shrink-0" style={{ color: AC }}>Certificaciones</div>
            <div className="flex flex-wrap gap-3">
              {certs.map((c, i) => (
                <span key={i} className="text-[11px] font-medium uppercase tracking-wide text-[#555555] border border-[#D5D5D5] px-4 py-2 bg-white">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner setPage={setPage} />
    </>
  );
}

// ─── GALLERY PAGE ──────────────────────────────────────────────────────────────

function GalleryPage() {
  const [activeCat, setActiveCat] = useState("Todos");
  const [lightbox, setLightbox]   = useState<number | null>(null);

  const filtered = activeCat === "Todos" ? GALLERY : GALLERY.filter(g => g.cat === activeCat);

  const close = () => setLightbox(null);
  const prev  = () => setLightbox(i => i !== null ? (i === 0 ? filtered.length - 1 : i - 1) : null);
  const next  = () => setLightbox(i => i !== null ? (i === filtered.length - 1 ? 0 : i + 1) : null);

  useEffect(() => {
    if (lightbox === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, filtered.length]);

  return (
    <>
      <InteriorHero
        title="Galería de reformas"
        subtitle="Una selección de reformas ejecutadas en Barcelona y alrededores. Cada imagen habla por sí sola."
        img="photo-1705321963943-de94bb3f0dd3"
      />

      {/* Filtros */}
      <div className="bg-white border-b border-[#E5E5E5] sticky top-16 lg:top-20 z-30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Filter size={13} className="shrink-0 text-[#666666]" aria-hidden="true" />
            {GALLERY_CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`shrink-0 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  activeCat === cat
                    ? "text-white"
                    : "border border-[#E0E0E0] text-[#555555] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
                }`}
                style={activeCat === cat ? { background: AC } : {}}
                aria-pressed={activeCat === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-[#F5F5F5] py-12 lg:py-16 min-h-[50vh]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-28">
              <p className="font-display text-2xl uppercase text-[#888888]">Sin proyectos en esta categoría</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {filtered.map((item, i) => (
                <button
                  key={`${item.img}-${i}`}
                  className="group relative overflow-hidden bg-[#1A1A1A] aspect-square focus-visible:outline focus-visible:outline-2"
                  style={{ outlineColor: ACR }}
                  onClick={() => setLightbox(i)}
                  aria-label={`Ampliar imagen: ${item.name}`}
                >
                  <img
                    src={`https://images.unsplash.com/${item.img}?w=500&h=500&fit=crop&auto=format`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-4">
                    <div className="translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-left">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: AC }}>{item.cat}</span>
                      <p className="text-white font-display font-bold uppercase text-sm leading-tight">{item.name}</p>
                      <p className="text-white/55 text-[11px]">{item.location}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/96 z-50 flex items-center justify-center"
          role="dialog" aria-modal="true" aria-label="Vista ampliada de imagen"
          onClick={close}
        >
          <button onClick={e => { e.stopPropagation(); close(); }} className="absolute top-5 right-5 text-white/50 hover:text-white p-2" aria-label="Cerrar">
            <X size={22} />
          </button>
          <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 lg:left-8 text-white/50 hover:text-white p-3" aria-label="Imagen anterior">
            <ChevronLeft size={30} />
          </button>
          <div className="max-w-5xl w-full mx-16 lg:mx-24" onClick={e => e.stopPropagation()}>
            <img
              src={`https://images.unsplash.com/${filtered[lightbox].img}?w=1200&h=800&fit=crop&auto=format`}
              alt={filtered[lightbox].name}
              className="w-full object-cover max-h-[75vh]"
            />
            <div className="flex items-center justify-between mt-4 px-1">
              <div>
                <p className="text-white font-display font-bold uppercase tracking-wide">{filtered[lightbox].name}</p>
                <p className="text-white/60 text-[11px] uppercase tracking-[0.2em] mt-0.5">{filtered[lightbox].cat} · {filtered[lightbox].location}</p>
              </div>
              <p className="text-white/50 text-sm tabular-nums">{lightbox + 1} / {filtered.length}</p>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 lg:right-8 text-white/50 hover:text-white p-3" aria-label="Imagen siguiente">
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </>
  );
}

// ─── CAREERS PAGE ──────────────────────────────────────────────────────────────

type Job = (typeof JOBS)[number];

function JobModal({ job, onClose, onApply }: { job: Job; onClose: () => void; onApply: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 lg:p-8"
      role="dialog" aria-modal="true" aria-label={job.title}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A0A0A] px-8 py-7 flex items-start justify-between gap-6">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: AC }}>
              {job.dept} · {job.location}
            </div>
            <h2 className="font-display text-3xl font-black uppercase text-white leading-tight">{job.title}</h2>
            <div className="text-white/55 text-[12px] uppercase tracking-widest mt-2">{job.type}</div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors shrink-0 mt-1" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-8">
          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">Descripción del puesto</h3>
            <p className="text-[15px] text-[#555555] leading-relaxed">{job.desc}</p>
          </div>

          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">Requisitos</h3>
            <ul className="space-y-2">
              {job.req.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-[#555555]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#6E6E6E] shrink-0" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">Qué ofrecemos</h3>
            <ul className="space-y-2">
              {job.offer.map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-[#555555]">
                  <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: AC }} aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#F0F0F0] pt-6 flex flex-wrap gap-3">
            <BtnPrimary onClick={onApply}>Enviar candidatura</BtnPrimary>
            <BtnOutline onClick={onClose}>Cerrar</BtnOutline>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareersPage() {
  const [activeJob, setActiveJob]   = useState<Job | null>(null);
  const [sent, setSent]             = useState(false);
  const [fileName, setFileName]     = useState<string | null>(null);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [f, setF] = useState({ nombre: "", email: "", telefono: "", puesto: "", experiencia: "", mensaje: "", privacidad: false });

  const scrollToForm = (job?: Job) => {
    setActiveJob(null);
    if (job) setF(prev => ({ ...prev, puesto: job.title }));
    setTimeout(() => {
      document.getElementById("candidatura-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!f.email.trim() || !f.email.includes("@")) e.email = "Introduce un email válido";
    if (!f.privacidad) e.privacidad = "Debes aceptar la política de privacidad";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) setSent(true);
  };

  return (
    <>
      {activeJob && (
        <JobModal
          job={activeJob}
          onClose={() => setActiveJob(null)}
          onApply={() => scrollToForm(activeJob)}
        />
      )}
      <InteriorHero
        title="Trabaja con nosotros"
        subtitle="Buscamos profesionales con ganas de hacer bien las reformas y crecer con nosotros."
        img="photo-1628744876525-f2678d8af47f"
      />

      {/* Cultura + Beneficios */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <SectionLabel>Nuestra cultura</SectionLabel>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-6">
                Un equipo en el que crecer.
              </h2>
              <p className="text-[#555555] leading-relaxed mb-4 text-[15px]">
                En Obras Díaz 2011 creemos que el mejor activo de una constructora son sus personas. Invertimos en formación, seguridad y bienestar de cada miembro del equipo.
              </p>
              <p className="text-[#666666] leading-relaxed text-[15px]">
                Somos un equipo diverso que comparte un mismo estándar de calidad y un orgullo por el trabajo bien hecho.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-[#EBEBEB]">
                  <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: AC }} aria-hidden="true" />
                  <span className="text-[13px] text-[#0A0A0A] leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ofertas */}
      <section className="bg-[#F5F5F5] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <SectionLabel>Ofertas actuales</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
              Posiciones abiertas
            </h2>
          </div>
          <div className="space-y-px bg-[#E0E0E0]">
            {JOBS.map((job, i) => (
              <article key={i} className="bg-white p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F8F8] transition-colors">
                <div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-[#0A0A0A] mb-2">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#666666] uppercase tracking-wide">
                    <span>{job.dept}</span><span className="text-[#CCCCCC]">·</span>
                    <span>{job.location}</span><span className="text-[#CCCCCC]">·</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <BtnOutline onClick={() => setActiveJob(job)}>Ver oferta</BtnOutline>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario candidatura */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <SectionLabel>Candidatura espontánea</SectionLabel>
            <h2 className="font-display text-4xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-3">¿Tu especialidad no está en la lista?</h2>
            <p className="text-[#666666] mb-10 text-[15px]">Mándanos tu CV igualmente. Lo tenemos en cuenta para cuando haya una vacante que encaje con tu perfil.</p>

            {sent ? (
              <div id="candidatura-form" className="border border-[#BBDDC0] bg-[#F4FBF5] p-8 flex items-start gap-4" role="status">
                <CheckCircle size={22} className="text-[#3D9E52] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold uppercase text-[#0A0A0A] mb-2">Candidatura recibida</h3>
                  <p className="text-[#555555] text-[14px] leading-relaxed">Gracias por tu interés. Revisaremos tu perfil y te contactaremos si surge una oportunidad adecuada.</p>
                </div>
              </div>
            ) : (
              <form id="candidatura-form" onSubmit={submit} noValidate className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <InputField label="Nombre y apellidos" id="c-nombre" required error={errors.nombre} value={f.nombre} onChange={v => setF({...f, nombre: v})} placeholder="Carlos Martínez Ruiz" />
                  <InputField label="Correo electrónico" id="c-email" required type="email" error={errors.email} value={f.email} onChange={v => setF({...f, email: v})} placeholder="carlos@email.com" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <InputField label="Teléfono" id="c-tel" type="tel" value={f.telefono} onChange={v => setF({...f, telefono: v})} placeholder="+34 600 000 000" />
                  <InputField label="Puesto o especialidad" id="c-puesto" value={f.puesto} onChange={v => setF({...f, puesto: v})} placeholder="Jefe de Obra, Albañil..." />
                </div>
                <SelectField label="Años de experiencia" id="c-exp" value={f.experiencia} onChange={v => setF({...f, experiencia: v})}>
                  <option value="">Selecciona...</option>
                  <option>Menos de 1 año</option>
                  <option>1 – 3 años</option>
                  <option>3 – 5 años</option>
                  <option>5 – 10 años</option>
                  <option>Más de 10 años</option>
                </SelectField>
                <div>
                  <label htmlFor="c-msg" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2">Mensaje</label>
                  <textarea
                    id="c-msg" rows={4} value={f.mensaje}
                    onChange={e => setF({...f, mensaje: e.target.value})}
                    placeholder="Cuéntanos tu experiencia y motivación..."
                    className="w-full border border-[#E0E0E0] px-4 py-3 text-sm placeholder-[#C0C0C0] bg-white resize-none hover:border-[#999999] transition-colors"
                    onFocus={e => { e.currentTarget.style.outline = `2px solid ${ACR}`; e.currentTarget.style.outlineOffset = "2px"; }}
                    onBlur={e => { e.currentTarget.style.outline = ""; }}
                  />
                </div>
                {/* File upload */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2">Currículum (PDF, DOC)</p>
                  <label className="flex items-center gap-3 border border-dashed border-[#D0D0D0] px-4 py-4 cursor-pointer hover:border-[#6E6E6E] transition-colors">
                    <Upload size={15} className="text-[#666666] shrink-0" aria-hidden="true" />
                    <span className="text-[13px] text-[#666666]">{fileName ?? "Haz clic para adjuntar tu CV"}</span>
                    {fileName && <CheckCircle size={14} className="text-[#3D9E52] ml-auto shrink-0" />}
                    <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={e => { const file = e.target.files?.[0]; if (file) setFileName(file.name); }} aria-label="Subir currículum" />
                  </label>
                </div>
                {/* Privacy */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox" checked={f.privacidad}
                      onChange={e => setF({...f, privacidad: e.target.checked})}
                      className="mt-0.5"
                      style={{ accentColor: AC }}
                      aria-describedby={errors.privacidad ? "c-priv-err" : undefined}
                    />
                    <span className="text-[12px] text-[#555555] leading-relaxed">
                      He leído y acepto la <a href="#" className="underline hover:opacity-60">política de privacidad</a> de Obras Díaz 2011, S.L. *
                    </span>
                  </label>
                  <span id="c-priv-err"><FieldError msg={errors.privacidad} /></span>
                </div>
                <BtnPrimary type="submit">Enviar candidatura</BtnPrimary>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── CONTACT PAGE (dudas generales — formulario corto) ────────────────────────

function ContactPage({ setPage }: { setPage: (p: Page) => void }) {
  const [sent, setSent]     = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [f, setF] = useState({ nombre: "", email: "", telefono: "", mensaje: "", privacidad: false });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!f.email.trim() || !f.email.includes("@")) e.email = "Email no válido";
    if (!f.mensaje.trim()) e.mensaje = "El mensaje es obligatorio";
    if (!f.privacidad) e.privacidad = "Debes aceptar la política de privacidad";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) setSent(true);
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",    value: "info@obrasdiaz2011.es" },
    { icon: MapPin, label: "Zona",     value: "Barcelona y alrededores" },
  ];

  return (
    <>
      <InteriorHero
        title="Contacto"
        subtitle="¿Tienes alguna duda? Escríbenos o llámanos. Te respondemos en menos de 24 horas."
        img="photo-1666037805138-f227944ed8d7"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <SectionLabel>Estamos aquí</SectionLabel>
                <h2 className="font-display text-3xl lg:text-4xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight">
                  Resolvemos tus dudas
                </h2>
              </div>
              <ul className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex gap-4">
                      <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center shrink-0">
                        <Icon size={15} style={{ color: AC }} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666666] mb-1">{item.label}</p>
                        <p className="text-[14px] text-[#0A0A0A] whitespace-pre-line leading-relaxed">{item.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Redes sociales */}
              <div className="flex items-center gap-5">
                <a
                  href="https://www.instagram.com/obrasdiaz2011sl"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-[#0A0A0A] hover:opacity-50 transition-opacity"
                  aria-label="Instagram de Obras Díaz 2011"
                >
                  <Instagram size={16} style={{ color: AC }} /> @obrasdiaz2011sl
                </a>
                <a
                  href="https://www.facebook.com/obrasdiaz2011sl"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-[#0A0A0A] hover:opacity-50 transition-opacity"
                  aria-label="Facebook de Obras Díaz 2011"
                >
                  <Facebook size={16} style={{ color: AC }} /> Facebook
                </a>
                <span className="text-[#BBBBBB] cursor-not-allowed" title="LinkedIn — próximamente" aria-label="LinkedIn — próximamente">
                  <Linkedin size={16} />
                </span>
              </div>

              {/* CTA presupuesto */}
              <div className="border border-[#E5E5E5] p-6">
                <p className="text-[13px] font-semibold text-[#0A0A0A] mb-1">¿Quieres un presupuesto?</p>
                <p className="text-[12px] text-[#666666] mb-4 leading-relaxed">
                  Si lo que necesitas es un presupuesto para tu reforma, usa el formulario específico. Te pedimos cuatro datos y te respondemos lo antes posible.
                </p>
                <BtnPrimary onClick={() => setPage("presupuesto")}>Pedir presupuesto</BtnPrimary>
              </div>

              {/* Mapa OpenStreetMap — zona Barcelona */}
              <div className="border border-[#E5E5E5] overflow-hidden aspect-[4/3]">
                <iframe
                  title="Zona de actuación — Barcelona"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.05%2C41.32%2C2.28%2C41.48&layer=mapnik"
                  width="100%" height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  aria-label="Mapa de la zona de actuación: Barcelona y alrededores"
                />
              </div>
            </div>

            {/* Form corto */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="border border-[#BBDDC0] bg-[#F4FBF5] p-10 lg:p-14 flex flex-col items-center text-center" role="status">
                  <CheckCircle size={44} className="text-[#3D9E52] mb-5" />
                  <h3 className="font-display text-3xl font-black uppercase text-[#0A0A0A] mb-3">¡Mensaje recibido!</h3>
                  <p className="text-[#555555] max-w-sm text-[15px] leading-relaxed">
                    Te respondemos en menos de 24 horas en el correo que nos has indicado.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <SectionLabel>Formulario de contacto</SectionLabel>
                    <p className="text-[#666666] text-[14px] leading-relaxed">
                      Para dudas generales, consultas sobre proyectos en curso o cualquier otra cuestión. Si lo que necesitas es un presupuesto,{" "}
                      <button onClick={() => setPage("presupuesto")} className="underline text-[#0A0A0A] hover:opacity-50 transition-opacity">usa el formulario de presupuesto</button>.
                    </p>
                  </div>
                  <form onSubmit={submit} noValidate className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <InputField label="Nombre y apellidos" id="ct-nombre" required error={errors.nombre} value={f.nombre} onChange={v => setF({...f, nombre: v})} placeholder="Laura Puig" />
                      <InputField label="Correo electrónico" id="ct-email" required type="email" error={errors.email} value={f.email} onChange={v => setF({...f, email: v})} placeholder="laura@email.com" />
                    </div>
                    <InputField label="Teléfono (opcional)" id="ct-tel" type="tel" value={f.telefono} onChange={v => setF({...f, telefono: v})} placeholder="+34 600 000 000" />
                    <div>
                      <label htmlFor="ct-msg" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2">Mensaje *</label>
                      <textarea
                        id="ct-msg" rows={5} value={f.mensaje}
                        onChange={e => setF({...f, mensaje: e.target.value})}
                        placeholder="Cuéntanos tu duda o consulta..."
                        aria-describedby={errors.mensaje ? "ct-msg-err" : undefined}
                        aria-invalid={!!errors.mensaje}
                        className={`w-full border px-4 py-3 text-sm placeholder-[#C0C0C0] bg-white resize-none hover:border-[#999999] transition-colors ${errors.mensaje ? "border-red-500" : "border-[#E0E0E0]"}`}
                        onFocus={e => { e.currentTarget.style.outline = `2px solid ${ACR}`; e.currentTarget.style.outlineOffset = "2px"; }}
                        onBlur={e => { e.currentTarget.style.outline = ""; }}
                      />
                      <span id="ct-msg-err"><FieldError msg={errors.mensaje} /></span>
                    </div>
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={f.privacidad} onChange={e => setF({...f, privacidad: e.target.checked})} className="mt-0.5" style={{ accentColor: AC }} aria-describedby={errors.privacidad ? "ct-priv-err" : undefined} />
                        <span className="text-[12px] text-[#555555] leading-relaxed">
                          He leído y acepto la <a href="#" className="underline hover:opacity-60">política de privacidad</a> *
                        </span>
                      </label>
                      <span id="ct-priv-err"><FieldError msg={errors.privacidad} /></span>
                    </div>
                    <BtnPrimary type="submit">Enviar mensaje</BtnPrimary>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PRESUPUESTO PAGE (formulario completo de obra) ────────────────────────────

function PresupuestoPage() {
  const [sent, setSent]     = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [f, setF] = useState({
    nombre: "", email: "", telefono: "",
    tipoReforma: "", metros: "", estado: "",
    barrio: "", presupuesto: "", descripcion: "",
    privacidad: false,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!f.email.trim() || !f.email.includes("@")) e.email = "Email no válido";
    if (!f.tipoReforma) e.tipoReforma = "Selecciona el tipo de reforma";
    if (!f.descripcion.trim()) e.descripcion = "Cuéntanos algo sobre la reforma";
    if (!f.privacidad) e.privacidad = "Debes aceptar la política de privacidad";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) setSent(true);
  };

  return (
    <>
      <InteriorHero
        title="Pedir presupuesto"
        subtitle="Cuéntanos los detalles de tu reforma. Presupuesto gratuito, sin letra pequeña."
        img="photo-1762810931790-40b25e10b3e7"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Sidebar explicativo */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <SectionLabel>Cómo funciona</SectionLabel>
                <h2 className="font-display text-3xl lg:text-4xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-6">
                  Claro, detallado<br />y por escrito.
                </h2>
                <p className="text-[#555555] text-[15px] leading-relaxed">
                  Rellena el formulario con los datos de tu reforma. Cuanto más nos cuentes, más ajustado será el presupuesto.
                </p>
              </div>

              {/* Pasos */}
              <div className="space-y-5">
                {[
                  { num: "01", title: "Rellenas el formulario",       desc: "Nos cuentas qué quieres reformar, los metros aproximados y el estado actual." },
                  { num: "02", title: "Visita gratuita",              desc: "Concertamos una visita al inmueble sin ningún coste ni compromiso." },
                  { num: "03", title: "Presupuesto gratuito",          desc: "Te enviamos un presupuesto detallado y desglosado por partidas." },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="font-display text-3xl font-black text-[#BBBBBB] leading-none shrink-0 select-none w-10" aria-hidden="true">{s.num}</div>
                    <div className="pt-1">
                      <p className="text-[13px] font-semibold text-[#0A0A0A] mb-0.5">{s.title}</p>
                      <p className="text-[12px] text-[#666666] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0F0F0] pt-6 space-y-3">
                <p className="text-[12px] text-[#666666]">¿Prefieres escribirnos antes?</p>
                <a href="mailto:info@obrasdiaz2011.es" className="flex items-center gap-2 text-[15px] font-semibold text-[#0A0A0A] hover:opacity-50 transition-opacity">
                  <Mail size={15} style={{ color: AC }} /> info@obrasdiaz2011.es
                </a>
              </div>
            </div>

            {/* Formulario completo */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="border border-[#BBDDC0] bg-[#F4FBF5] p-10 lg:p-14 flex flex-col items-center text-center" role="status">
                  <CheckCircle size={44} className="text-[#3D9E52] mb-5" />
                  <h3 className="font-display text-3xl font-black uppercase text-[#0A0A0A] mb-3">¡Solicitud recibida!</h3>
                  <p className="text-[#555555] max-w-sm text-[15px] leading-relaxed">
                    Nos ponemos en contacto contigo lo antes posible para concertar la visita y preparar tu presupuesto gratuito.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-6">

                  {/* Datos personales */}
                  <div className="pb-2 border-b border-[#F0F0F0]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666666]">Tus datos</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputField label="Nombre y apellidos" id="p-nombre" required error={errors.nombre} value={f.nombre} onChange={v => setF({...f, nombre: v})} placeholder="Laura Puig" />
                    <InputField label="Correo electrónico" id="p-email" required type="email" error={errors.email} value={f.email} onChange={v => setF({...f, email: v})} placeholder="laura@email.com" />
                  </div>
                  <InputField label="Teléfono" id="p-tel" type="tel" value={f.telefono} onChange={v => setF({...f, telefono: v})} placeholder="+34 600 000 000" />

                  {/* Datos de la reforma */}
                  <div className="pt-2 pb-2 border-b border-[#F0F0F0]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666666]">Tu reforma</p>
                  </div>
                  <SelectField label="Tipo de reforma" id="p-tipo" required error={errors.tipoReforma} value={f.tipoReforma} onChange={v => setF({...f, tipoReforma: v})}>
                    <option value="">Selecciona...</option>
                    <option>Reforma integral de vivienda</option>
                    <option>Reforma de cocina</option>
                    <option>Reforma de baño</option>
                    <option>Reforma de salón / dormitorio</option>
                    <option>Reforma de local comercial</option>
                    <option>Reforma de oficina o despacho</option>
                    <option>Otro</option>
                  </SelectField>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <SelectField label="Superficie aproximada" id="p-metros" value={f.metros} onChange={v => setF({...f, metros: v})}>
                      <option value="">Selecciona...</option>
                      <option>Menos de 30 m²</option>
                      <option>30 – 60 m²</option>
                      <option>60 – 90 m²</option>
                      <option>90 – 120 m²</option>
                      <option>Más de 120 m²</option>
                      <option>No lo sé aún</option>
                    </SelectField>
                    <SelectField label="Estado actual del espacio" id="p-estado" value={f.estado} onChange={v => setF({...f, estado: v})}>
                      <option value="">Selecciona...</option>
                      <option>Habitado — vivimos en él</option>
                      <option>Vacío — listo para reformar</option>
                      <option>Necesita vaciado previo</option>
                      <option>En obra / a medio hacer</option>
                    </SelectField>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputField label="Barrio o municipio" id="p-barrio" value={f.barrio} onChange={v => setF({...f, barrio: v})} placeholder="Eixample, Sant Cugat..." />
                    <SelectField label="Presupuesto orientativo" id="p-pres" value={f.presupuesto} onChange={v => setF({...f, presupuesto: v})}>
                      <option value="">Selecciona un rango...</option>
                      <option>Menos de 5.000 €</option>
                      <option>5.000 – 15.000 €</option>
                      <option>15.000 – 30.000 €</option>
                      <option>30.000 – 60.000 €</option>
                      <option>Más de 60.000 €</option>
                      <option>Prefiero no indicarlo</option>
                    </SelectField>
                  </div>
                  <div>
                    <label htmlFor="p-desc" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2">Descripción de la reforma *</label>
                    <textarea
                      id="p-desc" rows={5} value={f.descripcion}
                      onChange={e => setF({...f, descripcion: e.target.value})}
                      placeholder="Cuéntanos qué quieres hacer: qué estancias, si tienes ideas claras o necesitas orientación, si hay algún condicionante especial..."
                      aria-describedby={errors.descripcion ? "p-desc-err" : undefined}
                      aria-invalid={!!errors.descripcion}
                      className={`w-full border px-4 py-3 text-sm placeholder-[#C0C0C0] bg-white resize-none hover:border-[#999999] transition-colors ${errors.descripcion ? "border-red-500" : "border-[#E0E0E0]"}`}
                      onFocus={e => { e.currentTarget.style.outline = `2px solid ${ACR}`; e.currentTarget.style.outlineOffset = "2px"; }}
                      onBlur={e => { e.currentTarget.style.outline = ""; }}
                    />
                    <span id="p-desc-err"><FieldError msg={errors.descripcion} /></span>
                  </div>

                  {/* Privacidad */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={f.privacidad} onChange={e => setF({...f, privacidad: e.target.checked})} className="mt-0.5" style={{ accentColor: AC }} aria-describedby={errors.privacidad ? "p-priv-err" : undefined} />
                      <span className="text-[12px] text-[#555555] leading-relaxed">
                        He leído y acepto la <a href="#" className="underline hover:opacity-60">política de privacidad</a> *
                      </span>
                    </label>
                    <span id="p-priv-err"><FieldError msg={errors.privacidad} /></span>
                  </div>

                  <BtnPrimary type="submit" full>Solicitar presupuesto gratuito</BtnPrimary>
                  <p className="text-[11px] text-[#666666] text-center">Te respondemos lo antes posible.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── UNSUBSCRIBE PAGE ──────────────────────────────────────────────────────────

function UnsubscribePage({ setPage }: { setPage: (p: Page) => void }) {
  const [sent, setSent]       = useState(false);
  const [email, setEmail]     = useState("");
  const [motivo, setMotivo]   = useState("");
  const [confirm, setConfirm] = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email.trim() || !email.includes("@")) errs.email = "Introduce un email válido";
    if (!confirm) errs.confirm = "Debes confirmar la solicitud de baja";
    setErrors(errs);
    if (!Object.keys(errs).length) setSent(true);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-[#F8F8F8]">
      <section className="max-w-lg mx-auto px-6 py-20">
        {sent ? (
          <div className="text-center">
            <CheckCircle size={48} className="mx-auto mb-6" style={{ color: AC }} />
            <h1 className="font-display text-3xl font-black uppercase text-[#0A0A0A] mb-4">Baja registrada</h1>
            <p className="text-[#555555] mb-8 leading-relaxed text-[15px]">
              Hemos procesado tu solicitud. Ya no recibirás comunicaciones comerciales de Obras Díaz 2011, S.L. en un plazo máximo de 72 horas.
            </p>
            <BtnOutline onClick={() => setPage("inicio")}>Volver al inicio</BtnOutline>
          </div>
        ) : (
          <>
            <SectionLabel>Gestión de comunicaciones</SectionLabel>
            <h1 className="font-display text-4xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-4">
              Darse de baja
            </h1>
            <p className="text-[#555555] leading-relaxed text-[15px] mb-10">
              Si ya no deseas recibir comunicaciones comerciales de Obras Díaz 2011, S.L., completa el siguiente formulario. Procesaremos tu solicitud en un plazo máximo de 72 horas, sin complicaciones.
            </p>
            <form onSubmit={submit} noValidate className="space-y-6">
              <InputField label="Correo electrónico" id="b-email" required type="email" error={errors.email} value={email} onChange={setEmail} placeholder="tu@email.com" />
              <SelectField label="Motivo (opcional)" id="b-motivo" value={motivo} onChange={setMotivo}>
                <option value="">Prefiero no indicar</option>
                <option>Recibo demasiadas comunicaciones</option>
                <option>El contenido no es de mi interés</option>
                <option>Ya no soy cliente</option>
                <option>Otro motivo</option>
              </SelectField>
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox" checked={confirm}
                    onChange={e => setConfirm(e.target.checked)}
                    className="mt-0.5"
                    style={{ accentColor: AC }}
                    aria-describedby={errors.confirm ? "b-conf-err" : undefined}
                  />
                  <span className="text-[12px] text-[#555555] leading-relaxed">
                    Confirmo que quiero darme de baja de las comunicaciones comerciales de Obras Díaz 2011, S.L. *
                  </span>
                </label>
                <span id="b-conf-err"><FieldError msg={errors.confirm} /></span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#0A0A0A] text-white text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
                >
                  Darme de baja
                </button>
                <BtnOutline onClick={() => setPage("inicio")}>Cancelar</BtnOutline>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

// ─── LEGAL PAGES ──────────────────────────────────────────────────────────────

const LEGAL_CONTENT: Record<"privacidad" | "cookies" | "legal", { title: string; sections: { h: string; body: string }[] }> = {
  privacidad: {
    title: "Política de privacidad",
    sections: [
      {
        h: "1. Responsable del tratamiento",
        body: `Obras Díaz 2011, S.L. (en adelante, «la Empresa»), con CIF B-XXXXXXXX y domicilio social en Barcelona, es la responsable del tratamiento de los datos personales recabados a través de este sitio web y de los formularios de contacto y solicitud de presupuesto.\n\nPuede contactar con nosotros en: info@obrasdiaz2011.es`,
      },
      {
        h: "2. Datos que recabamos",
        body: `Recabamos únicamente los datos que usted nos facilita de forma voluntaria a través de los formularios disponibles en el sitio web:\n\n• Nombre y apellidos\n• Dirección de correo electrónico\n• Datos relativos al proyecto de reforma (tipo, superficie, zona, etc.)\n• Currículum y datos de experiencia profesional, en el caso de candidaturas espontáneas\n\nNo recabamos datos especialmente sensibles ni datos de menores de 14 años. Si usted es menor de 14 años, por favor no cumplimente ningún formulario.`,
      },
      {
        h: "3. Finalidad y base jurídica del tratamiento",
        body: `Los datos se tratan con las siguientes finalidades y bases jurídicas:\n\n• Gestión de consultas y solicitudes de presupuesto: ejecución de medidas precontractuales a petición del interesado (art. 6.1.b RGPD).\n• Gestión de candidaturas: interés legítimo de la Empresa en la selección de personal (art. 6.1.f RGPD).\n• Gestión de bajas de comunicaciones comerciales: cumplimiento de una obligación legal (art. 6.1.c RGPD) y revocación del consentimiento.\n• Envío de comunicaciones comerciales, si usted ha prestado su consentimiento expreso: art. 6.1.a RGPD.`,
      },
      {
        h: "4. Conservación de los datos",
        body: `Los datos se conservan durante el tiempo necesario para atender la solicitud y, posteriormente, durante los plazos legales de prescripción de responsabilidades. Los datos de candidaturas se conservan durante un máximo de 12 meses, salvo que el candidato solicite su supresión antes.`,
      },
      {
        h: "5. Destinatarios",
        body: `Los datos no se ceden a terceros, salvo obligación legal o cuando sea estrictamente necesario para la prestación del servicio (p. ej., proveedores de hosting o plataformas de correo electrónico que actúan como encargados del tratamiento bajo contrato de encargo conforme al art. 28 RGPD). No realizamos transferencias internacionales de datos.`,
      },
      {
        h: "6. Derechos del interesado",
        body: `Puede ejercer en cualquier momento los siguientes derechos, dirigiendo un escrito a info@obrasdiaz2011.es con copia de su documento de identidad:\n\n• Acceso: conocer qué datos tratamos sobre usted.\n• Rectificación: corregir datos inexactos o incompletos.\n• Supresión («derecho al olvido»): solicitar la eliminación de sus datos.\n• Limitación del tratamiento: solicitar que suspendamos temporalmente el tratamiento.\n• Portabilidad: recibir sus datos en formato estructurado y legible.\n• Oposición: oponerse al tratamiento basado en interés legítimo.\n• Retirada del consentimiento: en cualquier momento, sin efecto retroactivo.\n\nSi considera que sus derechos no han sido atendidos, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
      },
      {
        h: "7. Seguridad",
        body: `Adoptamos las medidas técnicas y organizativas apropiadas para garantizar la seguridad de sus datos y evitar su pérdida, alteración o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.`,
      },
      {
        h: "8. Cambios en esta política",
        body: `Podemos actualizar esta política para adaptarla a cambios legales o del servicio. La versión vigente siempre estará disponible en este sitio web. Última actualización: julio de 2026.`,
      },
    ],
  },
  cookies: {
    title: "Política de cookies",
    sections: [
      {
        h: "1. ¿Qué son las cookies?",
        body: `Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario cuando este los visita. Sirven para que el sitio recuerde sus preferencias, analice el uso que hace del mismo y, en algunos casos, muestre publicidad personalizada.`,
      },
      {
        h: "2. Cookies que utilizamos",
        body: `Este sitio web es una aplicación de una sola página (SPA) que no instala cookies de terceros ni cookies de seguimiento o publicidad.\n\nÚnicamente podría generarse alguna cookie técnica estrictamente necesaria para el funcionamiento del sitio (p. ej., preferencias de sesión). Estas cookies no requieren consentimiento previo según el art. 22.2 de la LSSI-CE, ya que son imprescindibles para la prestación del servicio solicitado por el usuario.\n\nNo utilizamos:\n• Cookies analíticas ni de medición de audiencia\n• Cookies publicitarias ni de retargeting\n• Cookies de redes sociales de terceros`,
      },
      {
        h: "3. Gestión y desactivación de cookies",
        body: `Puede configurar su navegador para bloquear o eliminar todas las cookies. Tenga en cuenta que deshabilitar las cookies técnicas podría afectar al funcionamiento del sitio. A continuación, encontrará los enlaces a las instrucciones de los navegadores más habituales:\n\n• Chrome: Configuración › Privacidad y seguridad › Cookies\n• Firefox: Opciones › Privacidad y seguridad › Cookies\n• Safari: Preferencias › Privacidad › Gestionar datos de sitios web\n• Edge: Configuración › Privacidad, búsqueda y servicios › Cookies`,
      },
      {
        h: "4. Actualizaciones",
        body: `Si en el futuro incorporáramos cookies adicionales que requirieran consentimiento, actualizaremos esta política y solicitaremos su autorización mediante el mecanismo correspondiente. Última actualización: julio de 2026.`,
      },
      {
        h: "5. Contacto",
        body: `Para cualquier consulta sobre nuestra política de cookies, puede contactarnos en info@obrasdiaz2011.es.`,
      },
    ],
  },
  legal: {
    title: "Aviso legal",
    sections: [
      {
        h: "1. Datos identificativos del titular",
        body: `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:\n\n• Denominación social: Obras Díaz 2011, S.L.\n• CIF: B-XXXXXXXX\n• Inscripción: Registro Mercantil de Barcelona\n• Correo electrónico: info@obrasdiaz2011.es\n• Zona de actuación: Barcelona y área metropolitana`,
      },
      {
        h: "2. Objeto y ámbito de aplicación",
        body: `El presente Aviso Legal regula el acceso y uso del sitio web de Obras Díaz 2011, S.L. La utilización del sitio web atribuye la condición de usuario e implica la aceptación plena de las presentes condiciones. La Empresa se reserva el derecho a modificar este aviso en cualquier momento.`,
      },
      {
        h: "3. Condiciones de uso",
        body: `El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos en el sitio web, y en particular a no emplearlos para:\n\n• Incurrir en actividades ilícitas o contrarias a la buena fe y al orden público.\n• Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que atente contra los derechos humanos.\n• Introducir o difundir virus informáticos o cualquier otro sistema físico o lógico que pueda causar daños.\n• Intentar acceder, utilizar o manipular los datos de terceros usuarios u otros sistemas informáticos.`,
      },
      {
        h: "4. Propiedad intelectual e industrial",
        body: `Todos los contenidos del sitio web — textos, imágenes, logotipos, diseño gráfico, código fuente y demás elementos — son propiedad de Obras Díaz 2011, S.L. o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.\n\nQueda expresamente prohibida la reproducción total o parcial, distribución, comunicación pública o transformación de cualquier contenido sin autorización escrita previa de la Empresa.`,
      },
      {
        h: "5. Exclusión de garantías y responsabilidad",
        body: `La Empresa no garantiza la disponibilidad y continuidad del funcionamiento del sitio web ni la ausencia de errores en sus contenidos. Asimismo, no se responsabiliza de los daños que puedan derivarse de la falta de disponibilidad, continuidad o seguridad del sitio web, ni de la defraudación de las expectativas del usuario.\n\nLos contenidos del sitio tienen carácter meramente informativo y no constituyen asesoramiento técnico, jurídico o de otro tipo.`,
      },
      {
        h: "6. Enlaces a terceros",
        body: `El sitio web puede contener enlaces a sitios de terceros. La Empresa no asume responsabilidad alguna sobre el contenido, exactitud o legalidad de dichos sitios externos, ni sobre los daños que puedan derivarse de su acceso o uso.`,
      },
      {
        h: "7. Legislación aplicable y jurisdicción",
        body: `Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del uso del sitio web, las partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de Barcelona.`,
      },
    ],
  },
};

function LegalPage({ type, setPage }: { type: "privacidad" | "cookies" | "legal"; setPage: (p: Page) => void }) {
  const { title, sections } = LEGAL_CONTENT[type];
  return (
    <>
      <InteriorHero title={title} img="photo-1666037805138-f227944ed8d7" />
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            {sections.map((s, i) => (
              <div key={i} className="mb-10">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">{s.h}</h2>
                <div className="space-y-3">
                  {s.body.split("\n\n").map((paragraph, j) => (
                    <p key={j} className="text-[15px] text-[#555555] leading-relaxed whitespace-pre-line">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t border-[#E5E5E5] pt-8 mt-12">
              <button
                onClick={() => setPage("inicio")}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] hover:opacity-50 transition-opacity group"
              >
                <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("inicio");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Header current={page} setPage={navigate} />
      <main id="main-content" className={page === "inicio" ? "" : "pt-16 lg:pt-20"}>
        {page === "inicio"      && <HomePage      setPage={navigate} />}
        {page === "nosotros"    && <AboutPage     setPage={navigate} />}
        {page === "galeria"     && <GalleryPage />}
        {page === "trabaja"     && <CareersPage />}
        {page === "contacto"    && <ContactPage    setPage={navigate} />}
        {page === "presupuesto" && <PresupuestoPage />}
        {page === "baja"        && <UnsubscribePage setPage={navigate} />}
        {page === "privacidad"  && <LegalPage type="privacidad" setPage={navigate} />}
        {page === "cookies"     && <LegalPage type="cookies"    setPage={navigate} />}
        {page === "legal"       && <LegalPage type="legal"      setPage={navigate} />}
      </main>
      <Footer setPage={navigate} />
    </div>
  );
}
