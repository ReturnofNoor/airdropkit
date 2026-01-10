'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount, useChainId, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import type { Address, Hex } from 'viem';
import { airdropAbi, airdropAddresses } from '@/lib/airdrop';
import { supportedChains } from '@/lib/wagmi';

type ProofEntry = {
  amount: string;
  proof: Hex[];
};

type ProofPayload = {
  root: Hex;
  proofs: Record<string, ProofEntry>;
};

export function ClaimFlow() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync, data: txHash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: Boolean(txHash) }
  });
  const [proofs, setProofs] = useState<ProofPayload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/proofs.json')
      .then((response) => response.json())
      .then((data: ProofPayload) => {
        if (!isMounted) return;
        setProofs(data);
      })
      .catch((error) => {
        if (!isMounted) return;
        setLoadError(error instanceof Error ? error.message : 'Failed to load proofs');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedAddress = address?.toLowerCase() ?? '';
  const entry = useMemo(() => {
    if (!proofs || !normalizedAddress) return null;
    return proofs.proofs[normalizedAddress] ?? null;
  }, [proofs, normalizedAddress]);

  const activeChain = supportedChains.find((chain) => chain.id === chainId);
  const contractAddress = airdropAddresses[chainId];
  const isSupportedChain = Boolean(activeChain && contractAddress);

  const explorerBase = activeChain?.blockExplorers?.default.url;

  const onClaim = async () => {
    if (!entry || !address || !contractAddress) return;
    await writeContractAsync({
      address: contractAddress,
      abi: airdropAbi,
      functionName: 'claim',
      args: [entry.proof, BigInt(entry.amount)]
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Eligibility</p>
          <p className="mt-2 text-lg font-semibold">Check your allowlist entry</p>
          <p className="mt-1 text-sm text-white/60">
            {loadError
              ? `Proof load error: ${loadError}`
              : 'Proofs loaded from /proofs.json in the demo bundle.'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-white/70">
          <p>
            Status:{' '}
            <span className="font-semibold text-white">
              {isConnected ? (entry ? 'Eligible' : 'Not in allowlist') : 'Connect wallet'}
            </span>
          </p>
          <p className="mt-2">
            Amount:{' '}
            <span className="font-semibold text-white">{entry ? entry.amount : '—'}</span>
          </p>
        </div>

        {!isSupportedChain && isConnected ? (
          <div className="flex flex-wrap gap-2">
            {supportedChains.map((chain) => (
              <button
                key={chain.id}
                type="button"
                onClick={() => switchChain({ chainId: chain.id })}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/40"
              >
                Switch to {chain.name}
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!entry || !isSupportedChain || isPending || isConfirming}
            onClick={onClaim}
            className="rounded-full bg-neon px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending || isConfirming ? 'Submitting...' : 'Claim'}
          </button>
          {txHash && explorerBase ? (
            <a
              className="rounded-full border border-neon/40 px-4 py-2 text-sm text-neon transition hover:border-neon"
              href={`${explorerBase}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View tx
            </a>
          ) : null}
        </div>

        {txHash ? (
          <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-white/70">
            <p>
              Tx hash:{' '}
              <span className="break-all font-semibold text-white">{txHash}</span>
            </p>
            <p className="mt-2">Status: {isSuccess ? 'Confirmed' : 'Pending confirmation'}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
