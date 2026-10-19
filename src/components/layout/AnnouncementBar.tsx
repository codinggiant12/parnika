import { Award, Clock, SlidersHorizontal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useUI } from '../../context/UIContext';

export default function AnnouncementBar() {
  const { setCouponCode } = useStore();
  const { setIsCartOpen, setIsAccountOpen } = useUI();
  const navigate = useNavigate();
  const isAdmin = useLocation().pathname === '/admin';

  return (
    <div className="bg-forest text-ivory text-[11px] sm:text-xs py-2 px-4 tracking-wider uppercase font-medium flex justify-between items-center border-b border-gold/20">
      <div className="hidden md:flex items-center gap-2 text-sage">
        <Award className="w-3.5 h-3.5 text-gold" />
        <span>100% Genuine Preserved Botanicals</span>
      </div>
      <div className="mx-auto text-center font-serif tracking-normal text-xs text-ivory">
        Handmade with wild botanicals • Free insured shipping above ₹1,499 • Use code{' '}
        <button
          onClick={() => {
            setCouponCode('BOTANICAL10');
            setIsCartOpen(true);
          }}
          className="text-gold underline font-bold"
        >
          BOTANICAL10
        </button>
      </div>
      <div className="hidden sm:flex items-center gap-4 text-xs">
        <button
          onClick={() => setIsAccountOpen(true)}
          className="text-sage hover:text-ivory transition-colors flex items-center gap-1"
        >
          <Clock className="w-3.5 h-3.5 text-gold" /> Track Order
        </button>
        <button
          onClick={() => navigate(isAdmin ? '/' : '/admin')}
          className="text-gold hover:underline font-semibold flex items-center gap-1"
        >
          <SlidersHorizontal className="w-3 h-3" />
          {isAdmin ? 'Exit Admin Suite' : 'Artisan Admin'}
        </button>
      </div>
    </div>
  );
}
