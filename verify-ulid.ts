import { extractUlid } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyUlidAction = makePaidAction({
  name: "VERIFY_ULID",
  similes: ["ULID_LOOKUP", "CHECK_ULID", "ULID_VERIFY"],
  description:
    "Validate ULID format and extract its timestamp. Provide the ulid. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractUlid(text);
    return v ? `/verify/ulid?ulid=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_ULID needs a 26-character ULID in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate ULID 01ARZ3NDEKTSV4RRFFQ69G5FAV" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_ULID"] },
      },
    ],
  ],
});
