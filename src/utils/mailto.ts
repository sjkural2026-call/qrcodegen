/** Email (mailto:) QR payload helpers. Kept separate from qr.ts so the existing generator utilities are untouched. */

export interface EmailFields { to: string; subject: string; body: string }

// Deliberately strict: no "?", "&", "," or whitespace, so a typed address can never inject extra mailto parameters or recipients.
const EMAIL_RE = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export const EMAIL_LIMITS = { to: 254, subject: 150, body: 500 } as const;

/** Returns an error message, or '' when the fields are valid. */
export function validateEmailFields(f: EmailFields): string {
  const to = f.to.trim();
  if (!to) return 'Enter the email address that should receive the message.';
  if (to.length > EMAIL_LIMITS.to || !EMAIL_RE.test(to)) return 'Enter a valid email address, e.g. name@example.com.';
  if (f.subject.length > EMAIL_LIMITS.subject) return `The subject can be at most ${EMAIL_LIMITS.subject} characters.`;
  if (f.body.length > EMAIL_LIMITS.body) return `The message can be at most ${EMAIL_LIMITS.body} characters.`;
  return '';
}

export function mailtoPayload(f: EmailFields): string {
  const params: string[] = [];
  const subject = f.subject.replace(/[\r\n]+/g, ' ').trim();
  const body = f.body.trim().replace(/\r?\n/g, '\r\n'); // RFC 6068: line breaks in the body are CRLF, percent-encoded
  if (subject) params.push('subject=' + encodeURIComponent(subject));
  if (body) params.push('body=' + encodeURIComponent(body));
  return 'mailto:' + f.to.trim() + (params.length ? '?' + params.join('&') : '');
}
