import { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import type { Order } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useUI } from '../../context/UIContext';
import { formatINR } from '../../utils/format';

const STAGES: { label: string; reached: Order['status'][] }[] = [
  { label: '1. Placed', reached: ['Processing', 'Cast & Curing', 'Polishing', 'Dispatched', 'Delivered'] },
  { label: '2. Curing', reached: ['Cast & Curing', 'Polishing', 'Dispatched', 'Delivered'] },
  { label: '3. Polishing', reached: ['Polishing', 'Dispatched', 'Delivered'] },
  { label: '4. Dispatched', reached: ['Dispatched', 'Delivered'] }
];

export default function AccountModal() {
  const { isAccountOpen, setIsAccountOpen } = useUI();
  const { orders, wishlist, products, addToCart, toggleWishlist } = useStore();
  const [tab, setTab] = useState<'orders' | 'wishlist'>('orders');

  if (!isAccountOpen) return null;

  const tabCls = (active: boolean) =>
    `font-serif text-base pb-2 font-bold ${active ? 'text-forest border-b-2 border-gold' : 'text-stone-400'}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-4 border-b border-stone-200 pb-3 mb-6">
          <button onClick={() => setTab('orders')} className={tabCls(tab === 'orders')}>
            Order Tracking & Timeline ({orders.length})
          </button>
          <button onClick={() => setTab('wishlist')} className={tabCls(tab === 'wishlist')}>
            Saved Keepsakes ({wishlist.length})
          </button>
        </div>

        {tab === 'orders' ? (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-10">No orders logged yet.</p>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-forest text-sm">{ord.id}</span>
                      <p className="text-[10px] text-stone-400">
                        Placed on {ord.date} • {formatINR(ord.total)}
                      </p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">{ord.status}</span>
                  </div>

                  <p className="text-stone-700 font-medium">
                    Items: {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                  </p>

                  <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] text-center font-semibold">
                    {STAGES.map((s) => (
                      <div
                        key={s.label}
                        className={`p-1.5 rounded ${
                          s.reached.includes(ord.status)
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        {s.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {wishlist.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-10">No saved keepsakes yet.</p>
            ) : (
              products
                .filter((p) => wishlist.includes(p.id))
                .map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-serif text-xs font-bold text-forest">{p.name}</h5>
                        <span className="text-xs text-gold font-bold">{formatINR(p.price)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          addToCart(p);
                          toggleWishlist(p.id);
                        }}
                        className="px-3 py-1 bg-forest text-white rounded-lg text-xs"
                      >
                        Move to Bag
                      </button>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-stone-400 hover:text-red-500 p-1"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
