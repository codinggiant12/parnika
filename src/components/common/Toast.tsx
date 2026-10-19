import { Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Toast() {
  const { toastMessage } = useUI();
  if (!toastMessage) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[60] bg-forest text-ivory px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gold/40 text-xs sm:text-sm font-medium animate-fade-in">
      <Sparkles className="w-4 h-4 text-gold" />
      <span>{toastMessage}</span>
    </div>
  );
}
