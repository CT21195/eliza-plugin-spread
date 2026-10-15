import { extractContainer } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyContainerAction = makePaidAction({
  name: "VERIFY_CONTAINER",
  similes: ["CONTAINER_LOOKUP", "CHECK_CONTAINER", "CONTAINER_VERIFY"],
  description:
    "Validate an ISO 6346 shipping container code check digit. Provide the shipping container code. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractContainer(text);
    return v ? `/verify/container?container=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_CONTAINER needs an ISO 6346 container code in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate container CSQU3054383" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_CONTAINER"] },
      },
    ],
  ],
});
