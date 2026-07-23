import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { SectionLabel } from '@/components/ui/Section';
import { BtnOutline } from '@/components/ui/Button';
import { InputField, SelectField, FieldError } from '@/components/ui/FormFields';
import { AC } from '@/config/theme';
import type { Page } from '@/types';

interface UnsubscribePageProps {
  setPage: (p: Page) => void;
}

export function UnsubscribePage({ setPage }: UnsubscribePageProps) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email.trim() || !email.includes('@')) errs.email = 'Introduce un email válido';
    if (!confirm) errs.confirm = 'Debes confirmar la solicitud de baja';
    setErrors(errs);
    if (!Object.keys(errs).length) setSent(true);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-[#F8F8F8]">
      <section className="max-w-lg mx-auto px-6 py-20">
        {sent ? (
          <div className="text-center">
            <CheckCircle size={48} className="mx-auto mb-6" style={{ color: AC }} />
            <h1 className="font-display text-3xl font-black uppercase text-[#0A0A0A] mb-4">
              Baja registrada
            </h1>
            <p className="text-[#555555] mb-8 leading-relaxed text-[15px]">
              Hemos procesado tu solicitud. Ya no recibirás comunicaciones comerciales de Obras Díaz
              2011, S.L. en un plazo máximo de 72 horas.
            </p>
            <BtnOutline onClick={() => setPage('inicio')}>Volver al inicio</BtnOutline>
          </div>
        ) : (
          <>
            <SectionLabel>Gestión de comunicaciones</SectionLabel>
            <h1 className="font-display text-4xl font-black uppercase text-[#0A0A0A] leading-tight tracking-tight mb-4">
              Darse de baja
            </h1>
            <p className="text-[#555555] leading-relaxed text-[15px] mb-10">
              Si ya no deseas recibir comunicaciones comerciales de Obras Díaz 2011, S.L., completa
              el siguiente formulario. Procesaremos tu solicitud en un plazo máximo de 72 horas, sin
              complicaciones.
            </p>
            <form onSubmit={submit} noValidate className="space-y-6">
              <InputField
                label="Correo electrónico"
                id="b-email"
                required
                type="email"
                error={errors.email}
                value={email}
                onChange={setEmail}
                placeholder="tu@email.com"
              />
              <SelectField
                label="Motivo (opcional)"
                id="b-motivo"
                value={motivo}
                onChange={setMotivo}
              >
                <option value="">Prefiero no indicar</option>
                <option>Recibo demasiadas comunicaciones</option>
                <option>El contenido no es de mi interés</option>
                <option>Ya no soy cliente</option>
                <option>Otro motivo</option>
              </SelectField>
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirm}
                    onChange={(e) => setConfirm(e.target.checked)}
                    className="mt-0.5"
                    style={{ accentColor: AC }}
                    aria-describedby={errors.confirm ? 'b-conf-err' : undefined}
                  />
                  <span className="text-[12px] text-[#555555] leading-relaxed">
                    Confirmo que quiero darme de baja de las comunicaciones comerciales de Obras
                    Díaz 2011, S.L. *
                  </span>
                </label>
                <span id="b-conf-err">
                  <FieldError msg={errors.confirm} />
                </span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#0A0A0A] text-white text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
                >
                  Darme de baja
                </button>
                <BtnOutline onClick={() => setPage('inicio')}>Cancelar</BtnOutline>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
