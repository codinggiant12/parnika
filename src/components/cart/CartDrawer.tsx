import { ArrowRight, CheckCircle2, ShoppingBag, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useUI } from '../../context/UIContext';
import { FREE_SHIPPING_THRESHOLD } from '../../data/constants';
import { formatINR } from '../../utils/format';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, setIsCheckoutOpen } = useUI();
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    appliedDiscount,
    shippingFee,
    isFreeShipping,
    cartTotal,
    couponCode,
    setCouponCode,
    applyCoupon,
    couponFeedback,
    updateCartQuantity,
    removeFromCart,
    setSelectedCategory
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest" />
              <h3 className="font-serif text-lg text-forest">Your Shopping Bag</h3>
              <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-bold">{cartCount}</span>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping meter */}
          <div className="bg-ivory p-3.5 border-b border-stone-200 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Complimentary Express Delivery Unlocked!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-stone-600 mb-1">
                  <span>Add {formatINR(FREE_SHIPPING_THRESHOLD - cartSubtotal)} more for free delivery</span>
                  <span>{Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gold h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-5 divide-y divide-stone-100 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h4 className="font-serif text-base text-stone-700">Your bag is empty</h4>
                <p className="text-xs text-stone-400 mt-1">Discover our botanical earrings, rings, and home trays.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedCategory('All');
                    navigate('/shop');
                  }}
                  className="mt-4 px-6 py-2 bg-forest text-ivory rounded-full text-xs font-semibold"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedMetal}`} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-forest line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedMetal)}
                          className="text-stone-300 hover:text-red-500 ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-stone-500 block">
                        {item.selectedMetal} • {item.product.botanicalOrigin}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, -1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-forest">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/80 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon (BOTANICAL10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-gold"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-stone-800 text-ivory rounded-xl text-xs font-semibold hover:bg-black"
                >
                  Apply
                </button>
              </div>
              {couponFeedback && (
                <p className={`text-[11px] font-semibold ${couponFeedback.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                  {couponFeedback.text}
                </p>
              )}

              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(cartSubtotal)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Artisan Discount</span>
                    <span>-{formatINR(appliedDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Insured Shipping</span>
                  <span>{isFreeShipping ? 'FREE' : formatINR(shippingFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-forest pt-2 border-t border-stone-200">
                  <span>Payable Total</span>
                  <span className="font-serif text-base text-forest">{formatINR(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-forest hover:bg-forest/90 text-ivory rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                Proceed to Indian Checkout <ArrowRight className="w-4 h-4 text-gold" />
              </button>
              <p className="text-[10px] text-center text-stone-400">🔒 Razorpay & UPI Simulation • Verified Indian Gateway</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
