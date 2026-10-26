import { extractContract } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyContractAction = makePaidAction({
  name: "VERIFY_CONTRACT",
  similes: ["CONTRACT_LINT", "SCAN_CONTRACT", "CONTRACT_AUDIT", "CHECK_SMART_CONTRACT"],
  description:
    "Surface-level smart-contract vulnerability linter: flags dangerous Solidity/Rust patterns (selfdestruct, delegatecall, tx.origin, block.timestamp, unsafe blocks, missing signer checks). Provide the code snippet, ideally in a code block. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractContract(text);
    return v ? `/verify/contract?code=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_CONTRACT needs a smart-contract code snippet in the message (paste it in a code block).",
  examples: [
    [
      { name: "{{user}}", content: { text: "Scan this contract for issues:\n```solidity\nfunction kill() public { selfdestruct(payable(owner)); }\n```" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_CONTRACT"] },
      },
    ],
  ],
});
