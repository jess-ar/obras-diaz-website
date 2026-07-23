import { useState, useEffect } from 'react';
import { X, CheckCircle, Upload } from 'lucide-react';
import { InteriorHero, SectionLabel } from '@/components/ui/Section';
import { BtnPrimary, BtnOutline } from '@/components/ui/Button';
import { InputField, SelectField, FieldError } from '@/components/ui/FormFields';
import { JOBS, VALUES, BENEFITS } from '@/config/constants';
import { AC } from '@/config/theme';
import type { Job } from '@/types';

// ─── Job Modal ────────────────────────────────────────────────────────────────

function JobModal({
  job,
  onClose,
  onApply,
}: {
  job: Job;
  onClose: () => void;
  onApply: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={job.title}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#0A0A0A] px-8 py-7 flex items-start justify-between gap-6">
          <div>
            <div
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2"
              style={{ color: AC }}
            >
              {job.dept} · {job.location}
            </div>
            <h2 className="font-display text-3xl font-black uppercase text-white leading-tight">
              {job.title}
            </h2>
            <div className="text-white/55 text-[12px] uppercase tracking-widest mt-2">
              {job.type}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors shrink-0 mt-1"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-8">
          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">
              Descripción del puesto
            </h3>
            <p className="text-[15px] text-[#555555] leading-relaxed">{job.desc}</p>
          </div>

          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">
              Requisitos
            </h3>
            <ul className="space-y-2">
              {job.req.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-[#555555]">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full bg-[#6E6E6E] shrink-0"
                    aria-hidden="true"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-[#0A0A0A] mb-3">
              Qué ofrecemos
            </h3>
            <ul className="space-y-2">
              {job.offer.map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-[#555555]">
                  <CheckCircle
                    size={13}
                    className="mt-0.5 shrink-0"
                    style={{ color: AC }}
                    aria-hidden="true"
                  />
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

// ─── Jobs Page ────────────────────────────────────────────────────────────────

export function JobsPage() {
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [f, setF] = useState({
    nombre: '',
    email: '',
    telefono: '',
    puesto: '',
    experiencia: '',
    mensaje: '',
    privacidad: false,
  });

  const scrollToForm = (job?: Job) => {
    setActiveJob(null);
    if (job) setF((prev) => ({ ...prev, puesto: job.title }));
    setTimeout(() => {
      document
        .getElementById('candidatura-form')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!f.email.trim() || !f.email.includes('@')) e.email = 'Introduce un email válido';
    if (!f.privacidad) e.privacidad = 'Debes aceptar la política de privacidad';
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
                En Obras Díaz 2011 creemos que el mejor activo de una constructora son sus personas.
                Invertimos en formación, seguridad y bienestar de cada miembro del equipo.
              </p>
              <p className="text-[#666666] leading-relaxed text-[15px]">
                Somos un equipo diverso que comparte un mismo estándar de calidad y un orgullo por
                el trabajo bien hecho.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-[#EBEBEB]">
                  <CheckCircle
                    size={14}
                    className="mt-0.5 shrink-0"
                    style={{ color: AC }}
                    aria-hidden="true"
                  />
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
              <article
                key={i}
                className="bg-white p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F8F8] transition-colors"
              >
                <div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-[#0A0A0A] mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#666666] uppercase tracking-wide">
                    <span>{job.dept}</span>
                    <span className="text-[#CCCCCC]">·</span>
                    <span>{job.location}</span>
                    <span className="text-[#CCCCCC]">·</span>
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
            <h2 className="font-display text-4xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-3">
              ¿Tu especialidad no está en la lista?
            </h2>
            <p className="text-[#666666] mb-10 text-[15px]">
              Mándanos tu CV igualmente. Lo tenemos en cuenta para cuando haya una vacante que
              encaje con tu perfil.
            </p>

            {sent ? (
              <div
                id="candidatura-form"
                className="border border-[#BBDDC0] bg-[#F4FBF5] p-8 flex items-start gap-4"
                role="status"
              >
                <CheckCircle size={22} className="text-[#3D9E52] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold uppercase text-[#0A0A0A] mb-2">
                    Candidatura recibida
                  </h3>
                  <p className="text-[#555555] text-[14px] leading-relaxed">
                    Gracias por tu interés. Revisaremos tu perfil y te contactaremos si surge una
                    oportunidad adecuada.
                  </p>
                </div>
              </div>
            ) : (
              <form id="candidatura-form" onSubmit={submit} noValidate className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <InputField
                    label="Nombre y apellidos"
                    id="c-nombre"
                    required
                    error={errors.nombre}
                    value={f.nombre}
                    onChange={(v) => setF({ ...f, nombre: v })}
                    placeholder="Carlos Martínez Ruiz"
                  />
                  <InputField
                    label="Correo electrónico"
                    id="c-email"
                    required
                    type="email"
                    error={errors.email}
                    value={f.email}
                    onChange={(v) => setF({ ...f, email: v })}
                    placeholder="carlos@email.com"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <InputField
                    label="Teléfono"
                    id="c-tel"
                    type="tel"
                    value={f.telefono}
                    onChange={(v) => setF({ ...f, telefono: v })}
                    placeholder="+34 600 000 000"
                  />
                  <InputField
                    label="Puesto o especialidad"
                    id="c-puesto"
                    value={f.puesto}
                    onChange={(v) => setF({ ...f, puesto: v })}
                    placeholder="Jefe de Obra, Albañil..."
                  />
                </div>
                <SelectField
                  label="Años de experiencia"
                  id="c-exp"
                  value={f.experiencia}
                  onChange={(v) => setF({ ...f, experiencia: v })}
                >
                  <option value="">Selecciona...</option>
                  <option>Menos de 1 año</option>
                  <option>1 – 3 años</option>
                  <option>3 – 5 años</option>
                  <option>5 – 10 años</option>
                  <option>Más de 10 años</option>
                </SelectField>
                <div>
                  <label
                    htmlFor="c-msg"
                    className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    value={f.mensaje}
                    onChange={(e) => setF({ ...f, mensaje: e.target.value })}
                    placeholder="Cuéntanos tu experiencia y motivación..."
                    className="w-full border border-[#E0E0E0] px-4 py-3 text-sm placeholder-[#C0C0C0] bg-white resize-none hover:border-[#999999] transition-colors"
                    onFocus={(e) => {
                      e.currentTarget.style.outline = `2px solid ${AC}`;
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = '';
                    }}
                  />
                </div>
                {/* File upload */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2">
                    Currículum (PDF, DOC)
                  </p>
                  <label className="flex items-center gap-3 border border-dashed border-[#D0D0D0] px-4 py-4 cursor-pointer hover:border-[#6E6E6E] transition-colors">
                    <Upload size={15} className="text-[#666666] shrink-0" aria-hidden="true" />
                    <span className="text-[13px] text-[#666666]">
                      {fileName ?? 'Haz clic para adjuntar tu CV'}
                    </span>
                    {fileName && (
                      <CheckCircle size={14} className="text-[#3D9E52] ml-auto shrink-0" />
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFileName(file.name);
                      }}
                      aria-label="Subir currículum"
                    />
                  </label>
                </div>
                {/* Privacy */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={f.privacidad}
                      onChange={(e) => setF({ ...f, privacidad: e.target.checked })}
                      className="mt-0.5"
                      style={{ accentColor: AC }}
                      aria-describedby={errors.privacidad ? 'c-priv-err' : undefined}
                    />
                    <span className="text-[12px] text-[#555555] leading-relaxed">
                      He leído y acepto la{' '}
                      <button type="button" className="underline hover:opacity-60">
                        política de privacidad
                      </button>{' '}
                      de Obras Díaz 2011, S.L. *
                    </span>
                  </label>
                  <span id="c-priv-err">
                    <FieldError msg={errors.privacidad} />
                  </span>
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
