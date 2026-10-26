/**
 * eliza-plugin-spread — ElizaOS plugin routing agent tool calls into the
 * Spread Paywall API (127 pay-per-call x402 endpoints, settled in USDC on Base).
 *
 * Each action extracts its query params from the agent's message text and pays
 * per call via x402 v2 (EIP-3009 TransferWithAuthorization signed by the key in
 * SPREAD_API_EVM_KEY). No gas needed — the facilitator settles on-chain.
 */
import type { Plugin } from "@elizaos/core";
import { spreadAction } from "./spread.js";
import { baseSpreadAction } from "./base-spread.js";
import { chainBalanceAction } from "./chain-balance.js";
import { chainErc20BalanceAction } from "./chain-erc20-balance.js";
import { chainBlockNumberAction } from "./chain-block-number.js";
import { chainSolBalanceAction } from "./chain-sol-balance.js";
import { chainSplBalanceAction } from "./chain-spl-balance.js";
import { chainSlotAction } from "./chain-slot.js";
import { whaleWatchAction } from "./whale-watch.js";
import { solanaAuditAction } from "./solana-audit.js";
import { walletPortfolioAction } from "./wallet-portfolio.js";
import { pumpTrendingAction } from "./pump-trending.js";
import { pumpMigratingAction } from "./pump-migrating.js";
import { stocksPriceAction } from "./stocks-price.js";
import { scrapeAction } from "./scrape.js";
import { verifyNpiAction } from "./verify-npi.js";
import { verifyDeaAction } from "./verify-dea.js";
import { verifyIbanAction } from "./verify-iban.js";
import { verifyRoutingAction } from "./verify-routing.js";
import { verifyCardAction } from "./verify-card.js";
import { verifyContractAction } from "./verify-contract.js";
import { verifySwiftAction } from "./verify-swift.js";
import { verifyIsinAction } from "./verify-isin.js";
import { verifyCusipAction } from "./verify-cusip.js";
import { verifySedolAction } from "./verify-sedol.js";
import { verifyUpiAction } from "./verify-upi.js";
import { verifyVatAction } from "./verify-vat.js";
import { verifyEinAction } from "./verify-ein.js";
import { verifyLeiAction } from "./verify-lei.js";
import { verifySsnAction } from "./verify-ssn.js";
import { verifyPassportMrzAction } from "./verify-passport-mrz.js";
import { verifyNinoAction } from "./verify-nino.js";
import { verifySinAction } from "./verify-sin.js";
import { verifyUpcAction } from "./verify-upc.js";
import { verifyEanAction } from "./verify-ean.js";
import { verifyIsbnAction } from "./verify-isbn.js";
import { verifyVinAction } from "./verify-vin.js";
import { verifyUspsAction } from "./verify-usps.js";
import { verifyUpsAction } from "./verify-ups.js";
import { verifyFedexAction } from "./verify-fedex.js";
import { verifyImeiAction } from "./verify-imei.js";
import { verifyMeidAction } from "./verify-meid.js";
import { verifyContainerAction } from "./verify-container.js";
import { verifyEmailAction } from "./verify-email.js";
import { verifyDomainAction } from "./verify-domain.js";
import { verifySslAction } from "./verify-ssl.js";
import { verifyIpv4Action } from "./verify-ipv4.js";
import { verifyIpv6Action } from "./verify-ipv6.js";
import { verifyMacAction } from "./verify-mac.js";
import { verifyAsnAction } from "./verify-asn.js";
import { verifyE164Action } from "./verify-e164.js";
import { verifyPwnedAction } from "./verify-pwned.js";
import { verifyJwtAction } from "./verify-jwt.js";
import { verifyBase64Action } from "./verify-base64.js";
import { verifyMd5Action } from "./verify-hash-md5.js";
import { verifySha256Action } from "./verify-hash-sha256.js";
import { verifyUuidAction } from "./verify-uuid.js";
import { verifyUlidAction } from "./verify-ulid.js";
import { verifyEvmAddressAction } from "./verify-address-evm.js";
import { verifySolanaAddressAction } from "./verify-address-solana.js";
import { verifyBtcAddressAction } from "./verify-address-btc.js";
import { verifyPolkadotAddressAction } from "./verify-address-polkadot.js";
import { verifyEnsAction } from "./verify-ens.js";
import { verifySemverAction } from "./verify-semver.js";
import { verifyCronAction } from "./verify-cron.js";
import { verifyJsonAction } from "./verify-json.js";

export const spreadPlugin: Plugin = {
  name: "spread",
  description:
    "Pay-per-call data endpoints (SOL spreads, Base DEX spreads, chain balances and block height, whale watching, token audits, pump.fun, tokenized stocks, scraping, and 50 verification tools: IBAN, VIN, crypto addresses, email, domains, JWT, and more) paid in USDC on Base via x402.",
  actions: [
    spreadAction,
    baseSpreadAction,
    chainBalanceAction,
    chainErc20BalanceAction,
    chainBlockNumberAction,
    chainSolBalanceAction,
    chainSplBalanceAction,
    chainSlotAction,
    whaleWatchAction,
    solanaAuditAction,
    walletPortfolioAction,
    pumpTrendingAction,
    pumpMigratingAction,
    stocksPriceAction,
    scrapeAction,
    verifyNpiAction,
    verifyDeaAction,
    verifyIbanAction,
    verifyRoutingAction,
    verifyCardAction,
    verifyContractAction,
    verifySwiftAction,
    verifyIsinAction,
    verifyCusipAction,
    verifySedolAction,
    verifyUpiAction,
    verifyVatAction,
    verifyEinAction,
    verifyLeiAction,
    verifySsnAction,
    verifyPassportMrzAction,
    verifyNinoAction,
    verifySinAction,
    verifyUpcAction,
    verifyEanAction,
    verifyIsbnAction,
    verifyVinAction,
    verifyUspsAction,
    verifyUpsAction,
    verifyFedexAction,
    verifyImeiAction,
    verifyMeidAction,
    verifyContainerAction,
    verifyEmailAction,
    verifyDomainAction,
    verifySslAction,
    verifyIpv4Action,
    verifyIpv6Action,
    verifyMacAction,
    verifyAsnAction,
    verifyE164Action,
    verifyPwnedAction,
    verifyJwtAction,
    verifyBase64Action,
    verifyMd5Action,
    verifySha256Action,
    verifyUuidAction,
    verifyUlidAction,
    verifyEvmAddressAction,
    verifySolanaAddressAction,
    verifyBtcAddressAction,
    verifyPolkadotAddressAction,
    verifyEnsAction,
    verifySemverAction,
    verifyCronAction,
    verifyJsonAction,
  ],
  init: async () => {
    if (!process.env.SPREAD_API_EVM_KEY) {
      console.warn(
        "[eliza-plugin-spread] SPREAD_API_EVM_KEY is not set — actions will fail until it is configured."
      );
    }
  },
};

export default spreadPlugin;
