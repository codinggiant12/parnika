import SectionHeading from '../common/SectionHeading';
import { CATEGORIES } from '../../data/constants';
import { useGoToCategory } from '../../hooks/useGoToCategory';

const ICONS = ['🌿', '🌸', '💍', '✨'];

export default function CategoryShortcuts() {
  const goToCategory = useGoToCategory();

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Curated Catalog" title="Shop by Botanical Category" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.filter((c) => c !== 'All').map((cat, idx) => (
          <button
            key={cat}
            onClick={() => goToCategory(cat)}
            className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-gold transition text-center flex flex-col items-center justify-center group"
          >
            <span className="text-xl mb-1.5 group-hover:scale-110 transition-transform">{ICONS[idx % ICONS.length]}</span>
            <span className="text-[11px] font-semibold text-forest group-hover:text-gold transition-colors line-clamp-1">
              {cat}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
