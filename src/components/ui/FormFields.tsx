import { AlertCircle } from 'lucide-react';
import { ACR } from '@/config/theme';

interface FieldErrorProps {
  msg?: string;
}

export function FieldError({ msg }: FieldErrorProps) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
      <AlertCircle size={11} aria-hidden="true" /> {msg}
    </p>
  );
}

interface InputFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}

export function InputField({
  label,
  id,
  required,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2"
      >
        {label}
        {required && ' *'}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={error ? `${id}-err` : undefined}
        aria-invalid={!!error}
        className={`w-full border px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#C0C0C0] bg-white focus:outline-none transition-colors hover:border-[#999999] ${error ? 'border-red-500' : 'border-[#E0E0E0]'}`}
        style={{ ['--tw-ring-color' as string]: ACR }}
        onFocus={(e) => {
          e.currentTarget.style.outline = `2px solid ${ACR}`;
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = '';
        }}
      />
      <span id={`${id}-err`}>
        <FieldError msg={error} />
      </span>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}

export function SelectField({
  label,
  id,
  required,
  error,
  value,
  onChange,
  children,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2"
      >
        {label}
        {required && ' *'}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full border px-4 py-3 text-sm text-[#0A0A0A] bg-white focus:outline-none transition-colors hover:border-[#999999] ${error ? 'border-red-500' : 'border-[#E0E0E0]'}`}
        onFocus={(e) => {
          e.currentTarget.style.outline = `2px solid ${ACR}`;
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = '';
        }}
      >
        {children}
      </select>
      <span id={`${id}-err`}>
        <FieldError msg={error} />
      </span>
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}

export function TextAreaField({
  label,
  id,
  required,
  error,
  placeholder,
  value,
  onChange,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] mb-2"
      >
        {label}
        {required && ' *'}
      </label>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        aria-describedby={error ? `${id}-err` : undefined}
        aria-invalid={!!error}
        className={`w-full border px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#C0C0C0] bg-white focus:outline-none transition-colors hover:border-[#999999] resize-none ${error ? 'border-red-500' : 'border-[#E0E0E0]'}`}
        onFocus={(e) => {
          e.currentTarget.style.outline = `2px solid ${ACR}`;
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = '';
        }}
      />
      <span id={`${id}-err`}>
        <FieldError msg={error} />
      </span>
    </div>
  );
}
