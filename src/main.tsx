import { migrateLegacyHash } from '@/app/routes/paths';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import '@/styles/index.css';
import faviconUrl from '@/assets/logos/favicon.ico';

const link = document.createElement('link');
link.rel = 'icon';
link.href = faviconUrl;
document.head.appendChild(link);

migrateLegacyHash();

createRoot(document.getElementById('root')!).render(<App />);
