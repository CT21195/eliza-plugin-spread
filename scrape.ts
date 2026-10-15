import { extractUrl } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const scrapeAction = makePaidAction({
  name: "SCRAPE_URL",
  similes: ["SCRAPE", "FETCH_URL", "WEB_SCRAPE", "GET_PAGE", "SCRAPE_PAGE"],
  description:
    "Scrape a web page and return its text content. Provide a URL. Costs $0.01 USDC per call (x402, Base).",
  buildPath: (text) => {
    const url = extractUrl(text);
    return url ? `/scrape?url=${encodeURIComponent(url)}` : null;
  },
  missingHint: "SCRAPE_URL needs a URL in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Scrape https://example.com for me" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll scrape that page.", actions: ["SCRAPE_URL"] },
      },
    ],
  ],
});
