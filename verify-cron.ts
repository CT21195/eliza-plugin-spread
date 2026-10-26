import { extractCron } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyCronAction = makePaidAction({
  name: "VERIFY_CRON",
  similes: ["CRON_LOOKUP", "CHECK_CRON", "CRON_VERIFY"],
  description:
    "Validate a cron expression and compute the next run time. Provide the cron expression. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractCron(text);
    return v ? `/verify/cron?cron=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_CRON needs a cron expression after the word 'cron' in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate cron: */5 * * * *" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_CRON"] },
      },
    ],
  ],
});
