import { useState } from 'react';
import { Lock, RefreshCw, X } from 'lucide-react';
import type { PaymentMethod, ShippingAddress } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useUI } from '../../context/UIContext';
import { formatINR } from '../../utils/format';

const inputCls = 'w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-gold';

function PaymentOption({
  selected,
  onSelect,
  label,
  badge
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  badge: React.ReactNode;
}) {
  return (
    <label
      onClick={onSelect}
      className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition ${
        selected ? 'border-forest bg-forest/5 font-bold' : 'border-stone-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-3.5 h-3.5 rounded-full border ${selected ? 'bg-forest border-forest' : 'border-stone-400'}`} />
        <span>{label}</span>
      </div>
      {badge}
    </label>
  );
}

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useUI();
  const { cartTotal, placeOrder } = useStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: 'Kavita Iyer',
    email: 'kavita.iyer@example.com',
    phone: '9876543210',
    address: 'Flat 402, Magnolia Residency, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });
  const [paymentOption, setPaymentOption] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const set = (key: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(formData, paymentOption);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative my-8">
        <div className="p-5 border-b border-stone-200 flex justify-between items-center bg-ivory">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Secure Indian Payment</span>
            <h3 className="font-serif text-lg text-forest">Dispatch & Payment Details</h3>
          </div>
          <button onClick={() => setIsCheckoutOpen(false)} className="p-1 text-stone-400 hover:text-stone-700" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Recipient Full Name *</label>
              <input type="text" required value={formData.fullName} onChange={set('fullName')} className={inputCls} />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Mobile (WhatsApp Tracking) *</label>
              <input type="tel" required value={formData.phone} onChange={set('phone')} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-stone-600 mb-1 font-semibold">Email Address (Tax Invoice) *</label>
            <input type="email" required value={formData.email} onChange={set('email')} className={inputCls} />
          </div>

          <div>
            <label className="block text-stone-600 mb-1 font-semibold">Street Address / Landmark *</label>
            <input type="text" required value={formData.address} onChange={set('address')} className={inputCls} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">City *</label>
              <input type="text" required value={formData.city} onChange={set('city')} className={inputCls} />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">State *</label>
              <input type="text" required value={formData.state} onChange={set('state')} className={inputCls} />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">PIN Code *</label>
              <input type="text" required maxLength={6} value={formData.pincode} onChange={set('pincode')} className={inputCls} />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-stone-700 font-bold mb-2 uppercase tracking-wider text-[11px]">
              Payment Gateway Selection
            </label>
            <div className="space-y-2">
              <PaymentOption
                selected={paymentOption === 'UPI'}
                onSelect={() => setPaymentOption('UPI')}
                label="Instant UPI / QR / NetBanking"
                badge={<span className="text-[10px] bg-blue-100 text-blue-800 font-mono px-2 py-0.5 rounded">Razorpay</span>}
              />
              <PaymentOption
                selected={paymentOption === 'COD'}
                onSelect={() => setPaymentOption('COD')}
                label="Cash on Delivery (COD)"
                badge={<span className="text-[10px] text-stone-500">Available across all PIN codes</span>}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 block">Total Payable:</span>
              <span className="font-serif text-xl font-bold text-forest">{formatINR(cartTotal)}</span>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-7 py-3 bg-forest hover:bg-forest/90 text-ivory rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Verifying Bank Gateway...
                </>
              ) : (
                <>
                  <span>Confirm & Place Order</span> <Lock className="w-3.5 h-3.5 text-gold" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
