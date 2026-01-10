import { AllocationPreview } from './AllocationPreview';
import { ClaimFlow } from './ClaimFlow';
import { WalletActions } from './WalletActions';

export function ClaimPanel() {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Claim your testnet drop</h2>
        <p className="mt-2 text-sm text-white/70">
          Connect a wallet to see your mock allocation. Proofs are generated from a demo
          allowlist and transactions are simulated on Sepolia or Base Sepolia.
        </p>
      </div>
      <AllocationPreview />
      <WalletActions />
      <ClaimFlow />
    </div>
  );
}
