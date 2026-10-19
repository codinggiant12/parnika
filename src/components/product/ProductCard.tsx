import { Eye, Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { formatINR } from '../../utils/format';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onQuickView: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onQuickView,
  onAddToCart,
  onToggleWishlist
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 cursor-pointer" onClick={onQuickView}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-forest text-ivory text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
              Artisan Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-gold text-forest text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
              SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full text-stone-700 hover:text-red-500 transition-colors shadow flex items-center justify-center z-10"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <span className="text-[11px] font-semibold text-white bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
            {product.category}
          </span>
          <h4
            onClick={onQuickView}
            className="font-serif text-sm sm:text-base text-forest font-semibold hover:text-gold transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h4>
          <p className="text-[11px] text-stone-500 mt-1 italic line-clamp-1">🌿 {product.botanicalOrigin}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base font-bold text-forest">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through">{formatINR(product.originalPrice)}</span>
            )}
          </div>

          <button
            onClick={onAddToCart}
            className="p-2.5 bg-forest/10 hover:bg-forest text-forest hover:text-ivory rounded-xl transition-colors text-xs"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
