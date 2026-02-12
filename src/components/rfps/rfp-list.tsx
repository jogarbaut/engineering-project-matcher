import { RfpCard } from './rfp-card';
import type { Rfp } from '@/types/rfp';

export function RfpList({ rfps }: { rfps: Rfp[] }) {
  if (rfps.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-600">No RFPs available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rfps.map((rfp) => (
        <RfpCard key={rfp.id} rfp={rfp} />
      ))}
    </div>
  );
}
