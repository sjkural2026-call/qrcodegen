import { LandingPage, SITE_URL } from './landingData';

/**
 * BreadcrumbList + FAQPage structured data.
 * FAQ text is generated from the same data that renders the visible FAQ section,
 * so markup and page content always match (a Google structured-data requirement).
 */
export function buildJsonLd(p: LandingPage) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: p.navLabel, item: `${SITE_URL}${p.path}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
}
