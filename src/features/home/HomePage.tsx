import type { Page } from '@/types';
import { ScrollWorld } from './ScrollWorld';

export function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return <ScrollWorld setPage={setPage} />;
}
