import type { Page } from '@/types';
import { ScrollWorld } from '@/features/home/ScrollWorld';
import { BackToTop } from '@/features/home/BackToTop';

export function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <>
      <ScrollWorld setPage={setPage} />
      <BackToTop />
    </>
  );
}
