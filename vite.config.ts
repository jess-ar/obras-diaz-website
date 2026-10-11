import { defineConfig, type Plugin } from 'vite';
import { getSeo, renderSeoHead, SEO_PATHS, SITE_URL } from './src/config/seo';
import { PROJECTS } from './src/config/projects';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Publish route-specific metadata in the HTML, before JavaScript executes.
function seoPages(): Plugin {
  const replaceHead = (html: string, pathname: string) =>
    html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start -->\n${renderSeoHead(pathname, PROJECTS)}\n<!-- seo:end -->`);
  const paths = [...SEO_PATHS, ...PROJECTS.map((project) => `/proyectos/${project.id}`)];
  return {
    name: 'seo-pages',
    enforce: 'post',
    transformIndexHtml(html) {
      return replaceHead(html, '/');
    },
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset' || typeof index.source !== 'string') {
        throw new Error('Cannot generate SEO pages without index.html');
      }
      for (const pathname of paths.filter((value) => value !== '/')) {
        this.emitFile({ type: 'asset', fileName: `${pathname.slice(1)}/index.html`, source: replaceHead(index.source, pathname) });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: replaceHead(index.source, '/404') });
      const urls = paths.filter((pathname) => !getSeo(pathname, PROJECTS).noindex)
        .map((pathname) => `  <url><loc>${SITE_URL}${pathname}</loc></url>`).join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
    },
  };
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(__dirname, 'src/assets', filename);
      }
    },
  };
}

export default defineConfig({
  plugins: [
    seoPages(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
});
