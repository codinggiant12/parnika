import { Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const statusStyle = (s: string) =>
  s === 'Pending' ? 'bg-amber-100 text-amber-800' : s === 'Quoted' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800';

export default function InquiriesTable() {
  const { inquiries, advanceInquiry } = useStore();

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif text-xl text-forest flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" /> Bespoke Inquiries Pipeline
        </h3>
        <span className="text-xs bg-gold/20 text-forest px-3 py-1 rounded-full font-bold">
          {inquiries.length} Active Requests
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-stone-600 uppercase font-bold tracking-wider border-b border-stone-200">
            <tr>
              <th className="p-3">Ref ID</th>
              <th className="p-3">Client</th>
              <th className="p-3">Silhouette</th>
              <th className="p-3">Botanical / Notes</th>
              <th className="p-3">Budget</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Advance Stage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {inquiries.map((inq) => (
              <tr key={inq.id} className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-forest">{inq.id}</td>
                <td className="p-3">
                  <p className="font-semibold text-stone-800">{inq.customerName}</p>
                  <p className="text-[10px] text-stone-400">{inq.phone}</p>
                </td>
                <td className="p-3">{inq.productType}</td>
                <td className="p-3 text-stone-500 max-w-xs truncate">{inq.specialInstructions || inq.botanicalStyle}</td>
                <td className="p-3 font-bold text-forest">{inq.budgetRange}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusStyle(inq.status)}`}>{inq.status}</span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => advanceInquiry(inq.id)}
                    disabled={inq.status === 'Dispatched'}
                    className="px-2.5 py-1 bg-forest text-white rounded text-[10px] hover:bg-stone-800 disabled:opacity-40"
                  >
                    Advance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
