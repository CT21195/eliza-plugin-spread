import { extractDea } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const verifyDeaAction = makePaidAction({
  name: "VERIFY_DEA",
  similes: ["DEA_LOOKUP", "CHECK_DEA", "DEA_VERIFY", "VERIFY_PRESCRIBER", "DEA_SEARCH"],
  description:
    "Validate the format of a DEA registration number. Provide the DEA number (2 letters + 7 digits). Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const dea = extractDea(text);
    return dea ? `/verify/dea?dea=${encodeURIComponent(dea)}` : null;
  },
  missingHint: "VERIFY_DEA needs a DEA number (2 letters + 7 digits) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Check DEA number AB1234567" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll validate that DEA number.", actions: ["VERIFY_DEA"] },
      },
    ],
  ],
});
