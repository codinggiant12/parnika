import { useState } from 'react';
import StudioForm from '../components/studio/StudioForm';
import StudioPreview from '../components/studio/StudioPreview';
import { useStore } from '../context/StoreContext';
import type { StudioFormState } from '../types';

const INITIAL_STATE: StudioFormState = {
  productType: 'Pendant Necklace',
  botanical: 'Wild Himalayan Fern',
  colorTint: 'Crystal Clear (Glassy)',
  metalFoil: '24K Champagne Gold Leaf',
  initials: '',
  budget: '₹1,800 – ₹3,000',
  instructions: '',
  customerName: '',
  phone: '',
  email: ''
};

export default function StudioPage() {
  const { submitInquiry } = useStore();
  const [state, setState] = useState<StudioFormState>(INITIAL_STATE);

  const patch = (p: Partial<StudioFormState>) => setState((prev) => ({ ...prev, ...p }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitInquiry(state)) patch({ instructions: '', initials: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-gold font-bold">Bespoke Atelier</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-forest mt-2">Personalization Studio</h1>
        <p className="text-xs sm:text-sm text-[#222222]/75 mt-3 leading-relaxed">
          Co-create a bespoke resin creation. Every piece is individually cast with preserved botanicals, custom
          engravings, and 24K gold foil flakes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl">
        <StudioForm state={state} onChange={patch} onSubmit={handleSubmit} />
        <StudioPreview state={state} />
      </div>
    </div>
  );
}
