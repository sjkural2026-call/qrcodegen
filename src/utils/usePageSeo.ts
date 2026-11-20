import { useEffect } from 'react';
import { LandingPage, SITE_URL } from '../seo/landingData';
import { buildJsonLd } from '../seo/jsonLd';

/** Set an attribute on a head element (creating it if needed). Returns a function that restores the old state. */
function setHead(selector: string, make: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  let created = false;
  if (!el) { el = make(); document.head.appendChild(el); created = true; }
  const prev = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => {
    if (created) el!.remove();
    else if (prev === null) el!.removeAttribute(attr);
    else el!.setAttribute(attr, prev);
  };
}

const meta = (key: 'name' | 'property', value: string) => () => {
  const m = document.createElement('meta');
  m.setAttribute(key, value);
  return m;
};

/**
 * Per-page SEO for the landing pages: title, description, absolute canonical,
 * Open Graph / Twitter tags and JSON-LD. The same values are also written into the
 * static HTML at build time (plugins/seoPages.ts); this hook keeps client-side
 * navigation and `vite dev` consistent, and restores previous values on unmount.
 */
export function usePageSeo(page: LandingPage) {
  useEffect(() => {
    const url = SITE_URL + page.path;
    const prevTitle = document.title;
    document.title = page.title;

    const undo = [
      setHead('meta[name="description"]', meta('name', 'description'), 'content', page.description),
      setHead('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l; }, 'href', url),
      setHead('meta[property="og:title"]', meta('property', 'og:title'), 'content', page.title),
      setHead('meta[property="og:description"]', meta('property', 'og:description'), 'content', page.description),
      setHead('meta[property="og:url"]', meta('property', 'og:url'), 'content', url),
      setHead('meta[name="twitter:title"]', meta('name', 'twitter:title'), 'content', page.title),
      setHead('meta[name="twitter:description"]', meta('name', 'twitter:description'), 'content', page.description),
    ];

    // Replace any prerendered JSON-LD with an identical fresh copy so it is never duplicated.
    document.head.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
    buildJsonLd(page).forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo-ld', '');
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });

    return () => {
      document.title = prevTitle;
      undo.forEach((fn) => fn());
      document.head.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
    };
  }, [page]);
}
