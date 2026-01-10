const mockAllocations = [
  {
    address: '0x3f6F...f1D2',
    amount: '12,500 KIT'
  },
  {
    address: '0xa92C...3Bf7',
    amount: '8,000 KIT'
  },
  {
    address: '0x54B1...90Ea',
    amount: '1,250 KIT'
  }
];

export function AllocationPreview() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Demo Allowlist</p>
          <p className="mt-2 text-lg font-semibold">Sample allocations</p>
        </div>
        <span className="rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs text-neon">
          Mock Data
        </span>
      </div>
      <ul className="mt-4 space-y-3 text-sm text-white/70">
        {mockAllocations.map((allocation) => (
          <li key={allocation.address} className="flex items-center justify-between">
            <span>{allocation.address}</span>
            <span className="font-semibold text-white">{allocation.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
