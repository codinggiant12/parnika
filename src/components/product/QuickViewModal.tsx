import { Heart, ShoppingBag, Star, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useUI } from '../../context/UIContext';
import { formatINR } from '../../utils/format';

export default function QuickViewModal() {
  const { quickViewProduct: p, setQuickViewProduct } = useUI();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  if (!p) return null;

  const wishlisted = wishlist.includes(p.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white rounded-full text-stone-700 shadow flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto h-full min-h-[340px] bg-stone-100">
            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
            <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-forest px-3 py-1 rounded-full shadow-sm">
              100% Real Preserved Flora
            </span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{p.category}</span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] text-stone-500 font-medium">{p.collection}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-forest font-normal leading-snug">{p.name}</h3>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-gold text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  {p.rating.toFixed(1)} ({p.reviewCount} verified reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 my-3">
                <span className="font-serif text-2xl font-bold text-forest">{formatINR(p.price)}</span>
                {p.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">{formatINR(p.originalPrice)}</span>
                )}
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  In Studio Stock ({p.stockCount} left)
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">{p.description}</p>

              <div className="bg-stone-50 p-3.5 rounded-xl space-y-1 text-[11px] text-stone-600 mb-4 border border-stone-100">
                <div>
                  <strong>Botanical Origin:</strong> {p.botanicalOrigin}
                </div>
                <div>
                  <strong>Dimensions:</strong> {p.dimensions}
                </div>
                <div>
                  <strong>Handmade Variance:</strong> Organically preserved petals naturally vary slightly in shape.
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => {
                  addToCart(p, 1, p.metalOptions[0] || '18K Gold Plated');
                  setQuickViewProduct(null);
                }}
                className="w-full py-3 bg-forest hover:bg-forest/90 text-ivory rounded-xl text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-gold" /> Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(p.id)}
                className="w-full py-2.5 border border-stone-200 text-stone-700 rounded-xl text-xs font-medium hover:bg-stone-50 flex items-center justify-center gap-2"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
