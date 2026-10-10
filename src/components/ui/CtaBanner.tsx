import { BtnOutline } from '@/components/ui/Button';
import type { Page } from '@/types';
export function CtaBanner({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="bg-[#6E6E6E] py-16 lg:py-24 text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <h2 className="font-display text-4xl lg:text-6xl font-semibold leading-tight">
          Hablemos de tu reforma.
        </h2>
        <div className="shrink-0">
          <BtnOutline dark onClick={() => setPage('presupuesto')}>
            Solicitar presupuesto
          </BtnOutline>
        </div>
      </div>
    </section>
  );
}
