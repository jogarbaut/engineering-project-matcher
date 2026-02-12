import { formatCurrency } from '@/lib/utils/format-currency';
import { formatDate } from '@/lib/utils/format-date';
import type { Rfp } from '@/types/rfp';

export function RfpCard({ rfp }: { rfp: Rfp }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{rfp.title}</h3>
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>
          <strong>Agency:</strong> {rfp.agency_name || 'Not specified'}
        </p>
        <p>
          <strong>Due Date:</strong> {formatDate(rfp.due_date)}
        </p>
        <p>
          <strong>Estimated Value:</strong>{' '}
          {formatCurrency(rfp.estimated_value)}
        </p>
        <p>
          <strong>Location:</strong> {rfp.location || 'Not specified'}
        </p>
      </div>
    </div>
  );
}
