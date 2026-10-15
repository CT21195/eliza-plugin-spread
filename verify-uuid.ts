import { extractUuid } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyUuidAction = makePaidAction({
  name: "VERIFY_UUID",
  similes: ["UUID_LOOKUP", "CHECK_UUID", "UUID_VERIFY"],
  description:
    "Validate UUID structure and detect the version. Provide the uuid. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractUuid(text);
    return v ? `/verify/uuid?uuid=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_UUID needs a UUID in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate UUID 550e8400-e29b-41d4-a716-446655440000" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_UUID"] },
      },
    ],
  ],
});
