import { useState } from 'react';
import { COMPANY_EMAIL } from '@/config/constants';

export function CopyEmailButton({
  className,
  showAddress = false,
}: {
  className: string;
  showAddress?: boolean;
}) {
  const [message, setMessage] = useState('');
  const [copying, setCopying] = useState(false);
  const copyEmail = async () => {
    setMessage('');
    setCopying(true);
    try {
      await navigator.clipboard.writeText(COMPANY_EMAIL);
      setMessage('Correo copiado al portapapeles.');
    } catch {
      setMessage(`No se ha podido copiar. Puedes copiarlo manualmente: ${COMPANY_EMAIL}`);
    } finally {
      setCopying(false);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={copyEmail}
        disabled={copying}
        aria-label={showAddress ? `Copiar correo: ${COMPANY_EMAIL}` : undefined}
        className={className}
      >
        {showAddress ? COMPANY_EMAIL : 'Copiar correo'}
      </button>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 min-h-6 text-sm text-[#555555] break-words"
      >
        {message}
      </p>
    </div>
  );
}
