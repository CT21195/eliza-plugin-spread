/** Small helpers to pull endpoint parameters out of agent message text. */

/** First base58 string that looks like a Solana address (32-44 chars). */
export function extractSolanaAddress(text: string): string | null {
  const m = text.match(/\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/);
  return m ? m[0] : null;
}

/** First 0x-prefixed Base/EVM contract address (0x + 40 hex chars). */
export function extractBaseAddress(text: string): string | null {
  const m = text.match(/\b0x[0-9a-fA-F]{40}\b/);
  return m ? m[0] : null;
}

/** All 0x EVM addresses in the text, in order. */
export function extractBaseAddresses(text: string): string[] {
  return [...text.matchAll(/\b0x[0-9a-fA-F]{40}\b/g)].map(m => m[0]);
}

/** All base58 strings that look like Solana addresses, in order. */
export function extractSolanaAddresses(text: string): string[] {
  return [...text.matchAll(/\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g)].map(m => m[0]);
}

/** First http(s) URL in the text. */
export function extractUrl(text: string): string | null {
  const m = text.match(/https?:\/\/[^\s)>"']+/);
  return m ? m[0].replace(/[.,;!?]+$/, "") : null;
}

/** Token after a keyword, e.g. keyword "symbol" in "symbol TSLA". */
export function extractAfter(text: string, ...keywords: string[]): string | null {
  for (const kw of keywords) {
    const m = text.match(new RegExp(`${kw}\\s*[:=]?\\s*([A-Za-z0-9._-]+)`, "i"));
    if (m) return m[1];
  }
  return null;
}

/** NPI is a 10-digit number. */
export function extractNpi(text: string): string | null {
  const m = text.match(/\b\d{10}\b/);
  return m ? m[0] : null;
}

/** DEA numbers are 2 letters + 7 digits, e.g. AB1234567. */
export function extractDea(text: string): string | null {
  const m = text.match(/\b[A-Z]{2}\d{7}\b/i);
  return m ? m[0].toUpperCase() : null;
}

/** Stock-ish symbol: 1-5 uppercase letters, optionally prefixed with $. */
export function extractSymbol(text: string): string | null {
  const m = text.match(/\$?([A-Z]{1,5})\b/);
  return m ? m[1] : null;
}
