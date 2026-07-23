interface LogoProps {
  src: string;
  height?: string;
}

export function Logo({ src, height = '2.5rem' }: LogoProps) {
  return (
    <img src={src} alt="Obras Díaz 2011, S.L. — logotipo" className="w-auto" style={{ height }} />
  );
}
