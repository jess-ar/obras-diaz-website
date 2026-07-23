import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// ─── Design tokens (accent gray) ─────────────────────────────────────────────
const AC = '#6E6E6E'; // accent gray — default
const ACR = '#333333'; // accent gray — active/ring

// ─── Data ─────────────────────────────────────────────────────────────────────

const GALLERY_CATEGORIES = [
  'Todos',
  'Viviendas',
  'Cocinas',
  'Baños',
  'Salones',
  'Oficinas',
  'Locales',
];

const GALLERY = [
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

// ─── Shared component ─────────────────────────────────────────────────────────

function InteriorHero({ title, subtitle, img }: { title: string; subtitle?: string; img: string }) {
  return (
    <div className="relative h-[42vh] min-h-[320px] flex items-end bg-[#1A1A1A] overflow-hidden">
      <img
        src={`https://images.unsplash.com/${img}?w=1440&h=640&fit=crop&auto=format`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 pb-12 pt-28 w-full">
        <div
          className="text-[10px] tracking-[0.35em] uppercase mb-3 font-semibold"
          style={{ color: AC }}
        >
          Obras Díaz 2011, S.L.
        </div>
        <h1 className="font-display text-5xl lg:text-7xl font-black uppercase text-white leading-none tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-white/65 text-base max-w-xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ──────────────────────────────────────────────────────────────

export function GalleryPage() {
  const [activeCat, setActiveCat] = useState('Todos');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCat === 'Todos' ? GALLERY : GALLERY.filter((g) => g.cat === activeCat);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i !== null ? (i === 0 ? filtered.length - 1 : i - 1) : null)),
    [filtered.length],
  );
  const next = useCallback(
    () => setLightbox((i) => (i !== null ? (i === filtered.length - 1 ? 0 : i + 1) : null)),
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lightbox, filtered.length, close, prev, next]);

  return (
    <>
      <InteriorHero
        title="Galería de reformas"
        subtitle="Una selección de reformas ejecutadas en Barcelona y alrededores. Cada imagen habla por sí sola."
        img="photo-1705321963943-de94bb3f0dd3"
      />

      <div className="bg-white border-b border-[#E5E5E5] py-6">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-wrap gap-3">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                activeCat === cat
                  ? 'text-white'
                  : 'border border-[#E0E0E0] text-[#555555] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
              }`}
              style={activeCat === cat ? { background: AC } : {}}
              aria-pressed={activeCat === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="bg-[#F5F5F5] py-12 lg:py-16 min-h-[50vh]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-28">
              <p className="font-display text-2xl uppercase text-[#888888]">
                Sin proyectos en esta categoría
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {filtered.map((item, i) => (
                <button
                  key={`${item.img}-${i}`}
                  className="group relative overflow-hidden bg-[#1A1A1A] aspect-square focus-visible:outline-2"
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
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: AC }}
                      >
                        {item.cat}
                      </span>
                      <p className="text-white font-display font-bold uppercase text-sm leading-tight">
                        {item.name}
                      </p>
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
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de imagen"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-5 right-5 text-white/50 hover:text-white p-2"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 lg:left-8 text-white/50 hover:text-white p-3"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={30} />
          </button>
          <div className="max-w-5xl w-full mx-16 lg:mx-24">
            <img
              src={`https://images.unsplash.com/${filtered[lightbox].img}?w=1200&h=800&fit=crop&auto=format`}
              alt={filtered[lightbox].name}
              className="w-full object-cover max-h-[75vh]"
            />
            <div className="flex items-center justify-between mt-4 px-1">
              <div>
                <p className="text-white font-display font-bold uppercase tracking-wide">
                  {filtered[lightbox].name}
                </p>
                <p className="text-white/60 text-[11px] uppercase tracking-[0.2em] mt-0.5">
                  {filtered[lightbox].cat} · {filtered[lightbox].location}
                </p>
              </div>
              <p className="text-white/50 text-sm tabular-nums">
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 lg:right-8 text-white/50 hover:text-white p-3"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </>
  );
}
