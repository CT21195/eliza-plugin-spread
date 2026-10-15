import { extractSemver } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifySemverAction = makePaidAction({
  name: "VERIFY_SEMVER",
  similes: ["SEMVER_LOOKUP", "CHECK_SEMVER", "VERSION_VERIFY"],
  description:
    "Validate Semantic Versioning 2.0.0 format. Provide the version string. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractSemver(text);
    return v ? `/verify/semver?version=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SEMVER needs a version string in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate version 2.0.0-beta.1" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SEMVER"] },
      },
    ],
  ],
});
