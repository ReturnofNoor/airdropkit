import { http, createConfig } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { baseSepolia, sepolia } from 'wagmi/chains';

export const supportedChains = [
  {
    ...sepolia,
    testnetFaucet: 'https://sepoliafaucet.com/'
  },
  {
    ...baseSepolia,
    testnetFaucet: 'https://www.base.org/faucet'
  }
];

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'demo';

export const wagmiConfig = createConfig({
  chains: [sepolia, baseSepolia],
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({ projectId: walletConnectProjectId, showQrModal: true })
  ],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http()
  }
});
