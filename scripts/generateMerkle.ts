import { MerkleTree } from 'merkletreejs';
import { encodePacked, keccak256 } from 'viem';

const demoAllowlist = [
  { address: '0x3f6F00000000000000000000000000000000f1D2', amount: 12500n },
  { address: '0xa92C000000000000000000000000000000003Bf7', amount: 8000n },
  { address: '0x54B10000000000000000000000000000000090Ea', amount: 1250n }
];

const leaves = demoAllowlist.map((entry) =>
  keccak256(encodePacked(['address', 'uint256'], [entry.address as `0x${string}`, entry.amount]))
);

const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = merkleTree.getHexRoot();

const proofs = demoAllowlist.map((entry, index) => ({
  ...entry,
  proof: merkleTree.getHexProof(leaves[index])
}));

console.log(JSON.stringify({ root, proofs }, null, 2));
