'use client';

import { useAccount, useBalance, useChainId } from 'wagmi';
import { formatUnits } from 'viem';
import { supportedChains } from '@/lib/wagmi';

export function NetworkStatus() {
  const chainId = useChainId();
  const { address } = useAccount();
  const balance = useBalance({ address, query: { enabled: Boolean(address) } });
  const activeChain = supportedChains.find((chain) => chain.id === chainId);

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Network</p>
        <h2 className="mt-2 text-2xl font-semibold">Testnet status</h2>
        <p className="mt-2 text-sm text-white/70">
          Wallet connections are restricted to Sepolia and Base Sepolia. Switch networks to
          see supported chain details and faucet links.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Active chain</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
            {activeChain ? activeChain.name : 'Unsupported'}
          </span>
        </div>
        <div className="mt-4 text-sm text-white/60">
          <p>Chain ID: {activeChain?.id ?? '—'}</p>
          <p className="mt-1">
            Balance:{' '}
            {balance.data ? `${formatUnits(balance.data.value, balance.data.decimals)} ${balance.data.symbol}` : '—'}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <h3 className="text-lg font-semibold text-aura">Faucet links</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/60">
          {supportedChains.map((chain) => (
            <li key={chain.id} className="flex items-center justify-between">
              <span>{chain.name}</span>
              <a className="text-neon hover:underline" href={chain.testnetFaucet} target="_blank" rel="noreferrer">
                Get test ETH
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
