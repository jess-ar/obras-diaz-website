import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const output = 'dist';
const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(urls.length >= 5, 'Missing public pages in sitemap');
assert.equal(urls.length, new Set(urls).size, 'Duplicate sitemap URLs');
const origin = 'https://obras-diaz.vercel.app';
const titles = new Set();
const pages = readdirSync(output, { recursive: true }).filter((file) => file.endsWith('.html'));

for (const file of pages) {
  const html = readFileSync(join(output, file), 'utf8');
  const title = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(title.length, 1, `Expected one title in ${file}`);
  assert(!titles.has(title[0][1]), `Duplicate title in ${file}`);
  titles.add(title[0][1]);
  const canonical = [...html.matchAll(/<link rel="canonical" href="(.*?)"/g)];
  assert.equal(canonical.length, 1, `Expected one canonical URL in ${file}`);
  assert(canonical[0][1].startsWith(origin), `Wrong canonical domain in ${file}`);
  assert.match(html, /<meta name="description" content="[^"\n]+"/);
  const structuredData = html.match(/<script id="seo-structured-data" type="application\/ld\+json">(.*?)<\/script>/);
  assert(structuredData, `Missing JSON-LD in ${file}`);
  const schema = JSON.parse(structuredData[1]);
  assert.equal(schema['@context'], 'https://schema.org');
  assert(schema['@graph'].some((item) => item['@type'] === 'Organization'));
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"\n]+)"/g)) {
    assert(existsSync(join(output, asset.slice(1))), `Missing asset ${asset}`);
  }
}

for (const url of urls) {
  assert(url.startsWith(origin), `Wrong sitemap domain: ${url}`);
  const path = new URL(url).pathname;
  const file = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
  const html = readFileSync(join(output, file), 'utf8');
  assert(html.includes(`href="${url}"`), `Wrong canonical for ${url}`);
  assert(!html.includes('noindex'), `Sitemap contains a noindex page: ${url}`);
  const image = html.match(/property="og:image" content="(.*?)"/)[1];
  assert(existsSync(join('public', new URL(image).pathname.slice(1))), `Missing share image: ${image}`);
}
for (const file of ['privacidad/index.html', 'cookies/index.html', 'aviso-legal/index.html', '404.html']) {
  assert(readFileSync(join(output, file), 'utf8').includes('noindex, follow'));
}
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
for (const rewrite of config.rewrites.filter((item) => !item.destination.includes(':'))) {
  assert(existsSync(join(output, rewrite.destination.slice(1))), `Missing rewrite destination: ${rewrite.destination}`);
}
assert(readFileSync(join(output, 'robots.txt'), 'utf8').includes(`Sitemap: ${origin}/sitemap.xml`));
console.log(`SEO verified: ${pages.length} HTML pages and ${urls.length} sitemap URLs.`);
