import { extractJson } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyJsonAction = makePaidAction({
  name: "VERIFY_JSON",
  similes: ["JSON_LOOKUP", "CHECK_JSON", "JSON_VALIDATE"],
  description:
    "Strictly validate JSON and pinpoint syntax errors. Provide the json text. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractJson(text);
    return v ? `/verify/json?json=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_JSON needs JSON text in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate JSON {\"a\": 1}" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_JSON"] },
      },
    ],
  ],
});
