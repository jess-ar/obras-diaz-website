import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 min-h-[60vh]">
      <p className="text-sm text-[#626262] mb-6">404</p>
      <h1 className="font-display text-4xl sm:text-6xl font-semibold mb-8">
        Página no encontrada.
      </h1>
      <Link
        to="/"
        className="inline-block bg-[#0A0A0A] text-white px-8 py-4 text-sm font-semibold hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
