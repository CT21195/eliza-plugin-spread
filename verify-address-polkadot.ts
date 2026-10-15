import { extractPolkadotAddress } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyPolkadotAddressAction = makePaidAction({
  name: "VERIFY_POLKADOT_ADDRESS",
  similes: ["POLKADOT_ADDRESS_LOOKUP", "CHECK_POLKADOT_ADDRESS"],
  description:
    "Validate a Polkadot/Substrate ss58 address checksum. Provide the polkadot address. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractPolkadotAddress(text);
    return v ? `/verify/address/polkadot?address=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_POLKADOT_ADDRESS needs a Polkadot ss58 address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate Polkadot address 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_POLKADOT_ADDRESS"] },
      },
    ],
  ],
});
