import type { StudioFormState } from '../../types';

export default function StudioPreview({ state }: { state: StudioFormState }) {
  const tintBg = state.colorTint.includes('Emerald')
    ? '#263D32'
    : state.colorTint.includes('Azure')
    ? '#40798C'
    : state.colorTint.includes('Blush')
    ? '#E5B8B7'
    : 'transparent';

  return (
    <div className="lg:col-span-5 bg-ivory p-6 rounded-2xl border border-gold/30 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Live Specimen Visualizer</span>
          <span className="text-[10px] bg-sage/25 text-forest font-semibold px-2 py-0.5 rounded-full">
            5-7 Days Handcrafted
          </span>
        </div>

        <div className="relative aspect-square rounded-2xl bg-white shadow-inner border border-stone-300 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 opacity-40 transition-colors duration-500" style={{ backgroundColor: tintBg }} />

          {state.metalFoil !== 'No Metallic Flakes (Pure Flora)' && (
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#c5a46d_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
          )}

          <div className="relative z-10 p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 max-w-[85%]">
            <div className="text-4xl mb-2">🌿</div>
            <h4 className="font-serif text-base font-bold text-forest">{state.botanical}</h4>
            <p className="text-[11px] text-stone-600 mt-0.5">{state.productType}</p>
            {state.initials && (
              <div className="mt-2.5 inline-block px-3 py-1 bg-forest text-gold text-xs font-serif font-bold tracking-widest rounded-full">
                {state.initials.toUpperCase()}
              </div>
            )}
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] text-stone-500 border-t border-stone-200 pt-2">
            <span>{state.metalFoil}</span>
            <span>{state.colorTint}</span>
          </div>
        </div>

        <div className="mt-5 space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
          <div className="flex justify-between">
            <span>Silhouette:</span>
            <strong className="text-forest">{state.productType}</strong>
          </div>
          <div className="flex justify-between">
            <span>Botanical Inclusion:</span>
            <strong className="text-forest truncate max-w-[200px]">{state.botanical}</strong>
          </div>
          <div className="flex justify-between">
            <span>Estimated Range:</span>
            <strong className="text-gold font-serif font-bold">{state.budget}</strong>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-3 border-t border-stone-200 text-center text-[11px] text-stone-500">
        Direct artisan inquiries: <span className="font-semibold text-forest">atelier@parnikaresins.in</span>
      </div>
    </div>
  );
}
