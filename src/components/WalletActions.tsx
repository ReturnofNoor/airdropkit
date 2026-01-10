'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletActions() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Wallet</p>
          <p className="mt-2 text-lg font-semibold">
            {isConnected ? 'Wallet connected' : 'Connect to claim'}
          </p>
          <p className="mt-1 text-sm text-white/60">
            {isConnected ? address : 'Use a testnet wallet to preview your claim.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {isConnected ? (
            <button
              type="button"
              onClick={() => disconnect()}
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/40"
            >
              Disconnect
            </button>
          ) : (
            connectors.map((connector) => {
              const label = connector.id === 'injected' ? 'MetaMask' : connector.name;
              return (
                <button
                  key={connector.uid}
                  type="button"
                  onClick={() => connect({ connector })}
                  className="rounded-full bg-neon px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Connect {label}
                </button>
              );
            })
          )}
          <button
            type="button"
            className="rounded-full border border-neon/40 px-4 py-2 text-sm text-neon transition hover:border-neon"
          >
            Simulate Claim
          </button>
        </div>
      </div>
    </div>
  );
}
