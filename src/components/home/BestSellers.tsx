import { ArrowRight } from 'lucide-react';
import ProductGrid from '../product/ProductGrid';
import { useStore } from '../../context/StoreContext';
import { useGoToCategory } from '../../hooks/useGoToCategory';

export default function BestSellers() {
  const { products } = useStore();
  const goToCategory = useGoToCategory();

  return (
    <section className="bg-white/60 py-16 sm:py-24 border-y border-forest/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-bold">Artisan Favourites</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest mt-1">Beloved Creations</h2>
          </div>
          <button
            onClick={() => goToCategory('All')}
            className="mt-4 md:mt-0 text-xs font-semibold text-forest hover:text-gold inline-flex items-center gap-1 transition uppercase tracking-wider"
          >
            Explore Complete Catalog <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <ProductGrid products={products.slice(0, 8)} />
      </div>
    </section>
  );
}
