import { Check } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { formatINR } from '../../utils/format';

export default function OrderSuccessModal() {
  const { completedOrder, setCompletedOrder, setIsAccountOpen } = useUI();
  if (!completedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl relative">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-2xl shadow-sm">
          <Check className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest text-gold font-bold">Artisan Order Placed</span>
        <h3 className="font-serif text-2xl sm:text-3xl text-forest">Thank You for Supporting Handcraft!</h3>
        <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
          Your order <strong className="font-mono text-forest">{completedOrder.id}</strong> has been logged. Our studio
          artisan will begin degassing and casting your botanicals.
        </p>

        <div className="bg-stone-50 p-4 rounded-2xl text-left text-xs space-y-2 border border-stone-200">
          <div className="flex justify-between">
            <span className="text-stone-500">Amount Paid:</span>
            <span className="font-bold text-forest">{formatINR(completedOrder.total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Payment Mode:</span>
            <span className="text-emerald-700 font-semibold">{completedOrder.paymentMethod} Verified</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Delivery Address:</span>
            <span className="text-stone-700 truncate max-w-[200px] text-right">
              {completedOrder.shippingAddress.address}, {completedOrder.shippingAddress.city}
            </span>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            onClick={() => {
              setCompletedOrder(null);
              setIsAccountOpen(true);
            }}
            className="flex-1 py-3 border border-forest text-forest rounded-xl text-xs font-semibold hover:bg-forest/5"
          >
            Track Timeline
          </button>
          <button
            onClick={() => setCompletedOrder(null)}
            className="flex-1 py-3 bg-forest text-ivory rounded-xl text-xs font-semibold hover:bg-forest/90"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
