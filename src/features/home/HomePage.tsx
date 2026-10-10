import type { Page } from '@/types';
import { ScrollWorld } from './ScrollWorld';
import { BackToTop } from './BackToTop';

export function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <>
      <ScrollWorld setPage={setPage} />
      <BackToTop />
    </>
  );
}
