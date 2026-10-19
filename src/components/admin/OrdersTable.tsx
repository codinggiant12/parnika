import { Package } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/format';

export default function OrdersTable() {
  const { orders, advanceOrder } = useStore();

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
      <h3 className="font-serif text-xl text-forest mb-4 flex items-center gap-2">
        <Package className="w-4 h-4 text-gold" /> Storefront Orders & Dispatch
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-stone-600 uppercase font-bold tracking-wider border-b border-stone-200">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-forest">{ord.id}</td>
                <td className="p-3 font-semibold">{ord.shippingAddress.fullName}</td>
                <td className="p-3 text-stone-500 max-w-xs truncate">
                  {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                </td>
                <td className="p-3 font-bold text-forest">{formatINR(ord.total)}</td>
                <td className="p-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    {ord.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => advanceOrder(ord.id)}
                    disabled={ord.status === 'Delivered'}
                    className="px-2.5 py-1 bg-stone-100 text-forest rounded text-[10px] font-semibold hover:bg-stone-200 disabled:opacity-40"
                  >
                    Next Stage
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
