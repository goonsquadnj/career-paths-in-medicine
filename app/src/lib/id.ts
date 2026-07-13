// Small helper for generating client-side-only ids (list items in a
// localStorage-persisted store, etc.) — not used for anything security- or
// server-sensitive, just stable React keys.
export function randomId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}
