import { useEffect } from 'react';

export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    m.content = description;
    let l = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!l) { l = document.createElement('link'); l.rel = 'canonical'; document.head.appendChild(l); }
    l.href = window.location.origin + window.location.pathname;
  }, [title, description]);
}
