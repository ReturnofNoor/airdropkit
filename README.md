# AirdropKit

Portfolio-safe **Airdrop Claim Platform** demo for Sepolia + Base Sepolia. **DEMO/TESTNET ONLY — no real tokens.**

## Demo / Testnet Disclaimer
- This repository is for demonstration and testnet usage only.
- Do **not** use production wallets or real funds.
- Any addresses, allocations, and contract addresses are placeholders until you deploy your own contracts.

## Tech Stack
- Next.js + TypeScript + Tailwind
- wagmi + viem (wallet connection & chain interactions)
- Foundry Solidity contract for merkle-verified claims
- TypeScript merkle generator (OpenZeppelin merkle-tree)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Set WalletConnect project ID:
   ```bash
   export NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```
3. Run the Next.js app:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` — Start the Next.js dev server.
- `npm run build` — Build the Next.js app.
- `npm run start` — Run the production build.
- `npm run lint` — Run Next lint.
- `npm run format` — Format with Prettier.
- `npm run generate:merkle` — Generate `data/proofs.json` from `data/snapshot.example.csv`.

## Merkle Proofs
- **Input:** `data/snapshot.example.csv` (columns: `address,amount`).
- **Output:** `data/proofs.json` and merkle root printed to stdout.
- Ensure contract merkle root matches the output.

## Contracts (Foundry)
Located in `contracts/` with its own Foundry config.
- `contracts/src/MerkleAirdropClaim.sol` includes `merkleRoot`, `claimed`, and `claim`.
- Optional pause/ownership controls are available.

Run tests (requires Foundry):
```bash
cd contracts
forge test
```

## Deployment Notes
- Deploy the contract to **Sepolia** and **Base Sepolia**.
- Update `src/lib/airdrop.ts` with the deployed addresses.
- Update `public/proofs.json` and merkle root to match your snapshot.

## Security Notes
- This demo does not perform token transfers; it only emits `Claimed`.
- Replace placeholder addresses and validate proof data before any real deployments.
- Always audit contracts before mainnet or production usage.

## Screenshots (placeholders)
- **Home / Claim Flow:** `docs/screenshots/home.png`
- **Wallet Connect:** `docs/screenshots/wallet-connect.png`
- **Claim Submitted:** `docs/screenshots/claim-submitted.png`
