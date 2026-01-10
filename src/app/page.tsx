import { ClaimPanel } from '@/components/ClaimPanel';
import { NetworkStatus } from '@/components/NetworkStatus';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.3em] text-neon">AirdropKit Demo</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">Airdrop Claim Platform</h1>
        <p className="max-w-2xl text-lg text-white/70">
          This is a portfolio-safe demonstration of a token claim flow. The experience
          is restricted to test networks and uses mock allocations so you can safely show
          the UX without touching production assets.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <ClaimPanel />
        <NetworkStatus />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Merkle Allowlist',
              detail: 'Generate proofs from TypeScript and verify on-chain.'
            },
            {
              title: 'Multi-network',
              detail: 'Prepared for Sepolia + Base Sepolia using wagmi + viem.'
            },
            {
              title: 'Foundry Ready',
              detail: 'Solidity contracts compile with Foundry defaults.'
            }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-black/40 p-5">
              <h3 className="text-lg font-semibold text-aura">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
