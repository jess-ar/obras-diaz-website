import { useState } from 'react';
import { Mail, MapPin, Instagram, Linkedin, Facebook, CheckCircle } from 'lucide-react';
import { InteriorHero, SectionLabel } from '@/components/ui/Section';
import { BtnPrimary } from '@/components/ui/Button';
import { InputField, FieldError } from '@/components/ui/FormFields';
import { AC, ACR } from '@/config/theme';
import type { Page } from '@/types';

interface ContactPageProps {
  setPage: (p: Page) => void;
}

export function ContactPage({ setPage }: ContactPageProps) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [f, setF] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    privacidad: false,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!f.email.trim() || !f.email.includes('@')) e.email = 'Email no válido';
    if (!f.mensaje.trim()) e.mensaje = 'El mensaje es obligatorio';
    if (!f.privacidad) e.privacidad = 'Debes aceptar la política de privacidad';
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) setSent(true);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'info@obrasdiaz2011.es' },
    { icon: MapPin, label: 'Zona', value: 'Barcelona y alrededores' },
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
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666666] mb-1">
                          {item.label}
                        </p>
                        <p className="text-[14px] text-[#0A0A0A] whitespace-pre-line leading-relaxed">
                          {item.value}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Redes sociales */}
              <div className="flex items-center gap-5">
                <a
                  href="https://www.instagram.com/obrasdiaz2011sl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-[#0A0A0A] hover:opacity-50 transition-opacity"
                  aria-label="Instagram de Obras Díaz 2011"
                >
                  <Instagram size={16} style={{ color: AC }} /> @obrasdiaz2011sl
                </a>
                <a
                  href="https://www.facebook.com/obrasdiaz2011sl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-[#0A0A0A] hover:opacity-50 transition-opacity"
                  aria-label="Facebook de Obras Díaz 2011"
                >
                  <Facebook size={16} style={{ color: AC }} /> Facebook
                </a>
                <span
                  className="text-[#BBBBBB] cursor-not-allowed"
                  title="LinkedIn — próximamente"
                  aria-label="LinkedIn — próximamente"
                >
                  <Linkedin size={16} />
                </span>
              </div>

              {/* CTA presupuesto */}
              <div className="bg-[#0A0A0A] p-6">
                <p className="text-[13px] font-semibold text-white mb-1">
                  ¿Quieres un presupuesto?
                </p>
                <p className="text-[12px] text-white/70 mb-4 leading-relaxed">
                  Si lo que necesitas es un presupuesto para tu reforma, usa el formulario
                  específico. Te pedimos cuatro datos y te respondemos lo antes posible.
                </p>
                <BtnPrimary onClick={() => setPage('presupuesto')}>Pedir presupuesto</BtnPrimary>
              </div>

              {/* Mapa OpenStreetMap — zona Barcelona */}
              <div className="border border-[#E5E5E5] overflow-hidden aspect-[4/3]">
                <iframe
                  title="Zona de actuación — Barcelona"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.05%2C41.32%2C2.28%2C41.48&layer=mapnik"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  aria-label="Mapa de la zona de actuación: Barcelona y alrededores"
                />
              </div>
            </div>

            {/* Form corto */}
            <div className="lg:col-span-3">
              {sent ? (
                <div
                  className="border border-[#BBDDC0] bg-[#F4FBF5] p-10 lg:p-14 flex flex-col items-center text-center"
                  role="status"
                >
                  <CheckCircle size={44} className="text-[#3D9E52] mb-5" />
                  <h3 className="font-display text-3xl font-black uppercase text-[#0A0A0A] mb-3">
                    ¡Mensaje recibido!
                  </h3>
                  <p className="text-[#555555] max-w-sm text-[15px] leading-relaxed">
                    Te respondemos en menos de 24 horas en el correo que nos has indicado.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <SectionLabel>Formulario de contacto</SectionLabel>
                    <p className="text-[#666666] text-[14px] leading-relaxed">
                      Para dudas generales, consultas sobre proyectos en curso o cualquier otra
                      cuestión. Si lo que necesitas es un presupuesto,{' '}
                      <button
                        onClick={() => setPage('presupuesto')}
                        className="underline text-[#0A0A0A] hover:opacity-50 transition-opacity"
                      >
                        usa el formulario de presupuesto
                      </button>
                      .
                    </p>
                  </div>
                  <form onSubmit={submit} noValidate className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <InputField
                        label="Nombre y apellidos"
                        id="ct-nombre"
                        required
                        error={errors.nombre}
                        value={f.nombre}
                        onChange={(v) => setF({ ...f, nombre: v })}
                        placeholder="Laura Puig"
                      />
                      <InputField
                        label="Correo electrónico"
                        id="ct-email"
                        required
                        type="email"
                        error={errors.email}
                        value={f.email}
                        onChange={(v) => setF({ ...f, email: v })}
                        placeholder="laura@email.com"
                      />
                    </div>
                    <InputField
                      label="Teléfono (opcional)"
                      id="ct-tel"
                      type="tel"
                      value={f.telefono}
                      onChange={(v) => setF({ ...f, telefono: v })}
                      placeholder="+34 600 000 000"
                    />
                    <div>
                      <label
                        htmlFor="ct-msg"
                        className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2"
                      >
                        Mensaje *
                      </label>
                      <textarea
                        id="ct-msg"
                        rows={5}
                        value={f.mensaje}
                        onChange={(e) => setF({ ...f, mensaje: e.target.value })}
                        placeholder="Cuéntanos tu duda o consulta..."
                        aria-describedby={errors.mensaje ? 'ct-msg-err' : undefined}
                        aria-invalid={!!errors.mensaje}
                        className={`w-full border px-4 py-3 text-sm placeholder-[#C0C0C0] bg-white resize-none hover:border-[#999999] transition-colors ${errors.mensaje ? 'border-red-500' : 'border-[#E0E0E0]'}`}
                        onFocus={(e) => {
                          e.currentTarget.style.outline = `2px solid ${ACR}`;
                          e.currentTarget.style.outlineOffset = '2px';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = '';
                        }}
                      />
                      <span id="ct-msg-err">
                        <FieldError msg={errors.mensaje} />
                      </span>
                    </div>
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={f.privacidad}
                          onChange={(e) => setF({ ...f, privacidad: e.target.checked })}
                          className="mt-0.5"
                          style={{ accentColor: AC }}
                          aria-describedby={errors.privacidad ? 'ct-priv-err' : undefined}
                        />
                        <span className="text-[12px] text-[#555555] leading-relaxed">
                          He leído y acepto la{' '}
                          <button type="button" className="underline hover:opacity-60">
                            política de privacidad
                          </button>{' '}
                          *
                        </span>
                      </label>
                      <span id="ct-priv-err">
                        <FieldError msg={errors.privacidad} />
                      </span>
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
