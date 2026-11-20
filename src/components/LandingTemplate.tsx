import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, ShieldAlert } from 'lucide-react';
import { LANDING_LIST, LandingPage } from '../seo/landingData';
import { usePageSeo } from '../utils/usePageSeo';

/**
 * Shared layout for the SEO landing pages. Uses the site's existing design tokens/classes
 * (card, btn, text-muted, ...) so the pages match the rest of the app. `children` is the QR tool.
 */
export default function LandingTemplate({ page, children }: { page: LandingPage; children: ReactNode }) {
  usePageSeo(page);
  const id = (s: string) => `${page.slug}-${s}`;
  const others = LANDING_LIST.filter((p) => p.slug !== page.slug);
  const h2 = 'text-2xl font-bold';

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link to="/" className="hover:text-ink hover:underline">Home</Link></li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li aria-current="page" className="font-medium text-ink">{page.navLabel}</li>
        </ol>
      </nav>

      <header>
        <h1 className="text-3xl font-bold">{page.h1}</h1>
        <p className="mb-6 mt-2 max-w-3xl text-muted">{page.intro}</p>
      </header>

      {page.notice && (
        <p className="mb-6 flex gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          <ShieldAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {page.notice}
        </p>
      )}

      <section aria-labelledby={id('tool')}>
        <h2 id={id('tool')} className="sr-only">{page.toolHeading}</h2>
        {children}
      </section>

      <div className="mt-14 space-y-12">
        <section aria-labelledby={id('steps')}>
          <h2 id={id('steps')} className={h2}>{page.stepsHeading}</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {page.steps.map((s, i) => (
              <li key={s.title} className="card flex gap-3">
                <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby={id('benefits')}>
          <h2 id={id('benefits')} className={h2}>{page.benefitsHeading}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {page.benefits.map((b) => (
              <li key={b.title} className="card">
                <Check className="text-accent" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={id('uses')}>
          <h2 id={id('uses')} className={h2}>{page.useCasesHeading}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.useCases.map((u) => (
              <li key={u.title} className="card">
                <h3 className="font-semibold">{u.title}</h3>
                <p className="mt-1 text-sm text-muted">{u.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={id('tips')}>
          <h2 id={id('tips')} className={h2}>{page.tipsHeading}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted">
            {page.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>

        <section aria-labelledby={id('faq')}>
          <h2 id={id('faq')} className={h2}>{page.faqHeading}</h2>
          <div className="mt-4 space-y-2">
            {page.faqs.map((f) => (
              <details key={f.q} className="card">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby={id('more')}>
          <h2 id={id('more')} className={h2}>More QR code generators</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link to={p.path} className="card block h-full transition hover:-translate-y-0.5 hover:border-primary">
                  <h3 className="font-semibold">{p.navLabel} Generator</h3>
                  <p className="mt-1 text-sm text-muted">{p.cardBlurb}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Need a different type of code? Visit the <Link to="/" className="font-medium text-primary underline">QR Code Studio homepage</Link> to see every tool.
          </p>
        </section>
      </div>
    </article>
  );
}
