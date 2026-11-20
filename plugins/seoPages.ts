import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { LANDING_LIST, SITE_URL, SITE_NAME, LandingPage } from '../src/seo/landingData';
import { buildJsonLd } from '../src/seo/jsonLd';

/**
 * After `vite build`, writes dist/<route>/index.html for every SEO landing page.
 * Each copy of the built index.html gets that page's own <title>, meta description, canonical,
 * Open Graph / Twitter tags and JSON-LD, so crawlers see correct metadata in the raw HTML
 * (no JavaScript rendering needed). The React app still takes over in the browser as usual.
 * The homepage's dist/index.html is left untouched.
 */
const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const text = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html: string, key: 'name' | 'property', name: string, content: string) {
  const tag = `<meta ${key}="${name}" content="${attr(content)}" />`;
  const re = new RegExp(`<meta\\s+${key}="${name}"[^>]*>`, 'i');
  return re.test(html) ? html.replace(re, () => tag) : html.replace('</head>', () => `    ${tag}\n  </head>`);
}

function render(base: string, p: LandingPage) {
  const url = SITE_URL + p.path;
  let html = base;
  html = /<title>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${text(p.title)}</title>`)
    : html.replace('</head>', () => `    <title>${text(p.title)}</title>\n  </head>`);
  html = setMeta(html, 'name', 'description', p.description);
  html = setMeta(html, 'property', 'og:title', p.title);
  html = setMeta(html, 'property', 'og:description', p.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', p.title);
  html = setMeta(html, 'name', 'twitter:description', p.description);

  const canonical = `<link rel="canonical" href="${attr(url)}" />`;
  html = /<link\s+rel="canonical"[^>]*>/i.test(html)
    ? html.replace(/<link\s+rel="canonical"[^>]*>/i, () => canonical)
    : html.replace('</head>', () => `    ${canonical}\n  </head>`);

  const ld = buildJsonLd(p)
    .map((o) => `    <script type="application/ld+json" data-seo-ld>${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  html = html.replace('</head>', () => `${ld}\n  </head>`);

  const links = LANDING_LIST.map((l) => `<a href="${attr(l.path)}">${text(l.navLabel)} Generator</a>`).join(' · ');
  const fallback =
    `<noscript><h1>${text(p.h1)}</h1><p>${text(p.intro)}</p>` +
    `<p>${text(SITE_NAME)} needs JavaScript enabled to generate QR codes in your browser.</p>` +
    `<nav aria-label="QR code generators"><a href="/">Home</a> · ${links}</nav></noscript>`;
  html = html.replace('<div id="root"></div>', () => `<div id="root"></div>\n    ${fallback}`);
  return html;
}

export function seoPages(): Plugin {
  let outDir = '';
  return {
    name: 'seo-landing-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = resolve(outDir, 'index.html');
      if (!existsSync(indexPath)) return;
      const base = readFileSync(indexPath, 'utf8');
      for (const p of LANDING_LIST) {
        const dir = resolve(outDir, p.path.replace(/^\//, ''));
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'index.html'), render(base, p));
      }
      // eslint-disable-next-line no-console
      console.log(`[seo-landing-pages] prerendered metadata for ${LANDING_LIST.length} pages`);
    },
  };
}
