import { AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { CATEGORIES } from '../data/constants';
import { useStore } from '../context/StoreContext';
import { useUI } from '../context/UIContext';
import { formatINR } from '../utils/format';
import type { SortOption } from '../types';

const selectCls =
  'w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-[#222222] focus:outline-none focus:border-gold';
const labelCls = 'block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1';

export default function ShopPage() {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    resetFilters
  } = useStore();
  const { showToast } = useUI();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 border-b border-stone-200 pb-6">
        <nav className="text-xs text-stone-500 mb-2 flex items-center gap-1.5">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-forest font-semibold">Creations Catalog</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl text-forest">Preserved Botanical Catalog</h1>
        <p className="text-xs sm:text-sm text-[#222222]/70 mt-1">
          Each jewel is completely individual. No two pressed blossoms are ever identical.
        </p>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div>
            <label className={labelCls}>Category Filter</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={selectCls}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Max Price</label>
              <span className="text-xs font-bold text-forest">{formatINR(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C5A46D] cursor-pointer"
            />
          </div>

          <div>
            <label className={labelCls}>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className={selectCls}>
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                resetFilters();
                showToast('Filters reset');
              }}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-forest text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gold" /> Reset All Filters
            </button>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
          <AlertCircle className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-xl text-forest">No Botanical Creations Found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search criteria or price thresholds.
          </p>
          <button onClick={resetFilters} className="px-6 py-2.5 bg-forest text-ivory rounded-full text-xs font-semibold">
            Clear Filters
          </button>
        </div>
      ) : (
        <div>
          <p className="text-xs text-stone-500 mb-4">
            Showing {filteredProducts.length} handcrafted botanical creation{filteredProducts.length === 1 ? '' : 's'}
          </p>
          <ProductGrid
            products={filteredProducts}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          />
        </div>
      )}
    </div>
  );
}
