import { extractJwt } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyJwtAction = makePaidAction({
  name: "VERIFY_JWT",
  similes: ["JWT_LOOKUP", "CHECK_JWT", "JWT_DECODE"],
  description:
    "Structurally decode a JWT and check expiry (signature not verified). Provide the jwt. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractJwt(text);
    return v ? `/verify/jwt?token=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_JWT needs a JWT in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Decode this JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_JWT"] },
      },
    ],
  ],
});
