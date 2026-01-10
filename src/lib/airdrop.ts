import type { Address } from 'viem';

export const airdropAbi = [
  {
    type: 'function',
    name: 'claim',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'proof', type: 'bytes32[]' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: []
  }
] as const;

export const airdropAddresses: Record<number, Address> = {
  11155111: '0x0000000000000000000000000000000000000000',
  84532: '0x0000000000000000000000000000000000000000'
};
