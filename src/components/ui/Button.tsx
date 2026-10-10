import { AC, ACH, ACR } from '@/config/theme';

interface BtnPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  full?: boolean;
}

export function BtnPrimary({ children, onClick, type = 'button', full = false }: BtnPrimaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ background: AC }}
      className={`${full ? 'w-full' : ''} px-8 py-4 text-white text-sm font-semibold tracking-widest uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2`}
      onMouseEnter={(e) => (e.currentTarget.style.background = ACH)}
      onMouseLeave={(e) => (e.currentTarget.style.background = AC)}
      onFocus={(e) => (e.currentTarget.style.outlineColor = ACR)}
    >
      {children}
    </button>
  );
}

interface BtnOutlineProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  full?: boolean;
  dark?: boolean;
}

export function BtnOutline({
  children,
  onClick,
  type = 'button',
  full = false,
  dark = false,
}: BtnOutlineProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ outlineColor: ACR }}
      className={`${full ? 'w-full' : ''} px-8 py-4 border text-sm font-semibold tracking-widest uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        dark
          ? 'border-white/40 text-white hover:border-white hover:bg-white/5'
          : 'border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}
