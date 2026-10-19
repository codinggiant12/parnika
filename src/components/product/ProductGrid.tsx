import type { Product } from '../../types';
import ProductCard from './ProductCard';
import { useStore } from '../../context/StoreContext';
import { useUI } from '../../context/UIContext';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

/** Renders a grid of ProductCards wired to the store + UI contexts. */
export default function ProductGrid({
  products,
  className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
}: ProductGridProps) {
  const { wishlist, addToCart, toggleWishlist } = useStore();
  const { setQuickViewProduct } = useUI();

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          onQuickView={() => setQuickViewProduct(product)}
          onAddToCart={() => addToCart(product)}
          onToggleWishlist={() => toggleWishlist(product.id)}
        />
      ))}
    </div>
  );
}
