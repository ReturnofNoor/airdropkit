import { readFile, writeFile } from 'node:fs/promises';
import { create } from '@openzeppelin/merkle-tree';

const SNAPSHOT_PATH = 'data/snapshot.example.csv';
const OUTPUT_PATH = 'data/proofs.json';

type SnapshotRow = {
  address: string;
  amount: string;
};

function parseCsv(contents: string): SnapshotRow[] {
  const [headerLine, ...rows] = contents.trim().split(/\r?\n/);
  const headers = headerLine.split(',').map((value) => value.trim());
  if (headers[0] !== 'address' || headers[1] !== 'amount') {
    throw new Error('CSV must include address,amount headers');
  }

  return rows
    .filter(Boolean)
    .map((row) => {
      const [address, amount] = row.split(',').map((value) => value.trim());
      if (!address || !amount) {
        throw new Error(`Invalid row: ${row}`);
      }
      return { address, amount };
    });
}

async function generateMerkle() {
  const csv = await readFile(SNAPSHOT_PATH, 'utf-8');
  const rows = parseCsv(csv);

  const values = rows.map((row) => ({
    address: row.address,
    amount: BigInt(row.amount).toString()
  }));

  const tree = create(values, ['address', 'uint256']);
  const root = tree.root;

  const proofs = values.reduce<Record<string, { amount: string; proof: string[] }>>(
    (acc, entry) => {
      acc[entry.address] = {
        amount: entry.amount,
        proof: tree.getProof(entry)
      };
      return acc;
    },
    {}
  );

  const payload = {
    root,
    proofs
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Merkle root: ${root}`);
  console.log(`Proofs written to ${OUTPUT_PATH}`);
}

generateMerkle().catch((error) => {
  console.error(error);
  process.exit(1);
});
