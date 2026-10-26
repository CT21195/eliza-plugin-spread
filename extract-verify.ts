/** Extractors for the /verify/* endpoints. Message-text -> param value or null. */
import { extractAfter, extractBaseAddress, extractSolanaAddress } from "./extract.js";


/** First IBAN in the text. */
export function extractIban(text: string): string | null {
  const m = text.match(/\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/i); return m ? m[0].toUpperCase() : null;
}

/** First US bank routing number in the text. */
export function extractRouting(text: string): string | null {
  const kw = extractAfter(text, 'routing', 'aba'); if (kw && /^\d{9}$/.test(kw)) return kw; const m = text.match(/\b\d{9}\b/); return m ? m[0] : null;
}

/** First credit card number in the text. */
export function extractCardNumber(text: string): string | null {
  const kw = extractAfter(text, 'card', 'cc', 'pan'); if (kw && /^\d{12,19}$/.test(kw.replace(/[\s-]/g,''))) return kw.replace(/[\s-]/g,''); const m = text.match(/\b\d{13,19}\b/); return m ? m[0] : null;
}

/** First SWIFT/BIC code in the text. */
export function extractSwift(text: string): string | null {
  const m = text.match(/\b[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?\b/); return m ? m[0].toUpperCase() : null;
}

/** First ISIN in the text. */
export function extractIsin(text: string): string | null {
  const m = text.match(/\b[A-Z]{2}[A-Z0-9]{9}\d\b/i); return m ? m[0].toUpperCase() : null;
}

/** First CUSIP in the text. */
export function extractCusip(text: string): string | null {
  const kw = extractAfter(text, 'cusip'); if (kw && /^[0-9A-Z*@#]{9}$/i.test(kw)) return kw.toUpperCase(); const m = text.match(/\bcusip\s*[:=]?\s*([0-9A-Z*@#]{9})\b/i); return m ? m[1].toUpperCase() : null;
}

/** First SEDOL in the text. */
export function extractSedol(text: string): string | null {
  const m = text.match(/\bsedol\s*[:=]?\s*([0-9A-Z]{7})\b/i); if (m) return m[1].toUpperCase(); const kw = extractAfter(text, 'sedol'); return kw && /^[0-9A-Z]{7}$/i.test(kw) ? kw.toUpperCase() : null;
}

/** First UPI ID in the text. */
export function extractUpi(text: string): string | null {
  const m = text.match(/[\w.\-]{2,256}@[a-zA-Z]{2,64}\b/); return m ? m[0] : null;
}

/** First EU VAT number in the text. */
export function extractVat(text: string): string | null {
  const m = text.match(/\b[A-Z]{2}[0-9A-Z][0-9A-Z.\-]{6,13}\b/i); return m ? m[0].toUpperCase().replace(/[\s.\-]/g,'') : null;
}

/** First US EIN in the text. */
export function extractEin(text: string): string | null {
  const m = text.match(/\b\d{2}-?\d{7}\b/); return m ? m[0] : null;
}

/** First LEI code in the text. */
export function extractLei(text: string): string | null {
  const m = text.match(/\b[A-Z0-9]{20}\b/i); return m ? m[0].toUpperCase() : null;
}

/** First US SSN in the text. */
export function extractSsn(text: string): string | null {
  const m = text.match(/\b\d{3}-?\d{2}-?\d{4}\b/); return m ? m[0] : null;
}

/** First passport MRZ in the text. */
export function extractMrz(text: string): string | null {
  const lines = text.split(/\n/).map(l => l.trim()).filter(l => /^[A-Z0-9<]{44}$/.test(l)); if (lines.length >= 2) return lines.slice(0,2).join('\n'); return null;
}

/** First UK National Insurance number in the text. */
export function extractNino(text: string): string | null {
  const m = text.match(/\b[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]\b/i); return m ? m[0].toUpperCase() : null;
}

/** First Canadian SIN in the text. */
export function extractSin(text: string): string | null {
  const kw = extractAfter(text, 'sin'); if (kw && /^\d{9}$/.test(kw)) return kw; const m = text.match(/\bsin\s*[:=]?\s*(\d{9})\b/i); return m ? m[1] : null;
}

/** First UPC barcode in the text. */
export function extractUpc(text: string): string | null {
  const kw = extractAfter(text, 'upc'); if (kw && /^\d{8}$|^\d{12}$/.test(kw)) return kw; const m = text.match(/\b\d{12}\b/); return m ? m[0] : null;
}

/** First EAN barcode in the text. */
export function extractEan(text: string): string | null {
  const kw = extractAfter(text, 'ean'); if (kw && /^\d{8}$|^\d{13}$/.test(kw)) return kw; const m = text.match(/\b\d{13}\b/); return m ? m[0] : null;
}

/** First ISBN in the text. */
export function extractIsbn(text: string): string | null {
  const m = text.match(/\b(?:\d{13}|\d{9}[\dX])\b/i); return m ? m[0].toUpperCase() : null;
}

/** First VIN in the text. */
export function extractVin(text: string): string | null {
  const m = text.match(/\b[A-HJ-NPR-Z0-9]{17}\b/i); return m ? m[0].toUpperCase() : null;
}

/** First USPS tracking number in the text. */
export function extractUsps(text: string): string | null {
  const m = text.match(/\b\d{20}\b|\b\d{22}\b|\b\d{26}\b|\b\d{30}\b/); return m ? m[0] : null;
}

/** First UPS tracking number in the text. */
export function extractUps(text: string): string | null {
  const m = text.match(/\b1Z[0-9A-Z]{16}\b/i); return m ? m[0].toUpperCase() : null;
}

/** First FedEx tracking number in the text. */
export function extractFedex(text: string): string | null {
  const kw = extractAfter(text, 'fedex'); if (kw && /^\d{12}$|^\d{15}$|^\d{20}$|^\d{22}$/.test(kw)) return kw; const m = text.match(/\bfedex\s*[:=]?\s*(\d{12,22})\b/i); return m ? m[1] : null;
}

/** First IMEI in the text. */
export function extractImei(text: string): string | null {
  const m = text.match(/\b\d{15}\b/); return m ? m[0] : null;
}

/** First MEID in the text. */
export function extractMeid(text: string): string | null {
  const m = text.match(/\b[0-9A-F]{14,15}\b/i); return m ? m[0].toUpperCase() : null;
}

/** First shipping container code in the text. */
export function extractContainer(text: string): string | null {
  const m = text.match(/\b[A-Z]{4}\d{7}\b/i); return m ? m[0].toUpperCase() : null;
}

/** First email address in the text. */
export function extractEmail(text: string): string | null {
  const m = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/); return m ? m[0] : null;
}

/** First domain name in the text. */
export function extractDomain(text: string): string | null {
  const kw = extractAfter(text, 'domain'); if (kw && /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(kw)) return kw.toLowerCase(); const m = text.match(/\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/i); return m ? m[0].toLowerCase() : null;
}

/** First IPv4 address in the text. */
export function extractIpv4(text: string): string | null {
  const m = text.match(/\b\d{1,3}(\.\d{1,3}){3}\b/); return m ? m[0] : null;
}

/** First IPv6 address in the text. */
export function extractIpv6(text: string): string | null {
  const m = text.match(/(?<![0-9a-fA-F:.])([0-9a-fA-F]*:[0-9a-fA-F:]*:[0-9a-fA-F:]*)(?![0-9a-fA-F:.])/);
  if (m && m[1].includes(':')) return m[1];
  return null;
}

/** First MAC address in the text. */
export function extractMac(text: string): string | null {
  const m = text.match(/\b([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b|\b[0-9A-Fa-f]{12}\b/); return m ? m[0] : null;
}

/** First AS number in the text. */
export function extractAsn(text: string): string | null {
  const m = text.match(/\bAS\d+\b/i); if (m) return m[0].toUpperCase(); const kw = extractAfter(text, 'asn'); return kw && /^\d+$/.test(kw) ? 'AS' + kw : null;
}

/** First phone number in the text. */
export function extractE164(text: string): string | null {
  const m = text.match(/\+\d{8,15}/); return m ? m[0] : null;
}

/** First password to breach-check in the text. */
export function extractPassword(text: string): string | null {
  const m = text.match(/\bpassword\s*[:=]?\s*(\S+)/i); return m ? m[1] : null;
}

/** First JWT in the text. */
export function extractJwt(text: string): string | null {
  const m = text.match(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/); return m ? m[0] : null;
}

/** First base64 string in the text. */
export function extractBase64Data(text: string): string | null {
  const m = text.match(/\bbase64\s*[:=]?\s*([A-Za-z0-9+/=]{8,})\b/i); if (m) return m[1]; const m2 = text.match(/\b(?:[A-Za-z0-9+/]{4})+(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?\b/); return m2 && m2[0].length >= 8 ? m2[0] : null;
}

/** First MD5 hash in the text. */
export function extractMd5(text: string): string | null {
  const m = text.match(/\b[0-9a-f]{32}\b/i); return m ? m[0].toLowerCase() : null;
}

/** First SHA-256 hash in the text. */
export function extractSha256(text: string): string | null {
  const m = text.match(/\b[0-9a-f]{64}\b/i); return m ? m[0].toLowerCase() : null;
}

/** First UUID in the text. */
export function extractUuid(text: string): string | null {
  const m = text.match(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i); return m ? m[0].toLowerCase() : null;
}

/** First ULID in the text. */
export function extractUlid(text: string): string | null {
  const m = text.match(/\b[0-9A-HJKMNP-TV-Z]{26}\b/i); return m ? m[0].toUpperCase() : null;
}

/** First Bitcoin address in the text. */
export function extractBtcAddress(text: string): string | null {
  const m = text.match(/\b(bc1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{11,71}|[13][1-9A-HJ-NP-Za-km-z]{25,34})\b/); return m ? m[0] : null;
}

/** First Polkadot address in the text. */
export function extractPolkadotAddress(text: string): string | null {
  const m = text.match(/\b[1-9A-HJ-NP-Za-km-z]{46,49}\b/); return m ? m[0] : null;
}

/** First ENS name in the text. */
export function extractEns(text: string): string | null {
  const m = text.match(/\b[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+/i); return m ? m[0].toLowerCase() : null;
}

/** First version string in the text. */
export function extractSemver(text: string): string | null {
  const m = text.match(/\bv?\d+\.\d+\.\d+(?:-[0-9a-zA-Z.-]+)?(?:\+[0-9a-zA-Z.-]+)?\b/); return m ? m[0] : null;
}

/** First cron expression in the text. */
export function extractCron(text: string): string | null {
  const m = text.match(/\bcron\s*[:=]?\s*([*\/\d,\-\s]+)/i); if (m) { const f = m[1].trim().split(/\s+/); if (f.length === 5 || f.length === 6) return f.join(' '); } return null;
}

/** First JSON text in the text. */
export function extractJson(text: string): string | null {
  const m = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/); return m ? m[0] : null;
}

/** Smart-contract code snippet: fenced code block preferred, else the message minus trigger words. */
export function extractContract(text: string): string | null {
  const fence = text.match(/```(?:\w+)?\n([\s\S]*?)```/);
  if (fence && fence[1].trim().length >= 10) return fence[1].trim().slice(0, 10000);
  const stripped = text.replace(/\b(check|scan|lint|audit|analyze|analyse|review)\b[^.\n]*contract[^.\n]*:?/gi, "").trim();
  return stripped.length >= 10 ? stripped.slice(0, 10000) : null;
}
