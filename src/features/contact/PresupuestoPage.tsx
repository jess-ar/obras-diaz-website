import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { InteriorHero, SectionLabel } from '@/components/ui/Section';
import { BtnPrimary } from '@/components/ui/Button';
import { InputField, SelectField, FieldError } from '@/components/ui/FormFields';
import { AC, ACR } from '@/config/theme';

export function PresupuestoPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [f, setF] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoReforma: '',
    metros: '',
    estado: '',
    barrio: '',
    presupuesto: '',
    descripcion: '',
    privacidad: false,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!f.email.trim() || !f.email.includes('@')) e.email = 'Email no válido';
    if (!f.tipoReforma) e.tipoReforma = 'Selecciona el tipo de reforma';
    if (!f.descripcion.trim()) e.descripcion = 'Cuéntanos algo sobre la reforma';
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
                  Claro, detallado
                  <br />y por escrito.
                </h2>
                <p className="text-[#555555] text-[15px] leading-relaxed">
                  Rellena el formulario con los datos de tu reforma. Cuanto más nos cuentes, más
                  ajustado será el presupuesto.
                </p>
              </div>

              {/* Pasos */}
              <div className="space-y-5">
                {[
                  {
                    num: '01',
                    title: 'Rellenas el formulario',
                    desc: 'Nos cuentas qué quieres reformar, los metros aproximados y el estado actual.',
                  },
                  {
                    num: '02',
                    title: 'Visita gratuita',
                    desc: 'Concertamos una visita al inmueble sin ningún coste ni compromiso.',
                  },
                  {
                    num: '03',
                    title: 'Presupuesto gratuito',
                    desc: 'Te enviamos un presupuesto detallado y desglosado por partidas.',
                  },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="font-display text-3xl font-black text-[#BBBBBB] leading-none shrink-0 select-none w-10"
                      aria-hidden="true"
                    >
                      {s.num}
                    </div>
                    <div className="pt-1">
                      <p className="text-[13px] font-semibold text-[#0A0A0A] mb-0.5">{s.title}</p>
                      <p className="text-[12px] text-[#666666] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0F0F0] pt-6 space-y-3">
                <p className="text-[12px] text-[#666666]">¿Prefieres escribirnos antes?</p>
                <a
                  href="mailto:info@obrasdiaz2011.es"
                  className="flex items-center gap-2 text-[15px] font-semibold text-[#0A0A0A] hover:opacity-50 transition-opacity"
                >
                  <Mail size={15} style={{ color: AC }} /> info@obrasdiaz2011.es
                </a>
              </div>
            </div>

            {/* Formulario completo */}
            <div className="lg:col-span-3">
              {sent ? (
                <div
                  className="border border-[#BBDDC0] bg-[#F4FBF5] p-10 lg:p-14 flex flex-col items-center text-center"
                  role="status"
                >
                  <CheckCircle size={44} className="text-[#3D9E52] mb-5" />
                  <h3 className="font-display text-3xl font-black uppercase text-[#0A0A0A] mb-3">
                    ¡Solicitud recibida!
                  </h3>
                  <p className="text-[#555555] max-w-sm text-[15px] leading-relaxed">
                    Nos ponemos en contacto contigo lo antes posible para concertar la visita y
                    preparar tu presupuesto gratuito.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-6">
                  {/* Datos personales */}
                  <div className="pb-2 border-b border-[#F0F0F0]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666666]">
                      Tus datos
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputField
                      label="Nombre y apellidos"
                      id="p-nombre"
                      required
                      error={errors.nombre}
                      value={f.nombre}
                      onChange={(v) => setF({ ...f, nombre: v })}
                      placeholder="Laura Puig"
                    />
                    <InputField
                      label="Correo electrónico"
                      id="p-email"
                      required
                      type="email"
                      error={errors.email}
                      value={f.email}
                      onChange={(v) => setF({ ...f, email: v })}
                      placeholder="laura@email.com"
                    />
                  </div>
                  <InputField
                    label="Teléfono"
                    id="p-tel"
                    type="tel"
                    value={f.telefono}
                    onChange={(v) => setF({ ...f, telefono: v })}
                    placeholder="+34 600 000 000"
                  />

                  {/* Datos de la reforma */}
                  <div className="pt-2 pb-2 border-b border-[#F0F0F0]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666666]">
                      Tu reforma
                    </p>
                  </div>
                  <SelectField
                    label="Tipo de reforma"
                    id="p-tipo"
                    required
                    error={errors.tipoReforma}
                    value={f.tipoReforma}
                    onChange={(v) => setF({ ...f, tipoReforma: v })}
                  >
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
                    <SelectField
                      label="Superficie aproximada"
                      id="p-metros"
                      value={f.metros}
                      onChange={(v) => setF({ ...f, metros: v })}
                    >
                      <option value="">Selecciona...</option>
                      <option>Menos de 30 m²</option>
                      <option>30 – 60 m²</option>
                      <option>60 – 90 m²</option>
                      <option>90 – 120 m²</option>
                      <option>Más de 120 m²</option>
                      <option>No lo sé aún</option>
                    </SelectField>
                    <SelectField
                      label="Estado actual del espacio"
                      id="p-estado"
                      value={f.estado}
                      onChange={(v) => setF({ ...f, estado: v })}
                    >
                      <option value="">Selecciona...</option>
                      <option>Habitado — vivimos en él</option>
                      <option>Vacío — listo para reformar</option>
                      <option>Necesita vaciado previo</option>
                      <option>En obra / a medio hacer</option>
                    </SelectField>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputField
                      label="Barrio o municipio"
                      id="p-barrio"
                      value={f.barrio}
                      onChange={(v) => setF({ ...f, barrio: v })}
                      placeholder="Eixample, Sant Cugat..."
                    />
                    <SelectField
                      label="Presupuesto orientativo"
                      id="p-pres"
                      value={f.presupuesto}
                      onChange={(v) => setF({ ...f, presupuesto: v })}
                    >
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
                    <label
                      htmlFor="p-desc"
                      className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2"
                    >
                      Descripción de la reforma *
                    </label>
                    <textarea
                      id="p-desc"
                      rows={5}
                      value={f.descripcion}
                      onChange={(e) => setF({ ...f, descripcion: e.target.value })}
                      placeholder="Cuéntanos qué quieres hacer: qué estancias, si tienes ideas claras o necesitas orientación, si hay algún condicionante especial..."
                      aria-describedby={errors.descripcion ? 'p-desc-err' : undefined}
                      aria-invalid={!!errors.descripcion}
                      className={`w-full border px-4 py-3 text-sm placeholder-[#C0C0C0] bg-white resize-none hover:border-[#999999] transition-colors ${errors.descripcion ? 'border-red-500' : 'border-[#E0E0E0]'}`}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = `2px solid ${ACR}`;
                        e.currentTarget.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = '';
                      }}
                    />
                    <span id="p-desc-err">
                      <FieldError msg={errors.descripcion} />
                    </span>
                  </div>

                  {/* Privacidad */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={f.privacidad}
                        onChange={(e) => setF({ ...f, privacidad: e.target.checked })}
                        className="mt-0.5"
                        style={{ accentColor: AC }}
                        aria-describedby={errors.privacidad ? 'p-priv-err' : undefined}
                      />
                      <span className="text-[12px] text-[#555555] leading-relaxed">
                        He leído y acepto la{' '}
                        <button type="button" className="underline hover:opacity-60">
                          política de privacidad
                        </button>{' '}
                        *
                      </span>
                    </label>
                    <span id="p-priv-err">
                      <FieldError msg={errors.privacidad} />
                    </span>
                  </div>

                  <BtnPrimary type="submit" full>
                    Solicitar presupuesto gratuito
                  </BtnPrimary>
                  <p className="text-[11px] text-[#666666] text-center">
                    Te respondemos lo antes posible.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
