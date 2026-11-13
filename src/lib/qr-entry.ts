import { cafes, cats } from '../data/seed';
export const resolveCafe = (id: string) => cafes.find(c => c.id === (id === 'pawbrew' ? 'paw-macau' : id));
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NEXT_PUBLIC_BASE_PATH ? 'https://knighty-hub-hit.github.io'+process.env.NEXT_PUBLIC_BASE_PATH : 'http://localhost:3000');
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Site URL must use HTTP or HTTPS');
  return url.origin + url.pathname.replace(/\/$/,'');
}
export function qrTarget(kind: string, id: string) {
  if (kind === 'cafe' ? !resolveCafe(id) : !cats.some(c => c.id === id)) throw new Error('Unknown QR destination');
  return siteUrl() + (kind === 'cafe' ? '/enter/?cafe=' + encodeURIComponent(id) : '/cats/' + encodeURIComponent(id) + '/?source=qr');
}
export type EntryEvent = { cafeId: string; catId?: string; source: 'QR'; timestamp: string };
export interface EntryAnalytics { record(event: EntryEvent): void | Promise<void> }
export const localEntryAnalytics: EntryAnalytics = {
  record(event) {
    try {
      const value = JSON.parse(localStorage.getItem('paw-qr-events') || '[]');
      const events = Array.isArray(value) ? value : [];
      localStorage.setItem('paw-qr-events', JSON.stringify([...events.slice(-499), event]));
    } catch { /* Browsing remains available when storage is blocked. */ }
  }
};
