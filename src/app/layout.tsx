import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'AirdropKit - Testnet Claim Platform',
  description: 'Portfolio-safe demo Airdrop Claim Platform for Sepolia and Base Sepolia.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="gradient-ring min-h-screen">
            <div className="w-full bg-[#ff6f61] py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-black">
              DEMO/TESTNET ONLY • No Real Tokens • Sepolia + Base Sepolia
            </div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
