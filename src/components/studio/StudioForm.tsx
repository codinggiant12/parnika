import { Send } from 'lucide-react';
import type { StudioFormState } from '../../types';
import {
  STUDIO_BOTANICALS,
  STUDIO_BUDGETS,
  STUDIO_FOILS,
  STUDIO_SILHOUETTES,
  STUDIO_TINTS
} from '../../data/constants';

interface StudioFormProps {
  state: StudioFormState;
  onChange: (patch: Partial<StudioFormState>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const labelCls = 'block text-xs font-bold uppercase tracking-wider text-forest mb-2';
const selectCls = 'w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5';
const inputCls = 'w-full bg-stone-50 border border-stone-300 rounded-xl p-2 text-xs';

export default function StudioForm({ state, onChange, onSubmit }: StudioFormProps) {
  return (
    <form onSubmit={onSubmit} className="lg:col-span-7 space-y-6">
      <div>
        <label className={labelCls}>1. Choose Silhouette</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {STUDIO_SILHOUETTES.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onChange({ productType: item.id })}
              className={`p-3 text-left rounded-xl border text-xs transition ${
                state.productType === item.id
                  ? 'border-gold bg-gold/15 font-bold text-forest'
                  : 'border-stone-200 text-stone-700 hover:border-stone-300'
              }`}
            >
              <span className="block">{item.label}</span>
              <span className="text-[10px] text-stone-500 font-normal">{item.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>2. Select Preserved Botanical</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STUDIO_BOTANICALS.map((bot) => (
            <button
              type="button"
              key={bot.name}
              onClick={() => onChange({ botanical: bot.name })}
              className={`p-2.5 text-left rounded-xl border text-xs flex items-center gap-3 transition ${
                state.botanical === bot.name
                  ? 'border-forest bg-sage/20 font-bold'
                  : 'border-stone-200 text-stone-700 hover:border-stone-300'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: bot.color }} />
              <div className="overflow-hidden">
                <p className="truncate">{bot.name}</p>
                <p className="text-[10px] text-stone-500 truncate font-normal">{bot.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>3. Resin Tint</label>
          <select value={state.colorTint} onChange={(e) => onChange({ colorTint: e.target.value })} className={selectCls}>
            {STUDIO_TINTS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>4. Metallic Foil Flakes</label>
          <select value={state.metalFoil} onChange={(e) => onChange({ metalFoil: e.target.value })} className={selectCls}>
            {STUDIO_FOILS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1">
            Custom Monogram (Optional)
          </label>
          <input
            type="text"
            maxLength={4}
            placeholder="e.g. A & S"
            value={state.initials}
            onChange={(e) => onChange({ initials: e.target.value })}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1">Budget Expectation</label>
          <select
            value={state.budget}
            onChange={(e) => onChange({ budget: e.target.value })}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs"
          >
            {STUDIO_BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-stone-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-forest">Client Contact Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Full Name *"
            value={state.customerName}
            onChange={(e) => onChange({ customerName: e.target.value })}
            className={inputCls}
          />
          <input
            type="tel"
            required
            placeholder="WhatsApp Phone Number *"
            value={state.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={inputCls}
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          value={state.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={inputCls}
        />
        <textarea
          rows={2}
          placeholder="Describe special requests (e.g., date of wedding garland arrival)..."
          value={state.instructions}
          onChange={(e) => onChange({ instructions: e.target.value })}
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-forest text-ivory rounded-xl hover:bg-forest/90 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4 text-gold" /> Submit Bespoke Request & Book Artisan Slot
      </button>
    </form>
  );
}
