import { useStore } from '../../context/StoreContext';

export default function MetricsBar() {
  const { orders, inquiries, products } = useStore();

  const card = 'bg-white p-5 rounded-2xl border border-stone-200 shadow-sm';
  const label = 'text-[11px] text-stone-500 uppercase font-semibold';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className={card}>
        <span className={label}>Store Revenue</span>
        <p className="font-serif text-2xl text-forest mt-1">₹56,430</p>
        <span className="text-[10px] text-emerald-600 font-bold">↑ 24% this month</span>
      </div>
      <div className={card}>
        <span className={label}>Live Orders</span>
        <p className="font-serif text-2xl text-forest mt-1">{orders.length + 12}</p>
        <span className="text-[10px] text-amber-700 font-semibold">3 curing in molds</span>
      </div>
      <div className={card}>
        <span className={label}>Custom Inquiries</span>
        <p className="font-serif text-2xl text-gold mt-1">{inquiries.length}</p>
        <span className="text-[10px] text-stone-500">Requires quote review</span>
      </div>
      <div className={card}>
        <span className={label}>Catalog SKUs</span>
        <p className="font-serif text-2xl text-forest mt-1">{products.length}</p>
        <span className="text-[10px] text-emerald-600 font-bold">All active</span>
      </div>
    </div>
  );
}
