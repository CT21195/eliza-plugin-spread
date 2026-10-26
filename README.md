# eliza-plugin-spread

ElizaOS plugin that routes agent tool calls into the **Spread Paywall API** — 78 pay-per-call x402 endpoints (live SOL CEX/DEX spread data, Base DEX spreads, on-chain balances and block height, whale watching, RugCheck audits, pump.fun data, tokenized stocks, web scraping, NPI/DEA verification, and more). Every call is paid in USDC on Base via x402 v2; the facilitator settles on-chain, so the signing wallet needs no ETH for gas.

## Install

```bash
npm install eliza-plugin-spread
```

Then add it to your agent's plugin list:

```ts
import spreadPlugin from "eliza-plugin-spread";

const agent = createAgent({
  plugins: [spreadPlugin],
  // ...
});
```

## Setup

1. Create an EVM wallet (or reuse your agent's) and fund it with a few dollars of **USDC on Base**.
2. Set the private key as an environment variable:

```bash
export SPREAD_API_EVM_KEY=0xYourPrivateKeyHex
```

Never commit this key. The plugin only signs EIP-3009 payment authorizations with it — funds move only to the API's pay-to address, only for the exact quoted amount, and each authorization is single-use (random nonce, 10-minute expiry).

## Actions

| Action | Endpoint | Price/call |
|---|---|---|
| `SPREAD_CHECK` | Live SOL CEX/DEX spread data | $0.005 |
| `BASE_SPREAD_CHECK` | Cross-DEX spreads on Base (default WETH, give a token address for others) | $0.005 |
| `CHAIN_BALANCE_CHECK` | Native ETH balance of a Base address (give the 0x address) | $0.003 |
| `CHAIN_ERC20_BALANCE_CHECK` | ERC-20 token balance on Base (give wallet + token addresses) | $0.003 |
| `CHAIN_BLOCK_NUMBER_CHECK` | Current Base block number | $0.001 |
| `CHAIN_SOL_BALANCE_CHECK` | Native SOL balance of a Solana wallet (give the address) | $0.003 |
| `CHAIN_SPL_BALANCE_CHECK` | SPL token balance (give wallet + mint addresses) | $0.003 |
| `CHAIN_SLOT_CHECK` | Current Solana slot | $0.001 |
| `WHALE_WATCH` | Recent swaps for a Solana wallet (give the address) | $0.05 |
| `SOLANA_AUDIT` | RugCheck safety audit for a token mint | $0.05 |
| `WALLET_PORTFOLIO` | Full token portfolio for a Solana wallet | $0.05 |
| `PUMP_TRENDING` | Trending pump.fun tokens | $0.005 |
| `PUMP_MIGRATING` | pump.fun tokens about to migrate | $0.005 |
| `STOCKS_PRICE` | Tokenized stock price (give the symbol) | $0.005 |
| `SCRAPE_URL` | Scrape a web page to text (give the URL) | $0.01 |
| `VERIFY_NPI` | NPI registry verification (10-digit NPI) | $0.01 |
| `VERIFY_DEA` | DEA number format validation | $0.005 |

Parameters are pulled from the agent's message text automatically (wallet addresses, URLs, symbols, NPI/DEA numbers).

## How payment works

1. The plugin calls the endpoint unpaid → API returns HTTP 402 with the price.
2. The plugin signs an EIP-3009 `TransferWithAuthorization` for the exact amount and retries with it in the `PAYMENT-SIGNATURE` header.
3. The x402 facilitator settles the USDC transfer on Base and the API returns the data.

## Submitting to the ElizaOS plugin registry

1. Fork [elizaos/eliza](https://github.com/elizaos/eliza) (or the community registry repo linked from its README).
2. Add your plugin's repo URL, name (`eliza-plugin-spread`), and description to the registry data file (see `packages/registry/` in the monorepo for the current schema).
3. Open a PR titled `feat(registry): add eliza-plugin-spread`. Registry maintainers review for working install, accurate description, and no malicious behavior — keep the key handling exactly as documented here.

## License

MIT
